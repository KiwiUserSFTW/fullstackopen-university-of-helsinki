// react-query
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

// api
import { createAnecdote, getAnecdotes, updateAnecdote } from '../api/anecdotes'

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

export const useVoteAnecdoteMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      queryClient.setQueryData(['anecdotes'], (anecdotes) =>
        anecdotes.map((anecdote) =>
          anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote,
        ),
      )
    },
  })
}
