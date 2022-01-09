import { useEffect, useState } from 'react'
import { Endorsement, EndorsementResponse } from '@prole/model'

/**
 * Fetch the endorsement data for a provided domain
 */
export const useEndorsements = (
  domain: string | null,
  baseUrl: string = ''
) => {
  const [loading, setLoading] = useState<boolean>(Boolean(domain))
  const [endorsements, setEndorsements] = useState<Endorsement[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let aborted = false

    const fetchData = async () => {
      if (aborted) {
        return
      }

      try {
        const response = await fetch(
          `${baseUrl}/api/endorsement?domain=${domain}`
        )

        if (response.ok) {
          const { endorsements }: EndorsementResponse = await response.json()
          setEndorsements(endorsements)
        } else {
          switch (response.status) {
            case 404:
              // no data for the provided domain
              setEndorsements([])
              break
            case 400:
            case 500:
          }
        }
        setLoading(false)
      } catch (e) {
        setError('Unable to fetch endorsements.')
      }
    }

    if (domain) {
      setLoading(true)
      fetchData()
    }

    return () => {
      aborted = true
    }
  }, [domain, setEndorsements, setError])

  return {
    loading,
    endorsements,
    error,
  }
}
