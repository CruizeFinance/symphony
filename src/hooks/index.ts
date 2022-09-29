import { RefObject, useEffect } from 'react'

/*
 * a hook written to detect click outside an element
 */
export function useOutsideAlerter(ref: RefObject<Element>, fn: () => void) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Element)) {
        fn()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])
}
