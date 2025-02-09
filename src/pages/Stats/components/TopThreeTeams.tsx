import { useMemo } from 'react'
import { useGetCompetitionsQuery } from '../../../queries/useGetCompetitionsQuery'
import { useGetTeamsQuery } from '../../../queries/useGetTeamsQuery'

export const TopThreeteams = () => {
    const {
        data: games,
        isLoading: isLoadingGames,
        error: errorGames,
    } = useGetCompetitionsQuery()
    const {
        data: teams,
        isLoading: isLoadingTeams,
        error: errorTeams,
    } = useGetTeamsQuery()

    const teamNames = useMemo(() => {
        return teams?.reduce(
            (acc, team) => {
                acc[team.id] = team.name
                return acc
            },
            {} as Record<string, string>,
        )
    }, [teams])

    const teamGoals = useMemo(() => {
        const goalsMap: Record<string, number> = {}

        games?.forEach((game) => {
            goalsMap[game.team1Id] =
                (goalsMap[game.team1Id] || 0) + game.score.team1
            goalsMap[game.team2Id] =
                (goalsMap[game.team2Id] || 0) + game.score.team2
        })

        return goalsMap
    }, [games])

    const topTeams = useMemo(() => {
        return Object.entries(teamGoals)
            .sort(([, goalsA], [, goalsB]) => goalsB - goalsA)
            .slice(0, 3)
    }, [teamGoals])

    if (isLoadingGames || isLoadingTeams) return <p>Loading...</p>

    if (errorGames || errorTeams) return <p>Error loading data.</p>

    return (
        <div>
            <h2>Top 3 Teams by Goals</h2>
            <ul>
                {topTeams.map(([teamId, goals], index) => (
                    <li key={teamId}>
                        {index + 1}. {teamNames?.[teamId] || 'Unknown Team'} -{' '}
                        {goals} goals
                    </li>
                ))}
            </ul>
        </div>
    )
}
