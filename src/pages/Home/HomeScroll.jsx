import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

ScrollTrigger.config({ ignoreMobileResize: true })

const EASE = 'power3.out'

function HomeScroll({ children }) {
  const root = useRef(null)

  useGSAP(
    () => {
      const page = root.current
      if (!page) return

      const mm = gsap.matchMedia()

      mm.add(
        {
          motion: '(prefers-reduced-motion: no-preference)',
          isPhone: '(max-width: 767px)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { isPhone, reduceMotion } = context.conditions

          if (reduceMotion) {
            page.classList.remove('home-page--motion')
            gsap.set(['.home-reveal', '.home-stagger > *'], { clearProps: 'all' })
            return
          }

          page.classList.add('home-page--motion')

          const singles = gsap.utils.toArray('.home-reveal:not(.home-stagger)')
          if (singles.length) {
            gsap.set(singles, { autoAlpha: 0, y: 28 })

            ScrollTrigger.batch(singles, {
              start: 'top 90%',
              once: true,
              interval: 0.1,
              batchMax: 6,
              onEnter: (batch) => {
                batch.forEach((el, i) => {
                  gsap.to(el, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.7,
                    ease: EASE,
                    overwrite: true,
                    delay: i * 0.06 + Number(el.getAttribute('data-delay') || 0) / 1000,
                  })
                })
              },
            })
          }

          gsap.utils.toArray('.home-stagger').forEach((group) => {
            const items = group.children
            if (!items.length) return

            gsap.set(items, { autoAlpha: 0, y: 24 })

            ScrollTrigger.create({
              trigger: group,
              start: 'top 88%',
              once: true,
              onEnter: () => {
                gsap.to(items, {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.65,
                  ease: EASE,
                  stagger: 0.07,
                  overwrite: true,
                  delay: Number(group.getAttribute('data-delay') || 0) / 1000,
                })
              },
            })
          })

          const travel = isPhone ? 12 : 28

          gsap.utils.toArray('[data-speed]').forEach((el) => {
            const speed = Number(el.dataset.speed) || 0.12
            const distance = travel * speed * 4

            gsap.fromTo(
              el,
              { '--p': -distance },
              {
                '--p': distance,
                ease: 'none',
                scrollTrigger: {
                  trigger: el,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: isPhone ? 1.1 : 0.8,
                },
              },
            )
          })

          const refresh = () => ScrollTrigger.refresh()
          const pending = [...page.querySelectorAll('img')].filter((img) => !img.complete)
          pending.forEach((img) => img.addEventListener('load', refresh, { once: true }))

          return () => {
            page.classList.remove('home-page--motion')
            pending.forEach((img) => img.removeEventListener('load', refresh))
          }
        },
      )

      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <div ref={root} className="home-page">
      {children}
    </div>
  )
}

export default HomeScroll
