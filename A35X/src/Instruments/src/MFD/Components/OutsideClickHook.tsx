import { useCallback, useEffect, useRef } from 'react'

export const useClickOutsideListenerRef = (onClose: () => void) => {
  const ref = useRef(null)
  const clickListener = useCallback(
    (e: MouseEvent) => {
      if (!(ref.current! as any).contains(e.target)) {
        onClose?.()
      }
    },
    [ref.current],
  )
  useEffect(() => {
    document.addEventListener('click', clickListener)
    return () => {
      document.removeEventListener('click', clickListener)
    }
  }, [])
  return ref
}