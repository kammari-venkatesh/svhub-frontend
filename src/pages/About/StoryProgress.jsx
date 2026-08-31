import { useEffect, useRef, useState } from 'react'
import { aboutStorySteps } from '../../data/about.js'
import './StoryProgress.css'

function CheckIcon() {
  return (
    <svg className="story-rail__check" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path
        d="M2 5.2 4.2 7.4 8 2.6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function scrollToAnchor(anchor) {
  const node = document.getElementById(anchor)
  if (!node) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  node.scrollIntoView({
    behavior: reduce ? 'instant' : 'smooth',
    block: 'center',
  })
}

function StoryProgress() {
  const railRef = useRef(null)
  const mobileRef = useRef(null)
  const activeRef = useRef(0)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const railEl = railRef.current
    const mobileEl = mobileRef.current
    const storyWrap = railEl?.closest('.about-story')
    if (!storyWrap) return undefined

    const sectionElements = aboutStorySteps
      .map((step) => document.getElementById(step.anchor))
      .filter(Boolean)

    if (!sectionElements.length) return undefined

    let rafId = null

    const updateProgress = () => {
      rafId = null
      const probe = window.innerHeight * 0.5
      const firstSection = sectionElements[0]
      const lastSection = sectionElements[sectionElements.length - 1]

      const firstRect = firstSection.getBoundingClientRect()
      const lastRect = lastSection.getBoundingClientRect()

      const firstCenter = firstRect.top + firstRect.height * 0.5
      const lastCenter = lastRect.top + lastRect.height * 0.5
      const span = lastCenter - firstCenter

      let progress = 0
      if (span > 0) {
        progress = (probe - firstCenter) / span
      }
      const clamped = Math.max(0, Math.min(1, progress))
      const progressValue = clamped.toFixed(4)

      if (railEl) {
        railEl.style.setProperty('--story-progress', progressValue)
      }
      if (mobileEl) {
        mobileEl.style.setProperty('--story-progress', progressValue)
      }

      let closestIdx = 0
      let minDistance = Infinity
      sectionElements.forEach((el, index) => {
        const rect = el.getBoundingClientRect()
        const center = rect.top + rect.height * 0.5
        const dist = Math.abs(center - probe)
        if (dist < minDistance) {
          minDistance = dist
          closestIdx = index
        }
      })

      if (closestIdx !== activeRef.current) {
        activeRef.current = closestIdx
        setActive(closestIdx)
      }
    }

    const onScroll = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateProgress)
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-story-index'))
            if (!Number.isNaN(idx) && idx !== activeRef.current) {
              activeRef.current = idx
              setActive(idx)
            }
          }
        })
      },
      {
        root: null,
        rootMargin: '-35% 0px -50% 0px',
        threshold: 0,
      },
    )

    sectionElements.forEach((el) => observer.observe(el))
    updateProgress()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId)
      }
    }
  }, [])

  const current = aboutStorySteps[active] ?? aboutStorySteps[0]
  const total = String(aboutStorySteps.length).padStart(2, '0')

  return (
    <>
      <nav ref={railRef} className="story-rail" aria-label="Story chapters navigation">
        <div className="story-rail__sticky">
          <div className="story-rail__track-container">
            <div className="story-rail__spine" aria-hidden="true">
              <span className="story-rail__track" />
              <span className="story-rail__fill" />
            </div>

            <ol className="story-rail__list">
              {aboutStorySteps.map((step, index) => {
                const isCurrent = index === active
                const isDone = index < active
                const state = isDone ? 'done' : isCurrent ? 'current' : 'future'

                return (
                  <li key={step.id} className={`story-rail__item is-${state}`}>
                    <button
                      type="button"
                      className="story-rail__btn"
                      onClick={() => scrollToAnchor(step.anchor)}
                      aria-current={isCurrent ? 'step' : undefined}
                      aria-label={`Jump to chapter ${step.index}: ${step.label}`}
                    >
                      <span className="story-rail__num" aria-hidden="true">
                        {step.index}
                      </span>
                      <span className="story-rail__node" aria-hidden="true">
                        <span className="story-rail__dot">
                          {isDone ? <CheckIcon /> : null}
                        </span>
                      </span>
                      <span className="story-rail__label">{step.label}</span>
                    </button>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </nav>

      <div ref={mobileRef} className="story-mobile-bar" aria-live="polite">
        <div className="story-mobile-bar__content">
          <span className="story-mobile-bar__counter">
            {current.index} / {total}
          </span>
          <span className="story-mobile-bar__sep" aria-hidden="true">
            ·
          </span>
          <span key={current.id} className="story-mobile-bar__label">
            {current.label}
          </span>
        </div>
        <div className="story-mobile-bar__spine" aria-hidden="true">
          <span className="story-mobile-bar__track" />
          <span className="story-mobile-bar__fill" />
        </div>
      </div>
    </>
  )
}

export default StoryProgress
