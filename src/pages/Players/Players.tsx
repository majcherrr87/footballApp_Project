import styled from 'styled-components'
import { Header } from '../../components/Header'
import { useGetPlayersQuery } from '../../queries/useGetPlayersQuery'
import { Table } from '../../components/PlayersTable'
import { Player } from '../../types'
import { Actions } from './components/Actions'
import { useDeletePlayerMutation } from '../../queries/useDeletePlayerMutation'
import { Fragment, useState } from 'react'
import { EditForm } from './components/EditForm'

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Players = () => {
    const { data, isLoading, error } = useGetPlayersQuery()
    const { mutate, error: deleteError, isPending } = useDeletePlayerMutation()

    const handleDelete = (id: string) => {
        const player = data?.find((p) => p.id === id)

        const isConfirmed = window.confirm(
            `Are you sure you want to delete ${player?.firstName} ${player?.lastName}?`,
        )

        if (isConfirmed) {
            mutate(id)
        }
    }

    const [editingPlayer, setEditingPlayer] = useState<Player | null>(null)

    const handleEdit = (player: Player) => {
        setEditingPlayer(player)
    }

    const cancelEdit = () => {
        setEditingPlayer(null)
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error || !data) {
        return <div>Error</div>
    }

    const columns: { key: keyof Player; label: string }[] = [
        { key: 'firstName', label: 'First Name' },
        { key: 'lastName', label: 'Last Name' },
        { key: 'teamName', label: 'Team' },
    ]

    return (
        <StyledWrapper>
            <Header level={1}>Players</Header>

            {error || (deleteError && <div>Error</div>)}

            {editingPlayer ? (
                <EditForm player={editingPlayer} onCancel={cancelEdit} />
            ) : (
                <Fragment>
                    <Actions />

                    <Table
                        data={data}
                        columns={columns}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                        isLoading={isPending}
                    />
                </Fragment>
            )}
        </StyledWrapper>
    )
}

export default Players
