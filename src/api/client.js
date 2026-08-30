const API_URL = import.meta.env.VITE_API_URL || '/api'

export async function getHealth() {
  const response = await fetch(`${API_URL}/health`)

  if (!response.ok) {
    throw new Error(`API responded with ${response.status}`)
  }

  return response.json()
}
