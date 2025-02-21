import { Header } from '../../../components/Header'
import { Paragraph } from '../../../components/Paragraph'
import { useGetTeamsQuery } from '../../../queries/useGetTeamsQuery'
import { Game } from '../../../types'

interface LastGameProps {
  lastGame: Game
}

export const LastGame = ({ lastGame }: LastGameProps) => {
  const { data, isLoading, error } = useGetTeamsQuery()

  if (isLoading) return <div>Ładowanie...</div>
  if (error) return <div>Błąd ładowania drużyny</div>

  const team1 = data?.find((team) => team.id === lastGame.team1Id)
  const team2 = data?.find((team) => team.id === lastGame.team2Id)

  return (
    <div>
      <Header level={3}>
        {team1
          ? `Ostatnia gra odbyła się pomiędzy ${team1.name} i ${team2?.name}`
          : 'Nieznaleziono drużyn'}
      </Header>
      <Paragraph>
        {team1
          ? `Mecz odbył się ${lastGame.date}, w ${lastGame.place}. Po ${lastGame.duration} minutach z wynikiem ${lastGame.score.team1}:${lastGame.score.team2}`
          : 'Brak szczegółów'}
      </Paragraph>
    </div>
  )
}
