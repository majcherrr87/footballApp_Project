import styled from 'styled-components'
import { Header } from '../../components/Header'
import { Fragment, useState } from 'react'
import { Actions } from './components/Actions'
import { Team } from '../../types'
import { TeamTable } from '../../components/TeamsTable/TeamsTable'
import { useGetTeamsQuery } from '../../queries/useGetTeamsQuery'
import { EditTeamInfoForm } from './components/EditTeamInfoForm'
import { EditTeamRosterForm } from './components/EditTeamRoasterForm'
import { useDeleteTeamMutation } from '../../queries/useDeleteTeamMutation'
import { useGetGamesQuery } from '../../queries/useGetGamesQuery'

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const Teams = () => {
    const { data, isLoading, error } = useGetTeamsQuery()

    const {
        mutate: deleteTeam,
        error: deleteError,
        isPending,
    } = useDeleteTeamMutation()

    const {
        data: games,
        isLoading: isLoadingGames,
        error: errorGames,
    } = useGetGamesQuery()

    const [choosenTeamToEdit, setChoosenTeamToEdit] = useState<Team | null>(
        null,
    )

    const [choosenTeamToEditRoster, setChoosenTeamToEditRoster] =
        useState<Team | null>(null)

    const isEnableToDelete = (teamId: string) => {
        return games?.some(
            (game) => game.team1Id === teamId || game.team2Id === teamId,
        )
    }

    const handleEditTeam = (team: Team) => {
        setChoosenTeamToEdit(team)
    }

    const handleEditRoster = (team: Team) => {
        setChoosenTeamToEditRoster(team)
    }

    const handleOnClose = () => {
        setChoosenTeamToEdit(null)
        setChoosenTeamToEditRoster(null)
    }

    const handleDeleteTeam = (id: string) => {
        const team = data?.find((t) => t.id === id)

        const isConfirmed = window.confirm(
            `Are you sure you want to delete ${team?.name}?`,
        )

        if (isConfirmed) {
            deleteTeam(id)
        }
    }

    if (isLoading || isPending || isLoadingGames) {
        return <div>Loading...</div>
    }

    if (error || !data || deleteError || errorGames) {
        return <div>Error</div>
    }

    const render = () => {
        if (choosenTeamToEdit) {
            return (
                <EditTeamInfoForm
                    team={choosenTeamToEdit}
                    onClose={handleOnClose}
                />
            )
        }

        if (choosenTeamToEditRoster) {
            return (
                <EditTeamRosterForm
                    team={choosenTeamToEditRoster}
                    onClose={handleOnClose}
                />
            )
        }

        return (
            <Fragment>
                <Actions />

                <TeamTable
                    teams={data}
                    isLoading={isLoading}
                    onEditRoster={handleEditRoster}
                    onEditTeam={handleEditTeam}
                    onDelete={handleDeleteTeam}
                    isEnableToDelete={isEnableToDelete}
                />
            </Fragment>
        )
    }

    return (
        <StyledWrapper>
            <Header level={1}>Teams</Header>

            {render()}
        </StyledWrapper>
    )
}
