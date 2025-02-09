import { useState } from 'react'
import styled from 'styled-components'
import { Button } from '../../../components/Button'
import { useEditTeamRosterMutation } from '../../../queries/useEditTeamRoasterMutation'
import { useGetPlayersByTeamQuery } from '../../../queries/useGetPlayersByTeamQuery'
import { useGetPlayersWithoutTeamQuery } from '../../../queries/useGetPlayersWithoutTeam'
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

const Select = styled.select`
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border-radius: 4px;
    border: 1px solid ${(props) => props.theme.colors.textBackground};
    box-sizing: border-box;
`

const PlayerList = styled.ul`
    list-style: none;
    padding: 0;
`

const PlayerItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0;
`

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
`

type EditTeamRosterProps = {
    team: Team
    onClose: () => void
}

export const EditTeamRosterForm = ({ team, onClose }: EditTeamRosterProps) => {
    const { data: playersInTeam, isLoading: loadingTeamPlayers } =
        useGetPlayersByTeamQuery(team.id)
    const { data: playersWithoutTeam, isLoading: loadingFreePlayers } =
        useGetPlayersWithoutTeamQuery()

    const { mutate: editRoster, isPending } = useEditTeamRosterMutation()

    const [selectedPlayer, setSelectedPlayer] = useState<string>('')

    const handleRemovePlayer = (playerId: string) => {
        editRoster({ playerId, teamId: null, teamName: null })
    }

    const handleAddPlayer = () => {
        if (selectedPlayer) {
            editRoster({
                playerId: selectedPlayer,
                teamId: team.id,
                teamName: team.name,
            })
            setSelectedPlayer('')
        }
    }

    if (isPending) {
        return <p>Loading..</p>
    }

    return (
        <ModalOverlay>
            <ModalContent>
                <h3>Edit Team Roster</h3>

                <Label>Current Players</Label>
                {loadingTeamPlayers ? (
                    <p>Loading players...</p>
                ) : (
                    <PlayerList>
                        {playersInTeam?.map((player) => (
                            <PlayerItem key={player.id}>
                                {player.firstName} {player.lastName}
                                <Button
                                    label="Remove"
                                    variant="danger"
                                    onClick={() =>
                                        handleRemovePlayer(player.id)
                                    }
                                />
                            </PlayerItem>
                        ))}
                    </PlayerList>
                )}

                <Label>Add New Player</Label>
                {loadingFreePlayers ? (
                    <p>Loading available players...</p>
                ) : (
                    <>
                        <Select
                            value={selectedPlayer}
                            onChange={(e) => setSelectedPlayer(e.target.value)}
                        >
                            <option value="">-- Select Player --</option>
                            {playersWithoutTeam?.map((player) => (
                                <option key={player.id} value={player.id}>
                                    {player.firstName} {player.lastName}
                                </option>
                            ))}
                        </Select>
                        <Button
                            label="Add Player"
                            variant="success"
                            onClick={handleAddPlayer}
                            isDisabled={!selectedPlayer}
                        />
                    </>
                )}

                <ButtonWrapper>
                    <Button label="Close" variant="danger" onClick={onClose} />
                </ButtonWrapper>
            </ModalContent>
        </ModalOverlay>
    )
}
