import { useState } from 'react'
import styled from 'styled-components'
import { Button } from '../../../components/Button'
import { useEditTeamMutation } from '../../../queries/useEditTeamMutation'
import { Team } from '../../../types'

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

const Label = styled.label`
    margin-top: 10px;
    font-size: 14px;
    color: ${(props) => props.theme.colors.textBackground};
`

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border-radius: 4px;
    border: 1px solid ${(props) => props.theme.colors.textBackground};
    box-sizing: border-box;
`

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
`

type EditTeamInfoProps = {
    team: Team
    onClose: () => void
}

export const EditTeamInfoForm = ({ team, onClose }: EditTeamInfoProps) => {
    const [formData, setFormData] = useState({
        name: team.name,
        year: team.year,
        location: team.location,
    })

    const { mutate: editTeam, isPending } = useEditTeamMutation(team.id)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        editTeam(formData)
        onClose()
    }

    return (
        <ModalOverlay>
            <ModalContent>
                <h3>Edit Team Info</h3>
                <form onSubmit={handleSubmit}>
                    <Label htmlFor="name">Team Name</Label>
                    <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />

                    <Label htmlFor="year">Year Founded</Label>
                    <Input
                        id="year"
                        name="year"
                        type="number"
                        value={formData.year}
                        onChange={handleChange}
                    />

                    <Label htmlFor="location">Location</Label>
                    <Input
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                    />

                    <ButtonWrapper>
                        <Button
                            label="Cancel"
                            variant="danger"
                            onClick={onClose}
                        />
                        <Button
                            label="Save"
                            variant="success"
                            isLoading={isPending}
                        />
                    </ButtonWrapper>
                </form>
            </ModalContent>
        </ModalOverlay>
    )
}
