import styled from 'styled-components'
import { Header } from '../../components/Header'
import { useGetCompetitionsQuery } from '../../queries/useGetCompetitionsQuery'
import { Fragment } from 'react'
import { LastGame } from './components/LastGame'
import Chart from './components/Chart'
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
        return <div>Loading...</div>
    }

    if (error || !data) {
        return <div>Error</div>
    }

    const render = () => {
        return (
            <Fragment>
                {lastGame ? (
                    <LastGame lastGame={lastGame} />
                ) : (
                    'Last game not found'
                )}

                <Chart />

                <TopThreeteams />
            </Fragment>
        )
    }

    return (
        <StyledWrapper>
            <Header level={1}>Stats</Header>

            {render()}
        </StyledWrapper>
    )
}
