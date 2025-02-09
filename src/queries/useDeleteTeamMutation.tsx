import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useApi } from '../hooks/useApi'
import { Team } from '../types'

export const useDeleteTeamMutation = () => {
    const { apiDelete } = useApi()

    const queryClient = useQueryClient()

    const { mutate, data, error, isPending } = useMutation({
        mutationKey: ['teams', 'delete'],
        mutationFn: async (id: string) => {
            return apiDelete<Team | undefined>(`teams/${id}`)
        },
        onSuccess: (deletedTeam) => {
            queryClient.setQueryData<Team[]>(['teams'], (oldTeams) => {
                return oldTeams?.filter((team) => team.id !== deletedTeam?.id)
            })
        },
    })

    return { mutate, data, error, isPending }
}
