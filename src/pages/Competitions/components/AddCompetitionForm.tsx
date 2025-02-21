import styled from 'styled-components'
import { Button } from '../../../components/Button'
import { useState } from 'react'
import { useAddCompetitionMutation } from '../../../queries/useAddCompetitionMutation'
import { useGetTeamsQuery } from '../../../queries/useGetTeamsQuery'

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
  justify-content: flex-end;
  width: 100%;
  margin-top: 15px;
`
type AddCompetitionFormProps = {
  closeAddCompetition: () => void
}

export const AddCompetitionForm = ({
  closeAddCompetition,
}: AddCompetitionFormProps) => {
  const [value, setValue] = useState<{
    title: string
    date: string
    place: string
    duration: number
    score: {
      team1?: number
      team2?: number
    }
    team1Id: string
    team2Id: string
  }>({
    title: '',
    date: '',
    place: '',
    duration: 0,
    score: {
      team1: undefined,
      team2: undefined,
    },
    team1Id: '',
    team2Id: '',
  })

  const [errors, setErrors] = useState({
    title: '',
    date: '',
    place: '',
    duration: '',
    score: {
      team1: '',
      team2: '',
    },
    team1Id: '',
    team2Id: '',
  })

  const { data: teams } = useGetTeamsQuery()
  const { mutate, isPending, error } = useAddCompetitionMutation()

  const validateFields = () => {
    const newErrors = {
      title: value.title.trim() === '' ? 'Tytył jest wymagany' : '',
      date: value.date.trim() === '' ? 'Data jest wymagana' : '',
      place:
        value.place.trim() === '' ? 'Lokalizacja rozgrywki jest wymagana' : '',
      duration: value.duration <= 0 ? 'Czas trwania jest wymagany' : '',
      score: {
        team1:
          value.score.team1 === undefined || value.score.team1 < 0
            ? 'Wynik musi być równy lub większy od 0'
            : '',
        team2:
          value.score.team2 === undefined || value.score.team2 < 0
            ? 'Wynik musi być równy lub większy od 0'
            : '',
      },
      team1Id: value.team1Id === '' ? 'Drużyna 1 jest wymagana' : '',
      team2Id: value.team2Id === '' ? 'Drużyna 2 jest wymagana' : '',
    }

    setErrors(newErrors)

    const hasErrors =
      Object.values(newErrors).some(
        (error) => typeof error === 'string' && error !== '',
      ) || Object.values(newErrors.score).some((s) => s !== '')

    return !hasErrors
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const isValid = validateFields()

    if (isValid) {
      mutate({
        ...value,
        duration: Number(value.duration),
        score: {
          team1: value.score.team1 ?? 0,
          team2: value.score.team2 ?? 0,
        },
      })
      closeAddCompetition()
    }
  }

  if (isPending) return <p>Ładowanie...</p>

  if (error) return <p>Błąd</p>

  return (
    <FormWrapper onSubmit={onSubmit}>
      <Label htmlFor="team1">Drużyna 1</Label>
      <Select
        id="team1"
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
      {errors.team1Id && <p style={{ color: 'red' }}>{errors.team1Id}</p>}

      <Label htmlFor="team2">Drużyna 2</Label>
      <Select
        id="team2"
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
      {errors.team2Id && <p style={{ color: 'red' }}>{errors.team2Id}</p>}

      <Label htmlFor="date">Data rozdrywki</Label>
      <Input
        type="date"
        id="date"
        value={value.date}
        onChange={(e) => setValue({ ...value, date: e.target.value })}
      />
      {errors.date && <p style={{ color: 'red' }}>{errors.date}</p>}

      <Label htmlFor="place">Miejsce rozgrywki</Label>
      <Input
        type="text"
        id="place"
        value={value.place}
        onChange={(e) => setValue({ ...value, place: e.target.value })}
      />
      {errors.place && <p style={{ color: 'red' }}>{errors.place}</p>}

      <Label htmlFor="duration">Czas (w minutach)</Label>
      <Input
        type="number"
        id="duration"
        value={value.duration}
        onChange={(e) =>
          setValue({ ...value, duration: Number(e.target.value) })
        }
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
          {errors.score.team1 && (
            <p style={{ color: 'red' }}>{errors.score.team1}</p>
          )}
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
          {errors.score.team2 && (
            <p style={{ color: 'red' }}>{errors.score.team2}</p>
          )}
        </div>
      </div>

      <StyledButtonWrapper>
        <Button label="Dodaj rozgrywke" variant="success" />
      </StyledButtonWrapper>
    </FormWrapper>
  )
}
