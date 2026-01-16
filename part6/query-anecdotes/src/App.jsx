// components
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

// hooks
import { useGetAnecdotes, useVoteAnecdoteMutation } from './hooks/anecdoteHooks'
import { useNotification } from './hooks/useNotification'

const App = () => {
  const anecdotesResponse = useGetAnecdotes()
  const voteAnecdoteMutation = useVoteAnecdoteMutation()
  const { setNotification } = useNotification()
  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate(
      { ...anecdote, votes: anecdote.votes + 1 },
      {
        onSuccess: () => {
          setNotification(`you have voted for - ${anecdote.content} `)
        },
          onError: () => {
          setNotification(`you can't vote yet, causing by server problems `)
        },
      },
    )
  }

  if (anecdotesResponse.isLoading) {
    return <div> Loading data... </div>
  }

  if (anecdotesResponse.isError) {
    return (
      <div> anecdote service do not available due to problems in server </div>
    )
  }
  const anecdotes = anecdotesResponse.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
