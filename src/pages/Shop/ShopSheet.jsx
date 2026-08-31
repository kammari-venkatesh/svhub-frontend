import { useEffect, useRef } from 'react'

function ShopSheet({ open, title, labelledBy, onClose, children }) {
  const closeRef = useRef(null)
  const lastFocus = useRef(null)

  useEffect(() => {
    if (!open) return undefined

    lastFocus.current = document.activeElement
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const frame = window.requestAnimationFrame(() => {
      closeRef.current?.focus()
    })

    function onKey(event) {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKey)
    return () => {
      window.cancelAnimationFrame(frame)
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
      if (lastFocus.current instanceof HTMLElement) lastFocus.current.focus()
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="shop-sheet" role="presentation">
      <button type="button" className="shop-sheet__backdrop" aria-label="Close" onClick={onClose} />
      <div
        className="shop-sheet__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
      >
        <div className="shop-sheet__handle" aria-hidden="true" />
        <header className="shop-sheet__header">
          <h2 id={labelledBy} className="shop-sheet__title">
            {title}
          </h2>
          <button ref={closeRef} type="button" className="shop-sheet__close" onClick={onClose}>
            Close
          </button>
        </header>
        <div className="shop-sheet__body">{children}</div>
      </div>
    </div>
  )
}

export default ShopSheet
