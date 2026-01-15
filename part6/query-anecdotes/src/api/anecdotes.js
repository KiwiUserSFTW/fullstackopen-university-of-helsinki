const baseUrl = 'http://localhost:3001'

export const getAnecdotes = async () => {
  const response = await fetch(`${baseUrl}/anecdotes`)
  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }
  return await response.json()
}
