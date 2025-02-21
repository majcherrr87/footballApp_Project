import styled from 'styled-components'
import { Game } from '../../types'
import { Button } from '../Button'

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
  min-width: 120px; /* Możesz dostosować szerokość */
  white-space: nowrap; /* Zapobiega zawijaniu tekstu */
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
  min-width: 120px; /* Dopasuj szerokość */
  white-space: nowrap; /* Zapobiega zawijaniu */
  overflow: hidden;
  text-overflow: ellipsis; /* Doda "..." gdy tekst jest za długi */
`

type CompetitionTableProps = {
  competitions: Game[]
  isLoading: boolean
  getTeamNameById: (id: string) => string
  onEditCompetition: (game: Game) => void
}

const columns = [
  'Rozgrywka',
  'Data',
  'Miejsce',
  'Czas',
  'Wynik',
  'Drużyna 1',
  'Drużyna 2',
  'Edytuj rozgrywke',
]

export const CompetitionTable = ({
  competitions,
  isLoading,
  getTeamNameById,
  onEditCompetition,
}: CompetitionTableProps) => {
  return (
    <StyledWrapper>
      <StyledTable>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <StyledTableHeader key={index}>{column}</StyledTableHeader>
            ))}
          </tr>
        </thead>
        <tbody>
          {competitions.map((competition) => {
            return (
              <StyledTableRow key={competition.id}>
                <StyledTableData>{competition.title}</StyledTableData>
                <StyledTableData>{competition.date}</StyledTableData>
                <StyledTableData>{competition.place}</StyledTableData>
                <StyledTableData>{competition.duration}</StyledTableData>
                <StyledTableData>
                  {competition.score.team1}:{competition.score.team2}
                </StyledTableData>
                <StyledTableData>
                  {getTeamNameById(competition.team1Id)}
                </StyledTableData>
                <StyledTableData>
                  {getTeamNameById(competition.team2Id)}
                </StyledTableData>
                <StyledTableData>
                  <Button
                    label="Edytuj rozgrywke"
                    variant="warning"
                    onClick={() => onEditCompetition(competition)}
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
