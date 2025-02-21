import styled from 'styled-components'
import { Button } from '../Button'
import { Player } from '../../types'

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
  padding: 10px;
  border: 1px solid ${(props) => props.theme.colors.textBackground};
  text-align: center;
`

type TableProps<T> = {
  data: T[]
  onDelete: (id: string) => void
  onEdit: (item: T) => void
  isLoading: boolean
}
const columns: { key: keyof Player; label: string }[] = [
  { key: 'firstName', label: 'First Name' },
  { key: 'lastName', label: 'Last Name' },
  { key: 'teamName', label: 'Team' },
]

export const Table = ({
  data,
  onDelete,
  onEdit,
  isLoading,
}: TableProps<Player>) => {
  return (
    <StyledWrapper>
      <StyledTable>
        <thead>
          <tr>
            {columns.map((column) => (
              <StyledTableHeader key={String(column.key)}>
                {column.label}
              </StyledTableHeader>
            ))}
            <StyledTableHeader>Usuń</StyledTableHeader>
            <StyledTableHeader>Edytuj</StyledTableHeader>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <StyledTableRow key={item.id}>
              {columns.map((column) => (
                <StyledTableData key={String(column.key)}>
                  {String(item[column.key])}{' '}
                </StyledTableData>
              ))}
              <StyledTableData>
                <Button
                  variant="danger"
                  label="Usuń"
                  tooltip={
                    item.teamName
                      ? 'Nie można usuną gracza który jest w drużynie'
                      : ''
                  }
                  isDisabled={!!item.teamName}
                  onClick={() => onDelete(item.id)}
                  isLoading={isLoading}
                />
              </StyledTableData>
              <StyledTableData>
                <Button
                  label="Edytuj"
                  variant="warning"
                  isLoading={isLoading}
                  onClick={() => onEdit(item)}
                />
              </StyledTableData>
            </StyledTableRow>
          ))}
        </tbody>
      </StyledTable>
    </StyledWrapper>
  )
}
