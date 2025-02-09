import { useQuery } from '@tanstack/react-query'
import { useApi } from '../hooks/useApi'
import { Player } from '../types'

export const useGetPlayersWithoutTeamQuery = () => {
    const { apiGet } = useApi()

    const { data, isLoading, error } = useQuery({
        queryKey: ['players'],
        queryFn: async () => {
            return apiGet<Player[]>('players')
        },
        select: (players: Player[]) =>
            players.filter((player) => !player.teamId && !player.teamName),
    })

    return {
        data,
        isLoading,
        error,
    }
}
