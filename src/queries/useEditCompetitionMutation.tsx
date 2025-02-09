import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useApi } from '../hooks/useApi'
import { Game, GameDto } from '../types'

export const useCompetitionTeamMutation = (competitionId: string) => {
    const { apiPut } = useApi()
    const queryClient = useQueryClient()

    const { mutate, data, error, isPending } = useMutation({
        mutationKey: ['games', 'edit', competitionId],
        mutationFn: async (updatedCompetitionData: GameDto) => {
            return apiPut<Game, GameDto>(
                `games/${competitionId}`,
                updatedCompetitionData,
            )
        },
        onSuccess: (updatedCompetition) => {
            queryClient.setQueryData<Game[]>(
                ['games'],
                (oldCompetitions: Game[] | undefined) => {
                    return oldCompetitions?.map((competition) =>
                        competition.id === updatedCompetition?.id
                            ? updatedCompetition
                            : competition,
                    )
                },
            )
        },
    })

    return { mutate, data, error, isPending }
}
