import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useApi } from '../hooks/useApi'
import { Player, PlayerDto } from '../types'

export const useEditPlayerMutation = (playerId: string) => {
    const { apiPut } = useApi()

    const queryClient = useQueryClient()

    const { mutate, data, error, isPending } = useMutation({
        mutationKey: ['players', 'edit', playerId],
        mutationFn: async (newDataAboutPlayer: PlayerDto) => {
            return apiPut<Player, PlayerDto>(
                `players/${playerId}`,
                newDataAboutPlayer,
            )
        },
        onSuccess: (editedPlayer) => {
            queryClient.setQueryData<Player[]>(
                ['players'],
                (oldPlayers: Player[] | undefined) => {
                    return oldPlayers?.map((player) =>
                        player.id === editedPlayer?.id ? editedPlayer : player,
                    )
                },
            )
        },
    })

    return { mutate, data, error, isPending }
}
