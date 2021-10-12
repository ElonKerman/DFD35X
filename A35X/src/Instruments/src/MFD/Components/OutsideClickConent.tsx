import React, { useCallback, useEffect, useRef } from 'react'

export const Content: React.FC<{ onClose: any }> = ({ onClose, children }) => {
  const ref = useRef(null)
  const clickListener = useCallback(
    (e: MouseEvent) => {
      if (!(ref.current! as any).contains(e.target)) {
        onClose?.() // using optional chaining here, change to onClose && onClose(), if required
      }
    },
    [ref.current],
  )
  // Below is the 10 lines of code you need.
  useEffect(() => {
    console.log("effecting")
    // Attach the listeners on component mount.
    document.addEventListener('click', clickListener)
    // Detach the listeners on component unmount.
    return () => {
        console.log("returning")
      document.removeEventListener('click', clickListener)
    }
  }, [])
  return (
    <div
      ref={ref}
    >
      {children}
    </div>
  )
}