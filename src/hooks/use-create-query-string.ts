import { useCallback } from 'react'

export default function useCreateQueryString(searchParams: URLSearchParams) {
  return useCallback(
    ({
      addParams = [],
      removeParams = [],
    }: {
      addParams?: { name: string; value: string }[]
      removeParams?: string[]
    }) => {
      // const searchParams = useSearchParams()
      const params = new URLSearchParams(searchParams.toString())

      // Add new parameters
      addParams.forEach(({ name, value }) => {
        params.set(name, value)
      })

      // Remove specified parameters
      removeParams.forEach((name) => {
        params.delete(name)
      })

      return params.toString()
    },
    [searchParams]
  )
}
