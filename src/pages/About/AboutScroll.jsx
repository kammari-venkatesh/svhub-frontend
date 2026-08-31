/**
 * AboutScroll — GSAP scroll-triggered animation orchestrator
 *
 * Animations:
 * 1. Section reveals: .about-reveal elements — fade up, staggered
 * 2. Image parallax: [data-speed] elements — subtle vertical shift
 * 3. Image entrance: .about-figure — fade in + scale
 * 4. Grains + Pillars: stagger class toggle via IntersectionObserver (CSS handles animation)
 */

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

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
          isPhone: '(max-width: 767px)',
        },
        (context) => {
          const { reduceMotion, isPhone } = context.conditions

          if (reduceMotion) return

          /* ─── 1. Section text reveals ─────────────────────────────────
             .about-reveal elements fade up when their section enters view.
             Delay variants (.about-reveal--delay-1, --delay-2) add stagger.
          ──────────────────────────────────────────────────────────────── */

          const DELAYS = {
            '': 0,
            'about-reveal--delay-1': 0.12,
            'about-reveal--delay-2': 0.24,
          }

          const allRevealEls = page.querySelectorAll('.about-reveal')

          allRevealEls.forEach((el) => {
            // Find which delay class it has
            let delay = 0
            for (const [cls, val] of Object.entries(DELAYS)) {
              if (cls && el.classList.contains(cls)) {
                delay = val
                break
              }
            }

            gsap.set(el, { autoAlpha: 0, y: 28 })

            ScrollTrigger.create({
              trigger: el,
              start: 'top 86%',
              once: true,
              onEnter: () => {
                gsap.to(el, {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.75,
                  delay,
                  ease: 'power3.out',
                  overwrite: 'auto',
                })
              },
            })
          })

          /* ─── 2. Figure entrance (scale + fade) ───────────────────────
             Images scale from 0.96 → 1 as they enter the viewport.
          ──────────────────────────────────────────────────────────────── */

          page.querySelectorAll('.about-figure').forEach((fig) => {
            gsap.set(fig, { autoAlpha: 0, scale: 0.95, transformOrigin: 'center center' })

            ScrollTrigger.create({
              trigger: fig,
              start: 'top 88%',
              once: true,
              onEnter: () => {
                gsap.to(fig, {
                  autoAlpha: 1,
                  scale: 1,
                  duration: 0.9,
                  ease: 'power3.out',
                  overwrite: 'auto',
                })
              },
            })
          })

          /* ─── 3. Pillar stagger (CSS animation via class toggle) ────────
             When .about-why__pillars enters view, add .is-visible to each
             pillar. The CSS @keyframes handle the actual staggered animation
             using --i custom property for stagger offset.
          ──────────────────────────────────────────────────────────────── */

          const pillarsSection = page.querySelector('.about-why__pillars')
          if (pillarsSection) {
            ScrollTrigger.create({
              trigger: pillarsSection,
              start: 'top 78%',
              once: true,
              onEnter: () => {
                pillarsSection
                  .querySelectorAll('.about-pillar')
                  .forEach((el) => el.classList.add('is-visible'))
              },
            })
          }

          /* ─── 4. Grain cards stagger (CSS animation via class toggle) ──
             Same approach as pillars.
          ──────────────────────────────────────────────────────────────── */

          const grainsGrid = page.querySelector('.about-grains__grid')
          if (grainsGrid) {
            ScrollTrigger.create({
              trigger: grainsGrid,
              start: 'top 82%',
              once: true,
              onEnter: () => {
                grainsGrid
                  .querySelectorAll('.about-grain-wrap')
                  .forEach((el) => el.classList.add('is-visible'))
              },
            })
          }

          /* ─── 5. Parallax on hero + close background images ───────────
             Subtle vertical shift (max ~14px) creates depth without
             looking animated. Uses custom property --p set on the shift
             wrapper, read as translateY in CSS (but we set it via GSAP
             fromTo on the element's transform directly for perf).
          ──────────────────────────────────────────────────────────────── */

          const parallaxTravel = isPhone ? 8 : 14

          page.querySelectorAll('[data-speed]').forEach((el) => {
            const speed = Number(el.dataset.speed) || 0.08
            const dist = parallaxTravel * speed * 4

            gsap.fromTo(
              el,
              { y: -dist },
              {
                y: dist,
                ease: 'none',
                scrollTrigger: {
                  trigger: el.closest('section') ?? el,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: isPhone ? 1.5 : 1,
                },
              },
            )
          })

          /* ─── 6. Closing CTA reveal ───────────────────────────────────
             The .about-close__copy block also uses .about-reveal,
             already handled above, but we add a slight upward slide to
             the text group as a whole for extra polish.
          ──────────────────────────────────────────────────────────────── */

          // Refresh when images load
          const lazyImgs = [...page.querySelectorAll('img[loading="lazy"]')].filter(
            (img) => !img.complete,
          )
          const refresh = () => ScrollTrigger.refresh()
          lazyImgs.forEach((img) => img.addEventListener('load', refresh, { once: true }))

          return () => {
            lazyImgs.forEach((img) => img.removeEventListener('load', refresh))
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
