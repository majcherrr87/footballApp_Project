import { useQuery } from '@tanstack/react-query'
import { useApi } from '../hooks/useApi'
import { Player } from '../types'

export const useGetPlayersQuery = () => {
    const { apiGet } = useApi()

    const { data, isLoading, error } = useQuery({
        queryKey: ['players'],
        queryFn: async () => {
            return apiGet<Player[]>('players')
        },
    })

    return {
        data,
        isLoading,
        error,
    }
}
