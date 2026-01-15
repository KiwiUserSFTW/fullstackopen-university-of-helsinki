import { useQuery } from '@tanstack/react-query'
import { getAnecdotes } from '../api/anecdotes'

export const useGetAnecdotes = () =>
  useQuery({
    queryKey: ['anecdoes'],
    queryFn: getAnecdotes,
  })
