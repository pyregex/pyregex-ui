import { useState, useEffect } from 'react'

export function useDebounced<T>(value: T, debounceTime: number): T {
  const [data, setData] = useState(value)

  useEffect(() => {
    const id = setTimeout(() => {
      console.log('data is being set!')
      setData(value)
    }, debounceTime)

    return () => {
      console.log('cancelling the timeout!')
      clearTimeout(id)
    }
  }, [data, debounceTime])

  return data
}
