import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useApi } from '../hooks/useApi'
import { Team } from '../types'

export interface TeamDto {
    name: string
    year: number
    location: string
}

export const useEditTeamMutation = (teamId: string) => {
    const { apiPut } = useApi()
    const queryClient = useQueryClient()

    const { mutate, data, error, isPending } = useMutation({
        mutationKey: ['teams', 'edit', teamId],
        mutationFn: async (updatedTeamData: TeamDto) => {
            return apiPut<Team, TeamDto>(`teams/${teamId}`, updatedTeamData)
        },
        onSuccess: (updatedTeam) => {
            queryClient.setQueryData<Team[]>(
                ['teams'],
                (oldTeams: Team[] | undefined) => {
                    return oldTeams?.map((team) =>
                        team.id === updatedTeam?.id ? updatedTeam : team,
                    )
                },
            )
        },
    })

    return { mutate, data, error, isPending }
}
