import { useState } from 'react'
import { Bar } from 'react-chartjs-2'
import 'react-datepicker/dist/react-datepicker.css'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { useGetCompetitionsQuery } from '../../../queries/useGetCompetitionsQuery'
import { Game } from '../../../types'
import { Header } from '../../../components/Header'
import { Button } from '../../../components/Button'
import styled from 'styled-components'

const StyledWrapper = styled.div`
  text-align: center;
`

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 15px;
  margin-bottom: 20px;
`

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const getWeek = (date: Date): string => {
  const tempDate = new Date(date)
  tempDate.setHours(0, 0, 0, 0)
  tempDate.setDate(tempDate.getDate() + 3 - ((tempDate.getDay() + 6) % 7)) // Przesunięcie do czwartku
  const week1 = new Date(tempDate.getFullYear(), 0, 4)
  const weekNumber =
    Math.round(
      ((tempDate.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7,
    ) + 1
  return `${tempDate.getFullYear()}-W${weekNumber}`
}

export const Chart = () => {
  const { data: games, isLoading, error } = useGetCompetitionsQuery()
  const [interval, setInterval] = useState<'dni' | 'tygodni' | 'miesięcy'>(
    'dni',
  )

  if (isLoading) return <p>Ładowanie...</p>
  if (error) return <p>Bład podczas pobierania danych</p>

  const groupGamesByInterval = (
    games: Game[],
    interval: 'dni' | 'tygodni' | 'miesięcy',
  ) => {
    const groupedGames: Record<string, number> = {}

    games.forEach((game) => {
      const gameDate = new Date(game.date)
      let key = ''

      if (interval === 'dni') {
        key = gameDate.toISOString().split('T')[0]
      } else if (interval === 'tygodni') {
        key = getWeek(gameDate)
      } else {
        key = `${gameDate.getFullYear()}-${gameDate.getMonth() + 1}`
      }

      groupedGames[key] = (groupedGames[key] || 0) + 1
    })

    return groupedGames
  }

  const groupedGames = groupGamesByInterval(games ?? [], interval)

  const chartData = {
    labels: Object.keys(groupedGames),
    datasets: [
      {
        label: `Liczba gier`,
        data: Object.values(groupedGames),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  }

  return (
    <StyledWrapper>
      <Header level={2}>Gry według {interval}</Header>

      <StyledButtonWrapper>
        <Button label="Dzień" onClick={() => setInterval('dni')} />
        <Button label="Tydzień" onClick={() => setInterval('tygodni')} />
        <Button label="Miesiąc" onClick={() => setInterval('miesięcy')} />
      </StyledButtonWrapper>

      <Bar data={chartData} />
    </StyledWrapper>
  )
}
