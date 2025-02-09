import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useApi } from '../hooks/useApi'
import { Player, PlayerDto } from '../types'

type EditRosterParams = {
    playerId: string
    teamId: string | null
    teamName: string | null
}

export const useEditTeamRosterMutation = () => {
    const { apiPatch } = useApi()
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['players', 'edit'],
        mutationFn: async ({
            playerId,
            teamId,
            teamName,
        }: EditRosterParams) => {
            return apiPatch<Player, Partial<PlayerDto>>(`players/${playerId}`, {
                teamId: teamId ?? '',
                teamName: teamName ?? '',
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['players'] })
            queryClient.invalidateQueries({ queryKey: ['teams'] })
        },
    })
}
