import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useApi } from '../hooks/useApi'
import { Player, PlayerDto } from '../types'

export const useAddPlayerMutation = () => {
    const { apiPost } = useApi()

    const queryClient = useQueryClient()

    const { mutate, data, error, isPending } = useMutation({
        mutationKey: ['players', 'add'],
        mutationFn: async (newPlayer: PlayerDto) => {
            return apiPost<Player, PlayerDto>(`players`, newPlayer)
        },
        onSuccess: (newPlayer) => {
            queryClient.setQueryData<Player[]>(['players'], (oldPlayers) => {
                return oldPlayers ? [...oldPlayers, newPlayer] : [newPlayer]
            })
        },
    })

    return { mutate, data, error, isPending }
}
