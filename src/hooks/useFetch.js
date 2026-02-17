import { useEffect, useState } from 'react'

export default function useFetch(fetcher, dependencies = []) {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadData() {
      try {
        // Reset request state before every new fetch.
        setIsLoading(true)
        setError('')
        const response = await fetcher(controller.signal)
        setData(response)
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message || 'Something went wrong.')
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadData()

    // Abort in-flight requests when dependencies change or component unmounts.
    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)

  return { data, isLoading, error }
}
