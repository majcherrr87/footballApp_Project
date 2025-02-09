import { useQuery } from '@tanstack/react-query'
import { useApi } from '../hooks/useApi'
import { Team } from '../types'

export const useGetTeamsQuery = () => {
    const { apiGet } = useApi()

    const { data, isLoading, error } = useQuery({
        queryKey: ['teams'],
        queryFn: async () => {
            return apiGet<Team[]>('teams')
        },
    })

    return {
        data,
        isLoading,
        error,
    }
}
