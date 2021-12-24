export const fetchData = async (setData, setLoading, setError) => {
  try {
    if (url) {
      const newEndorsements = await fetch('prole', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hostname: url }),
      }).then((res) => res.json())
      setData(newEndorsements)
      setLoading(false)
    }
  } catch (e) {
    setError(e)
  }
}
