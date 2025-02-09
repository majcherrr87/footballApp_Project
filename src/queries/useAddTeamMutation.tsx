import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useApi } from '../hooks/useApi'
import { Team, TeamDto } from '../types'

export const useAddTeamMutation = () => {
    const { apiPost } = useApi()

    const queryClient = useQueryClient()

    const { mutate, data, error, isPending } = useMutation({
        mutationKey: ['teams', 'add'],
        mutationFn: async (newTeam: TeamDto) => {
            return apiPost<Team, TeamDto>(`teams`, newTeam)
        },
        onSuccess: (newTeam) => {
            queryClient.setQueryData<Team[]>(['teams'], (oldTeams) => {
                return oldTeams ? [...oldTeams, newTeam] : [newTeam]
            })
        },
    })

    return { mutate, data, error, isPending }
}
