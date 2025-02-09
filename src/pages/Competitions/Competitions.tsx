import styled from 'styled-components'
import { Header } from '../../components/Header'
import { Actions } from './components/Actions'
import { useGetCompetitionsQuery } from '../../queries/useGetCompetitionsQuery'
import { CompetitionTable } from '../../components/CompetitionsTable/CompetitionsTable'
import { useGetTeamsQuery } from '../../queries/useGetTeamsQuery'
import { Fragment, useState } from 'react'
import { Game } from '../../types'
import { EditCompetitionForm } from './components/EditCompetitionForm'

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const Competitions = () => {
    const [choosenCompetitionToEdit, setChoosenCompetitionToEdit] =
        useState<Game | null>(null)

    const { data, isLoading, error } = useGetCompetitionsQuery()
    const {
        data: Teams,
        isLoading: isTeamsLoading,
        error: errorTeams,
    } = useGetTeamsQuery()

    const getTeamNameById = (id: string) => {
        if (isTeamsLoading || !Teams) return 'Loading...'
        const team = Teams.find((team) => team.id === id)
        return team ? team.name : 'Unknown Team'
    }

    const handleEditCompetition = (competition: Game) => {
        setChoosenCompetitionToEdit(competition)
    }

    const handleOnClose = () => {
        setChoosenCompetitionToEdit(null)
    }

    if (isLoading || isTeamsLoading) {
        return <div>Loading...</div>
    }

    if (error || !data || errorTeams) {
        return <div>Error</div>
    }

    const render = () => {
        if (choosenCompetitionToEdit) {
            return (
                <EditCompetitionForm
                    game={choosenCompetitionToEdit}
                    onClose={handleOnClose}
                />
            )
        }

        return (
            <Fragment>
                <Actions />
                <CompetitionTable
                    competitions={data}
                    isLoading={isLoading || isTeamsLoading}
                    getTeamNameById={getTeamNameById}
                    onEditCompetition={handleEditCompetition}
                />
            </Fragment>
        )
    }

    return (
        <StyledWrapper>
            <Header level={1}>Competitions</Header>

            {render()}
        </StyledWrapper>
    )
}
