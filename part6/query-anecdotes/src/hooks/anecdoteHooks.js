// react-query
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

// api
import { createAnecdote, getAnecdotes } from '../api/anecdotes'

export const useGetAnecdotes = () => {
  return useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
  })
}

export const useCreateAnecdoteMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.setQueryData(['anecdotes'], (anecdotes) =>
        anecdotes.concat(newAnecdote),
      )
    },
  })
}
