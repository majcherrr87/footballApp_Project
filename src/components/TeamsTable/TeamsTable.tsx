import styled from 'styled-components'
import { Button } from '../Button'
import { Team } from '../../types'

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const StyledTable = styled.table`
    border-collapse: collapse;
    width: 100%;
    max-width: 800px;
    margin-top: 20px;
    border: 1px solid ${(props) => props.theme.colors.textBackground};
`

const StyledTableHeader = styled.th`
    padding: 10px;
    border: 1px solid ${(props) => props.theme.colors.textBackground};
    background-color: ${(props) => props.theme.colors.primary};
    text-align: left;
    color: ${(props) => props.theme.colors.textPrimary};
`

const StyledTableRow = styled.tr`
    &:nth-child(even) {
        background-color: ${(props) => props.theme.colors.secondary};
    }
`

const StyledTableData = styled.td`
    padding: 10px;
    border: 1px solid ${(props) => props.theme.colors.textBackground};
    text-align: center;
`

type TeamTableProps = {
    teams: Team[]
    onEditTeam: (team: Team) => void
    onEditRoster: (team: Team) => void
    onDelete: (id: string) => void
    isLoading: boolean
    isEnableToDelete: (teamId: string) => boolean | undefined
}

export const TeamTable = ({
    teams,
    onEditTeam,
    onEditRoster,
    onDelete,
    isLoading,
    isEnableToDelete,
}: TeamTableProps) => {
    return (
        <StyledWrapper>
            <StyledTable>
                <thead>
                    <tr>
                        <StyledTableHeader>Team Name</StyledTableHeader>
                        <StyledTableHeader>
                            Team Year of fundation
                        </StyledTableHeader>
                        <StyledTableHeader>Team location</StyledTableHeader>
                        <StyledTableHeader>Edit team</StyledTableHeader>
                        <StyledTableHeader>Edit roaster</StyledTableHeader>
                        <StyledTableHeader>Delete team</StyledTableHeader>
                    </tr>
                </thead>
                <tbody>
                    {teams.map((team) => {
                        return (
                            <StyledTableRow key={team.id}>
                                <StyledTableData>{team.name}</StyledTableData>
                                <StyledTableData>{team.year}</StyledTableData>
                                <StyledTableData>
                                    {team.location}
                                </StyledTableData>
                                <StyledTableData>
                                    <Button
                                        label="Edit"
                                        variant="warning"
                                        onClick={() => onEditTeam(team)}
                                        isLoading={isLoading}
                                    />
                                </StyledTableData>
                                <StyledTableData>
                                    <Button
                                        label="Edit roaster"
                                        variant="warning"
                                        onClick={() => onEditRoster(team)}
                                        isLoading={isLoading}
                                    />
                                </StyledTableData>
                                <StyledTableData>
                                    {isEnableToDelete(team.id) ? (
                                        <span>Cant be deleted</span>
                                    ) : (
                                        <Button
                                            variant="danger"
                                            label="Delete"
                                            onClick={() => onDelete(team.id)}
                                            isLoading={isLoading}
                                        />
                                    )}
                                </StyledTableData>
                            </StyledTableRow>
                        )
                    })}
                </tbody>
            </StyledTable>
        </StyledWrapper>
    )
}
