// components
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

// hooks
import { useGetAnecdotes } from './hooks/anecdoteHooks'

const App = () => {
  const handleVote = (anecdote) => {
    console.log('vote')
  }
  const anecdotesResponse = useGetAnecdotes()

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
