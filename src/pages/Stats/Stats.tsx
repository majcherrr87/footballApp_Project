import styled from 'styled-components'
import { Header } from '../../components/Header'
import { useGetCompetitionsQuery } from '../../queries/useGetCompetitionsQuery'
import { LastGame } from './components/LastGame'
import { Chart } from './components/Chart'
import { TopThreeteams } from './components/TopThreeTeams'

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const Stats = () => {
  const { data, isLoading, error } = useGetCompetitionsQuery()

  const getLastGame = () => {
    const lastGame = data?.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    )[0]

    return lastGame
  }

  const lastGame = getLastGame()

  if (isLoading) {
    return <div>Ładowanie...</div>
  }

  if (error || !data) {
    return <div>Błąd</div>
  }

  const render = () => {
    return (
      <>
        {lastGame ? (
          <LastGame lastGame={lastGame} />
        ) : (
          'Nie znaleziono ostatniej gry'
        )}

        <Chart />

        <TopThreeteams />
      </>
    )
  }

  return (
    <StyledWrapper>
      <Header level={1}>Statystyki</Header>

      {render()}
    </StyledWrapper>
  )
}
