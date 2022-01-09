import { Source } from '@prole/model'
import { Result } from '@prole/model/src/types'

const MISC_ERROR = 'Unable to fetch suggestions. Try refreshing'

/**
 * Fetches suggestions for a search term
 */
export const fetchData = async (
  term: string,
  baseUrl: string = ''
): Promise<Result<Source[]>> => {
  try {
    const response = await fetch(`${baseUrl}/api/source/search?term=${term}`)

    if (response.ok) {
      const data: Source[] = await response.json()
      return {
        data,
        error: null,
      }
    }
    switch (response.status) {
      case 404:
        // no data for the provided term
        return {
          data: [],
          error: null,
        }
      case 400:
      case 500:
    }
  } catch (e) {
    console.error(e)
  }

  return {
    error: MISC_ERROR,
    data: null,
  }
}
