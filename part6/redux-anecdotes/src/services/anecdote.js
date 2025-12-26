const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await fetch(baseUrl);

  if (!response.ok) {
    throw new Error("Failed to fetch anecdotes");
  }
  return response.json();
};

const createAnecdote = async (content) => {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, votes: 0 }),
  });

  if (!response.ok) {
    throw new Error("Failed to create anecdote");
  }

  return await response.json();
};

const updateAnecdote = async ({ votes, id }) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ votes }),
  });

  if (!response.ok) {
    throw new Error("Failed to create anecdote");
  }

  return await response.json();
};

export default { getAll, createAnecdote, updateAnecdote };
