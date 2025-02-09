import styled from 'styled-components'
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

type TableProps<T> = {
    data: T[]
    columns: { key: keyof T; label: string }[]
    onDelete: (id: string) => void
    onEdit: (item: T) => void
    isLoading: boolean
}

export const Table = <T extends { id: string; teamName?: string }>({
    data,
    columns,
    onDelete,
    onEdit,
    isLoading,
}: TableProps<T>) => {
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
                        <StyledTableHeader>Delete</StyledTableHeader>
                        <StyledTableHeader>Edit</StyledTableHeader>
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
                                {item.teamName ? (
                                    <span>Cannot delete - in a team</span>
                                ) : (
                                    <Button
                                        variant="danger"
                                        label="Delete"
                                        onClick={() => onDelete(item.id)}
                                        isLoading={isLoading}
                                    />
                                )}
                            </StyledTableData>
                            <StyledTableData>
                                <Button
                                    label="Edit"
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
