import styled from 'styled-components'
import { Button } from '../../../components/Button'
import { useState } from 'react'
import { useAddTeamMutation } from '../../../queries/useAddTeamMutation'

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

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 15px;
`
type AddTeamFormProps = {
  cloceAddTeam: () => void
}

export const AddTeamForm = ({ cloceAddTeam }: AddTeamFormProps) => {
  const [value, setValue] = useState({
    name: '',
    year: 1900,
    location: '',
  })

  const [errors, setErrors] = useState({
    name: '',
    year: '',
    location: '',
  })

  const { mutate, isPending, error } = useAddTeamMutation()

  const validateFields = () => {
    const newErrors = {
      name: value.name.trim() === '' ? 'Nazwa jest wymagana' : '',
      year:
        value.year < 1900 || value.year > new Date().getFullYear()
          ? 'Rok musi być nie mniejszy niż 1900'
          : '',
      location: value.location.trim() === '' ? 'Lokalizacja jest wymagana' : '',
    }
    setErrors(newErrors)

    return !Object.values(newErrors).some((error) => error !== '')
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (validateFields()) {
      mutate({
        name: value.name,
        year: value.year,
        location: value.location,
      })
      cloceAddTeam()
    }
  }

  if (isPending) {
    return <div>Ładowanie...</div>
  }

  if (error) {
    return <div>Błąd: {error?.message}</div>
  }

  return (
    <FormWrapper onSubmit={onSubmit}>
      <Label htmlFor="name">Nazwa Drużyny</Label>
      <Input
        type="text"
        id="name"
        name="name"
        value={value.name}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, name: e.target.value }))
        }
      />
      {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}

      <Label htmlFor="year">Rok założenie</Label>
      <Input
        type="number"
        id="year"
        name="year"
        value={value.year}
        onChange={(e) =>
          setValue((prev) => ({
            ...prev,
            year: parseInt(e.target.value),
          }))
        }
      />
      {errors.year && <p style={{ color: 'red' }}>{errors.year}</p>}

      <Label htmlFor="location">Lokalizacja</Label>
      <Input
        type="text"
        id="location"
        name="location"
        value={value.location}
        onChange={(e) => {
          setValue((prev) => ({ ...prev, location: e.target.value }))
        }}
      />

      <StyledButtonWrapper>
        <Button label="Dodaj drużyne" variant="success" />
      </StyledButtonWrapper>
    </FormWrapper>
  )
}
