import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/ui/Button.jsx'
import {
  aboutChapters,
  aboutClose,
  aboutGrains,
  aboutHero,
  aboutIntro,
  aboutWhy,
} from '../../data/about.js'
import AboutScroll from './AboutScroll.jsx'
import './About.css'

// ─── helpers ─────────────────────────────────────────────────────────────────

function scrollToStory() {
  const node = document.getElementById('story-roots')
  if (!node) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  node.scrollIntoView({ behavior: reduce ? 'instant' : 'smooth', block: 'start' })
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function AboutHero() {
  return (
    <section className="about-hero" aria-labelledby="about-hero-heading">
      <div className="about-hero__media" aria-hidden="true">
        <span className="about-hero__shift" data-speed="0.06">
          <img src={aboutHero.image} alt={aboutHero.imageAlt} />
        </span>
        <span className="about-hero__veil" />
      </div>

      <div className="about-hero__copy">
        <p className="about-hero__eyebrow">{aboutHero.eyebrow}</p>
        <h1 id="about-hero-heading">
          Rooted in Tradition,
          <br />
          Built for Modern Life.
        </h1>
        <p className="about-hero__lede">{aboutHero.copy}</p>
        <Button variant="primary" size="md" arrow className="about-hero__cta" onClick={scrollToStory}>
          {aboutHero.cta}
        </Button>
      </div>

      <button type="button" className="about-hero__cue" onClick={scrollToStory} aria-label="Scroll to story">
        <span className="about-hero__cue-text">Scroll to explore</span>
        <span className="about-hero__arrow" aria-hidden="true">↓</span>
      </button>
    </section>
  )
}

// ─── SHARED FIGURE ────────────────────────────────────────────────────────────

function StoryFigure({ src, alt }) {
  return (
    <figure className="about-figure">
      <div className="about-figure__inner" data-speed="0.06">
        <img src={src} alt={alt} loading="lazy" decoding="async" />
      </div>
    </figure>
  )
}

// ─── CHAPTER 01 — OUR ROOTS ──────────────────────────────────────────────────

function AboutIntro() {
  return (
    <section
      id="story-roots"
      data-story="roots"
      className="about-section about-section--roots"
      aria-labelledby="about-intro-heading"
    >
      <div className="about-section__inner">
        <div className="about-section__copy">
          <p className="about-eyebrow about-reveal">
            <span className="about-eyebrow__num">{aboutIntro.chapterNum}</span>
            {aboutIntro.eyebrow}
          </p>
          <h2 id="about-intro-heading" className="about-reveal about-reveal--delay-1">
            A house of native goodness,
            <br />
            from Coimbatore.
          </h2>
          <div className="about-reveal about-reveal--delay-2">
            {aboutIntro.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="about-origin">{aboutIntro.origin}</p>
          </div>
        </div>
        <StoryFigure src={aboutIntro.image} alt={aboutIntro.imageAlt} />
      </div>
    </section>
  )
}

// ─── CHAPTERS 02–04 ───────────────────────────────────────────────────────────

function AboutChapter({ chapter }) {
  return (
    <section
      id={`story-${chapter.id}`}
      data-story={chapter.id}
      className={`about-section about-section--${chapter.id}${chapter.flip ? ' is-flip' : ''}`}
      aria-labelledby={`about-${chapter.id}-heading`}
    >
      <div className="about-section__inner">
        <StoryFigure src={chapter.image} alt={chapter.imageAlt} />
        <div className="about-section__copy">
          <p className="about-eyebrow about-reveal">
            <span className="about-eyebrow__num">{chapter.number}</span>
            {chapter.eyebrow}
          </p>
          <h2 id={`about-${chapter.id}-heading`} className="about-reveal about-reveal--delay-1">
            {chapter.title}
          </h2>
          <p className="about-reveal about-reveal--delay-2">{chapter.copy}</p>
        </div>
      </div>
    </section>
  )
}

// ─── CHAPTER 05 — OUR FUTURE ─────────────────────────────────────────────────

function AboutWhy() {
  return (
    <section
      id="story-future"
      data-story="future"
      className="about-section about-section--future"
      aria-labelledby="about-why-heading"
    >
      <div className="about-why__inner">
        <header className="about-why__head">
          <p className="about-eyebrow about-reveal">
            <span className="about-eyebrow__num">05</span>
            OUR FUTURE
          </p>
          <h2 id="about-why-heading" className="about-reveal about-reveal--delay-1">
            What we&apos;re working toward.
          </h2>
          <p className="about-why__lead about-reveal about-reveal--delay-2">{aboutWhy.copy}</p>
        </header>

        <ol className="about-why__pillars">
          {aboutWhy.pillars.map((pillar, i) => (
            <li key={pillar.number} className="about-pillar" style={{ '--i': i }}>
              <span className="about-pillar__num">{pillar.number}</span>
              <h3 className="about-pillar__title">{pillar.title}</h3>
              <p className="about-pillar__copy">{pillar.copy}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

// ─── GRAINS ───────────────────────────────────────────────────────────────────

function AboutGrains() {
  return (
    <section className="about-grains" aria-labelledby="about-grains-heading">
      <div className="about-grains__inner">
        <header className="about-grains__head about-reveal">
          <p className="about-kicker">{aboutGrains.eyebrow}</p>
          <h2 id="about-grains-heading">{aboutGrains.title}</h2>
          <p className="about-grains__sub">{aboutGrains.copy}</p>
        </header>

        <ul className="about-grains__grid">
          {aboutGrains.items.map((grain, i) => (
            <li key={grain.id} className="about-grain-wrap" style={{ '--i': i }}>
              <Link to={grain.href} className="about-grain">
                <span className="about-grain__media">
                  <img src={grain.image} alt={grain.name} loading="lazy" decoding="async" />
                </span>
                <p className="about-grain__type">{grain.type}</p>
                <h3 className="about-grain__name">{grain.name}</h3>
                <p className="about-grain__note">{grain.note}</p>
                <span className="about-grain__link" aria-hidden="true">
                  Explore <span>→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// ─── CLOSING CTA ─────────────────────────────────────────────────────────────

function AboutClose() {
  return (
    <section className="about-close" aria-labelledby="about-close-heading">
      <div className="about-close__media" aria-hidden="true">
        <span className="about-close__shift" data-speed="0.1">
          <img src={aboutClose.image} alt="" />
        </span>
        <span className="about-close__veil" />
      </div>
      <div className="about-close__copy about-reveal">
        <p className="about-kicker about-kicker--light">{aboutClose.eyebrow}</p>
        <h2 id="about-close-heading">
          Bring native
          <br />
          goodness home.
        </h2>
        <p>{aboutClose.copy}</p>
        <Button to={aboutClose.ctaTo} variant="primary" size="lg" arrow>
          {aboutClose.cta}
        </Button>
      </div>
    </section>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

function About() {
  useEffect(() => {
    document.title = 'About — SV Hub'
    window.scrollTo(0, 0)
    return () => { document.title = 'SV Hub — Pure Native Goodness' }
  }, [])

  return (
    <AboutScroll>
      {/* Clean hero — no progress rail, no story numbers */}
      <AboutHero />

      {/* Story chapters — no rail, no grid wrapper */}
      <AboutIntro />
      {aboutChapters.map((chapter) => (
        <AboutChapter key={chapter.id} chapter={chapter} />
      ))}
      <AboutWhy />

      {/* Independent sections — no rail */}
      <AboutGrains />
      <AboutClose />
    </AboutScroll>
  )
}

export default About
