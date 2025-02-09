import { useQuery } from '@tanstack/react-query'
import { useApi } from '../hooks/useApi'
import { Player } from '../types'

export const useGetPlayersByTeamQuery = (teamId: string) => {
    const { apiGet } = useApi()

    return useQuery({
        queryKey: ['players', 'team', teamId],
        queryFn: async () => {
            const allPlayers = await apiGet<Player[]>('players')
            return allPlayers.filter((player) => player.teamId === teamId)
        },
        enabled: !!teamId,
    })
}
