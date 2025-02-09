import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useApi } from '../hooks/useApi'
import { Player } from '../types'

export const useDeletePlayerMutation = () => {
    const { apiDelete } = useApi()

    const queryClient = useQueryClient()

    const { mutate, data, error, isPending } = useMutation({
        mutationKey: ['players', 'delete'],
        mutationFn: async (id: string) => {
            return apiDelete<Player | undefined>(`players/${id}`)
        },
        onSuccess: (deletedPlayer) => {
            queryClient.setQueryData<Player[]>(['players'], (oldPlayers) => {
                return oldPlayers?.filter(
                    (player) => player.id !== deletedPlayer?.id,
                )
            })
        },
    })

    return { mutate, data, error, isPending }
}
