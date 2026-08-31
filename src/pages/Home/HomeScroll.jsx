import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

ScrollTrigger.config({ ignoreMobileResize: true })

const IOS_EASE = 'expo.out'

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
            gsap.set(['.home-reveal', '.home-stagger > *', '.hero__content > *', '.hero__image'], {
              clearProps: 'all',
            })
            return
          }

          page.classList.add('home-page--motion')

          gsap.fromTo(
            '.hero__content > *',
            { autoAlpha: 0, y: 28 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 1.15,
              ease: IOS_EASE,
              stagger: 0.08,
              delay: 0.05,
            },
          )

          gsap.fromTo(
            '.hero__image',
            { autoAlpha: 0, y: 40 },
            { autoAlpha: 1, y: 0, duration: 1.35, ease: IOS_EASE, delay: 0.16 },
          )

          const singles = gsap.utils.toArray('.home-reveal:not(.home-stagger)')
          if (singles.length) {
            gsap.set(singles, { autoAlpha: 0, y: 44, scale: 0.985 })

            ScrollTrigger.batch(singles, {
              start: 'top 92%',
              once: true,
              interval: 0.12,
              batchMax: 6,
              onEnter: (batch) => {
                batch.forEach((el, i) => {
                  gsap.to(el, {
                    autoAlpha: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.05,
                    ease: IOS_EASE,
                    overwrite: true,
                    delay: i * 0.08 + Number(el.getAttribute('data-delay') || 0) / 1000,
                  })
                })
              },
            })
          }

          gsap.utils.toArray('.home-stagger').forEach((group) => {
            const items = group.children
            if (!items.length) return

            gsap.set(items, { autoAlpha: 0, y: 36 })

            ScrollTrigger.create({
              trigger: group,
              start: 'top 90%',
              once: true,
              onEnter: () => {
                gsap.to(items, {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.95,
                  ease: IOS_EASE,
                  stagger: 0.07,
                  overwrite: true,
                  delay: Number(group.getAttribute('data-delay') || 0) / 1000,
                })
              },
            })
          })

          const travel = isPhone ? 22 : 46

          gsap.utils.toArray('[data-speed]').forEach((el) => {
            const speed = Number(el.dataset.speed) || 0.12
            const distance = travel * speed * 5.5

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
                  scrub: isPhone ? 1.15 : 0.75,
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
