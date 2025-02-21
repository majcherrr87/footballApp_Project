import { useState } from 'react'
import styled from 'styled-components'
import { Button } from '../../../components/Button'
import { Game, Result } from '../../../types'
import { useCompetitionTeamMutation } from '../../../queries/useEditCompetitionMutation'
import { useGetTeamsQuery } from '../../../queries/useGetTeamsQuery'

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalContent = styled.div`
  background: ${(props) => props.theme.colors.formBackground};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  width: 400px;
  display: flex;
  flex-direction: column;
`

const FormWrapper = styled.form`
  max-width: 400px;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.formBackground};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const Label = styled.label`
  margin-top: 10px;
  margin-bottom: 5px;
  font-size: 14px;
  color: ${(props) => props.theme.colors.textBackground};
`

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  font-size: 14px;
  border-radius: 4px;
  margin-bottom: 10px;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 4px ${(props) => props.theme.colors.primary};
  }
`

const Select = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border-radius: 4px;
  margin-bottom: 10px;
`

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 15px;
`

type EditCompetitionFormProps = {
  game: Game
  onClose: () => void
}

export const EditCompetitionForm = ({
  game,
  onClose,
}: EditCompetitionFormProps) => {
  const [value, setValue] = useState({
    title: game.title || '',
    date: game.date || '',
    place: game.place || '',
    duration: game.duration || 0,
    score: game.score || { team1: 0, team2: 0 },
    team1Id: game.team1Id || '',
    team2Id: game.team2Id || '',
  })

  const [errors, setErrors] = useState({
    title: '',
    date: '',
    place: '',
    duration: '',
    score: '',
    team1Id: '',
    team2Id: '',
  })

  const {
    mutate: editGame,
    isPending,
    error,
  } = useCompetitionTeamMutation(game.id)
  const {
    data: teams,
    isLoading: isTeamsLoading,
    error: errorTeams,
  } = useGetTeamsQuery()

  const validateFields = () => {
    const newErrors = {
      title: value.title.trim() === '' ? 'Nazwa jest wymagana' : '',
      date: value.date.trim() === '' ? 'Data jest wymagana' : '',
      place: value.place.trim() === '' ? 'Miejsce jest wymagane' : '',
      duration: value.duration <= 0 ? 'Czas musi być na plusie' : '',
      score:
        value.score.team1 < 0 || value.score.team2 < 0
          ? 'Czas musi być na plusie'
          : '',
      team1Id: value.team1Id === '' ? 'Drużyna 1 jest wymagana' : '',
      team2Id: value.team2Id === '' ? 'Drużyna 2 jest wymagana' : '',
    }

    setErrors(newErrors)
    return !Object.values(newErrors).some((error) => error !== '')
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target

    if (name.startsWith('score')) {
      const scoreKey = name.split('.')[1] as keyof Result
      setValue((prev) => ({
        ...prev,
        score: { ...prev.score, [scoreKey]: Number(value) },
      }))
    } else {
      setValue((prev) => ({
        ...prev,
        [name]: name === 'duration' ? Number(value) : value,
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateFields()) return
    editGame(value)
    onClose()
  }

  if (isPending || isTeamsLoading) return <p>Ładowanie...</p>
  if (error || errorTeams) return <p>Błąd</p>

  return (
    <ModalOverlay>
      <ModalContent>
        <h3>Edytuj rozgrywkę</h3>

        <FormWrapper onSubmit={handleSubmit}>
          <Label htmlFor="team1">Drużyna 1</Label>
          <Select
            id="team1"
            name="team1Id"
            value={value.team1Id}
            onChange={(e) => {
              const team1Id = e.target.value
              const team1 = teams?.find((team) => team.id === team1Id)
              const team2 = teams?.find((team) => team.id === value.team2Id)

              setValue({
                ...value,
                team1Id: team1Id,
                title:
                  team1 && team2
                    ? `${team1.name} vs ${team2.name}`
                    : team1
                      ? `${team1.name} vs`
                      : '',
              })
            }}
          >
            <option value="">Wybierz drużyne</option>
            {teams?.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </Select>

          <Label htmlFor="team2">Drużyna 2</Label>
          <Select
            id="team2"
            name="team2Id"
            value={value.team2Id}
            onChange={(e) => {
              const team2Id = e.target.value
              const team1 = teams?.find((team) => team.id === value.team1Id)
              const team2 = teams?.find((team) => team.id === team2Id)

              setValue({
                ...value,
                team2Id: team2Id,
                title:
                  team1 && team2
                    ? `${team1.name} vs ${team2.name}`
                    : team1
                      ? `${team1.name} vs`
                      : '',
              })
            }}
          >
            <option value="">Wybierz drużyne</option>
            {teams?.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </Select>

          <Label htmlFor="date">Data rozgrywki</Label>
          <Input
            type="date"
            id="date"
            name="date"
            value={value.date}
            onChange={handleChange}
          />
          {errors.date && <p style={{ color: 'red' }}>{errors.date}</p>}

          <Label htmlFor="place">Miejsce rozgrywki</Label>
          <Input
            type="text"
            id="place"
            name="place"
            value={value.place}
            onChange={handleChange}
          />
          {errors.place && <p style={{ color: 'red' }}>{errors.place}</p>}

          <Label htmlFor="duration">Czas (w minutach)</Label>
          <Input
            type="number"
            id="duration"
            name="duration"
            value={value.duration}
            onChange={handleChange}
          />
          {errors.duration && <p style={{ color: 'red' }}>{errors.duration}</p>}

          <span>Wynik</span>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ width: '50%' }}>
              <Label htmlFor="score-team1">
                {value.team1Id
                  ? teams?.find((team) => team.id === value.team1Id)?.name ||
                    'Liczba goli'
                  : 'Liczba goli'}
              </Label>
              <Input
                type="number"
                id="score-team1"
                value={value.score.team1}
                onChange={(e) =>
                  setValue({
                    ...value,
                    score: {
                      ...value.score,
                      team1: Number(e.target.value),
                    },
                  })
                }
              />
              {errors.score && <p style={{ color: 'red' }}>{errors.score}</p>}
            </div>

            <div style={{ width: '50%' }}>
              <Label htmlFor="score-team2">
                {value.team2Id
                  ? teams?.find((team) => team.id === value.team2Id)?.name ||
                    'Liczba goli'
                  : 'Liczba goli'}
              </Label>
              <Input
                type="number"
                id="score-team2"
                value={value.score.team2}
                onChange={(e) =>
                  setValue({
                    ...value,
                    score: {
                      ...value.score,
                      team2: Number(e.target.value),
                    },
                  })
                }
              />
              {errors.score && <p style={{ color: 'red' }}>{errors.score}</p>}
            </div>
          </div>

          <StyledButtonWrapper>
            <Button label="Edytuj rozgrywke" variant="success" />
            <Button label="Anuluj" variant="danger" onClick={onClose} />
          </StyledButtonWrapper>
        </FormWrapper>
      </ModalContent>
    </ModalOverlay>
  )
}
