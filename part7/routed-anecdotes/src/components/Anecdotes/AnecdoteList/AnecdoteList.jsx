const AnecdoteList = ({ anecdotes }) => {
  console.log(anecdotes);
  return (
    <div>
      <ul>
        {anecdotes.map((anecdote) => (
          <li key={anecdote.id}>{anecdote.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default AnecdoteList;
