import { useEffect, useRef, useState } from 'react'

export function useInView({
  once = true,
  rootMargin = '0px 0px -6% 0px',
  threshold = 0.08,
} = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(() =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const el = ref.current
    if (!el || visible) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) observer.disconnect()
        }
      },
      { rootMargin, threshold },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [once, rootMargin, threshold, visible])

  return { ref, visible }
}
