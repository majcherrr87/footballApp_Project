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

const Chart = () => {
    const { data: games, isLoading, error } = useGetCompetitionsQuery()
    const [interval, setInterval] = useState<'day' | 'week' | 'month'>('day')

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Failed to fetch data.</p>

    const groupGamesByInterval = (
        games: Game[],
        interval: 'day' | 'week' | 'month',
    ) => {
        const groupedGames: Record<string, number> = {}

        games.forEach((game) => {
            const gameDate = new Date(game.date)
            let key = ''

            if (interval === 'day') {
                key = gameDate.toISOString().split('T')[0]
            } else if (interval === 'week') {
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
                label: `Number of Games (${interval})`,
                data: Object.values(groupedGames),
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    }

    return (
        <StyledWrapper>
            <Header level={2}>Games in {interval}</Header>

            <StyledButtonWrapper>
                <Button label="Day" onClick={() => setInterval('day')} />
                <Button label="Week" onClick={() => setInterval('week')} />
                <Button label="Month" onClick={() => setInterval('month')} />
            </StyledButtonWrapper>

            <Bar data={chartData} />
        </StyledWrapper>
    )
}

export default Chart
