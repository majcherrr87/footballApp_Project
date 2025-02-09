import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useApi } from '../hooks/useApi'
import { Game, GameDto } from '../types'

export const useAddCompetitionMutation = () => {
    const { apiPost } = useApi()

    const queryClient = useQueryClient()

    const { mutate, data, error, isPending } = useMutation({
        mutationKey: ['games', 'add'],
        mutationFn: async (newGame: GameDto) => {
            return apiPost<Game, GameDto>(`games`, newGame)
        },
        onSuccess: (newGame) => {
            queryClient.setQueryData<Game[]>(['games'], (oldGames) => {
                return oldGames ? [...oldGames, newGame] : [newGame]
            })
        },
    })

    return { mutate, data, error, isPending }
}
