export const authHeader = (token: string) => `Bearer ${token}`

/**
 * Checks whether the token is valid
 */
export const validateToken = async (token: string | null) => {
  if (!token) {
    return false
  }

  const response = await fetch('/api/admin', {
    headers: {
      Authorization: authHeader(token),
    },
  })

  return response.ok
}
