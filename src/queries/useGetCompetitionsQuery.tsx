import { useQuery } from '@tanstack/react-query'
import { useApi } from '../hooks/useApi'
import { Game } from '../types'

export const useGetCompetitionsQuery = () => {
    const { apiGet } = useApi()

    const { data, isLoading, error } = useQuery({
        queryKey: ['games'],
        queryFn: async () => {
            return apiGet<Game[]>('games')
        },
    })

    return {
        data,
        isLoading,
        error,
    }
}
