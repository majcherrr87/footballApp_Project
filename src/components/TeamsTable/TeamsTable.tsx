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
  position: sticky;
  top: 0;
  border: 1px solid ${(props) => props.theme.colors.textBackground};
  background-color: ${(props) => props.theme.colors.primary};
  text-align: left;
  color: ${(props) => props.theme.colors.textPrimary};
  z-index: 10;
`

const StyledTableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${(props) => props.theme.colors.secondary};
  }
`

const StyledTableData = styled.td`
  padding: 5px;
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

const columns = [
  'Drużyna',
  'Rok założenia',
  'Lokalizacja',
  'Edytuj drużyne',
  'Edytuj skłąd',
  'Usuń drużyne',
]

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
            {columns.map((column) => (
              <StyledTableHeader key={column}>{column}</StyledTableHeader>
            ))}
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => {
            return (
              <StyledTableRow key={team.id}>
                <StyledTableData>{team.name}</StyledTableData>
                <StyledTableData>{team.year}</StyledTableData>
                <StyledTableData>{team.location}</StyledTableData>
                <StyledTableData>
                  <Button
                    label="Edytuj"
                    variant="warning"
                    onClick={() => onEditTeam(team)}
                    isLoading={isLoading}
                  />
                </StyledTableData>
                <StyledTableData>
                  <Button
                    label="Edytuj skłąd"
                    variant="warning"
                    onClick={() => onEditRoster(team)}
                    isLoading={isLoading}
                  />
                </StyledTableData>
                <StyledTableData>
                  <Button
                    variant="danger"
                    label="Usuń"
                    tooltip={
                      isEnableToDelete(team.id) ? 'Nie można usunąć' : ''
                    }
                    isDisabled={!!isEnableToDelete(team.id)}
                    onClick={() => onDelete(team.id)}
                    isLoading={isLoading}
                  />
                </StyledTableData>
              </StyledTableRow>
            )
          })}
        </tbody>
      </StyledTable>
    </StyledWrapper>
  )
}
