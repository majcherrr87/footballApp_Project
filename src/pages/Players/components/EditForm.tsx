import styled from 'styled-components'
import { Button } from '../../../components/Button'
import { useState } from 'react'
import { useGetTeamsQuery } from '../../../queries/useGetTeamsQuery'
import { useEditPlayerMutation } from '../../../queries/useEditPlayerMutation'
import { Player } from '../../../types'

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

interface EditFormProps {
    player: Player
    onCancel: () => void
}

export const EditForm = ({ player, onCancel }: EditFormProps) => {
    const [value, setValue] = useState({
        firstName: player.firstName,
        lastName: player.lastName,
        teamId: player.teamId || '',
        teamName: player.teamName || '',
    })

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
    })

    const { mutate, isPending, error } = useEditPlayerMutation(player.id)
    const { data: teams, isLoading, error: teamsError } = useGetTeamsQuery()

    const validateFields = () => {
        const newErrors = {
            firstName:
                value.firstName.trim() === '' ? 'First name is required' : '',
            lastName:
                value.lastName.trim() === '' ? 'Last name is required' : '',
        }
        setErrors(newErrors)
        return !Object.values(newErrors).some((error) => error !== '')
    }

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (validateFields()) {
            mutate({
                firstName: value.firstName,
                lastName: value.lastName,
                teamId: value.teamId,
                teamName: value.teamName,
            })
            onCancel()
        }
    }

    if (isPending || isLoading) {
        return <div>Loading...</div>
    }

    if (error || teamsError) {
        return <div>Error: {error?.message || teamsError?.message}</div>
    }

    return (
        <FormWrapper onSubmit={onSubmit}>
            <Label htmlFor="firstName">First name</Label>
            <Input
                type="text"
                id="firstName"
                name="firstName"
                value={value.firstName}
                onChange={(e) =>
                    setValue((prev) => ({ ...prev, firstName: e.target.value }))
                }
            />
            {errors.firstName && (
                <p style={{ color: 'red' }}>{errors.firstName}</p>
            )}

            <Label htmlFor="lastName">Last name</Label>
            <Input
                type="text"
                id="lastName"
                name="lastName"
                value={value.lastName}
                onChange={(e) =>
                    setValue((prev) => ({ ...prev, lastName: e.target.value }))
                }
            />
            {errors.lastName && (
                <p style={{ color: 'red' }}>{errors.lastName}</p>
            )}

            <Label htmlFor="teamId">Team</Label>
            <Select
                id="teamId"
                name="teamId"
                value={value.teamId}
                onChange={(e) => {
                    const teamId = e.target.value
                    const team = teams?.find((team) => team.id === teamId)
                    setValue((prev) => ({
                        ...prev,
                        teamId: teamId === '0' ? '' : teamId,
                        teamName: teamId === '0' ? '' : team?.name || '',
                    }))
                }}
            >
                <option value="0">Without team</option>
                {teams?.map((team) => (
                    <option key={team.id} value={team.id}>
                        {team.name}
                    </option>
                ))}
            </Select>

            <StyledButtonWrapper>
                <Button label="Save" variant="success" />
                <Button label="Cancel" variant="danger" onClick={onCancel} />
            </StyledButtonWrapper>
        </FormWrapper>
    )
}
