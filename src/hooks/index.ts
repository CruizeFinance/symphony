import { RefObject, useEffect, useRef } from 'react'

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

/* 
  * a hook written to call a function only once
*/
export function useOnceCall(cb: Function) {
  const isCalledRef = useRef(false)

  useEffect(() => {
    if (!isCalledRef.current) {
      isCalledRef.current = true
      cb()
    }
  }, [cb])
}
