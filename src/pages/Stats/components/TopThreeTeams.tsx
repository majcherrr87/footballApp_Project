import { useMemo } from 'react'
import { useGetCompetitionsQuery } from '../../../queries/useGetCompetitionsQuery'
import { useGetTeamsQuery } from '../../../queries/useGetTeamsQuery'
import styled from 'styled-components'

const StyledUl = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 100%;
  max-width: 400px; /* Kontroluje szerokość listy */
  margin: 1rem auto;

  li {
    margin-bottom: 12px;
    width: 100%;
    display: grid;
    grid-template-columns: 30px 1fr 60px;
    align-items: center;
    text-align: left;
    background-color: #1e1d1d;
    padding: 8px 12px;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .rank {
    font-weight: bold;
    text-align: center;
  }

  .team-name {
    padding: 0 10px;
  }

  .goals {
    text-align: right;
    font-weight: bold;
  }
`

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
      goalsMap[game.team1Id] = (goalsMap[game.team1Id] || 0) + game.score.team1
      goalsMap[game.team2Id] = (goalsMap[game.team2Id] || 0) + game.score.team2
    })

    return goalsMap
  }, [games])

  const topTeams = useMemo(() => {
    return Object.entries(teamGoals)
      .sort(([, goalsA], [, goalsB]) => goalsB - goalsA)
      .slice(0, 3)
  }, [teamGoals])

  if (isLoadingGames || isLoadingTeams) return <p>Ładowanie...</p>

  if (errorGames || errorTeams) return <p>Błąd ładowanie danych</p>

  return (
    <div>
      <h2>Najlepsze 3 drużyny wegług zdobytych goli</h2>
      <StyledUl>
        {topTeams.map(([teamId, goals], index) => (
          <li key={teamId}>
            <span className="rank">{index + 1}.</span>
            <span className="team-name">
              {teamNames?.[teamId] || 'Brak drużyny'}
            </span>
            <span className="goals">{goals} goli</span>
          </li>
        ))}
      </StyledUl>
    </div>
  )
}
