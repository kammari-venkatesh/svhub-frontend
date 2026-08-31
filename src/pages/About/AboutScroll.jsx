import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const EASE = 'power3.out'

function AboutScroll({ children }) {
  const root = useRef(null)

  useGSAP(
    () => {
      const page = root.current
      if (!page) return

      const mm = gsap.matchMedia()

      mm.add(
        {
          motion: '(prefers-reduced-motion: no-preference)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
          isPhone: '(max-width: 899px)',
        },
        (context) => {
          const { reduceMotion, isPhone } = context.conditions
          const steps = gsap.utils.toArray('[data-story]')

          if (reduceMotion) {
            steps.forEach((section) => {
              gsap.set(section.querySelectorAll('.about-rise, .about-figure, .about-pillar'), {
                clearProps: 'all',
              })
            })
            return
          }

          steps.forEach((section) => {
            const copyBits = section.querySelectorAll('.about-rise')
            const figure = section.querySelector('.about-figure')
            const pillars = section.querySelectorAll('.about-pillar')

            if (copyBits.length) gsap.set(copyBits, { autoAlpha: 0, y: 20 })
            if (figure) gsap.set(figure, { clipPath: 'inset(0 0 100% 0)', autoAlpha: 0.4, scale: 0.97 })
            if (pillars.length) gsap.set(pillars, { autoAlpha: 0, y: 18 })

            ScrollTrigger.create({
              trigger: section,
              start: 'top 82%',
              once: true,
              onEnter: () => {
                const tl = gsap.timeline({ defaults: { ease: EASE, overwrite: 'auto' } })
                if (copyBits.length) {
                  tl.to(copyBits, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08 })
                }
                if (figure) {
                  tl.to(
                    figure,
                    { clipPath: 'inset(0% 0% 0% 0%)', autoAlpha: 1, scale: 1, duration: 0.92 },
                    copyBits.length ? '-=0.48' : 0,
                  )
                }
                if (pillars.length) {
                  tl.to(pillars, { autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.12 }, '-=0.32')
                }
              },
            })
          })

          const travel = isPhone ? 8 : 16
          gsap.utils.toArray('[data-speed]').forEach((el) => {
            const speed = Number(el.dataset.speed) || 0.08
            const distance = travel * speed * 4
            gsap.fromTo(
              el,
              { '--p': -distance },
              {
                '--p': distance,
                ease: 'none',
                scrollTrigger: {
                  trigger: el.closest('section') || el,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: isPhone ? 1.2 : 0.85,
                },
              },
            )
          })

          const refresh = () => ScrollTrigger.refresh()
          const pending = [...page.querySelectorAll('img')].filter((img) => !img.complete)
          pending.forEach((img) => img.addEventListener('load', refresh, { once: true }))

          return () => {
            pending.forEach((img) => img.removeEventListener('load', refresh))
          }
        },
      )

      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <div ref={root} className="about">
      {children}
    </div>
  )
}

export default AboutScroll
