import { Header } from '../../../components/Header'
import { Paragraph } from '../../../components/Paragraph'
import { useGetTeamsQuery } from '../../../queries/useGetTeamsQuery'
import { Game } from '../../../types'

interface LastGameProps {
    lastGame: Game
}

export const LastGame = ({ lastGame }: LastGameProps) => {
    const { data, isLoading, error } = useGetTeamsQuery()

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading teams</div>

    const team1 = data?.find((team) => team.id === lastGame.team1Id)
    const team2 = data?.find((team) => team.id === lastGame.team2Id)

    return (
        <div>
            <Header level={3}>
                Last game was between {team1?.name || 'Unknown Team'} and{' '}
                {team2?.name || 'Unknown Team'}
            </Header>
            <Paragraph>
                Game was on {lastGame.date}, in {lastGame.place}. After{' '}
                {lastGame.duration} the result was {lastGame.score.team1}:
                {lastGame.score.team2}
            </Paragraph>
        </div>
    )
}
