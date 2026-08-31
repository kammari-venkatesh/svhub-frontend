import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/ui/Button.jsx'
import {
  aboutChapters,
  aboutClose,
  aboutGrains,
  aboutHero,
  aboutIntro,
  aboutStorySteps,
  aboutWhy,
} from '../../data/about.js'
import AboutScroll from './AboutScroll.jsx'
import StoryProgress from './StoryProgress.jsx'
import './About.css'

function splitHeroTitle(title) {
  const [first, ...rest] = title.split(', ')
  if (!rest.length) return title
  return (
    <>
      {first},
      <br />
      {rest.join(', ')}
    </>
  )
}

function scrollToStory() {
  const node = document.getElementById('story-roots')
  if (!node) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  node.scrollIntoView({ behavior: reduce ? 'instant' : 'smooth', block: 'start' })
}

function AboutHero() {
  return (
    <section className="about-hero" aria-labelledby="about-hero-heading">
      <div className="about-hero__media" aria-hidden="true">
        <span className="about-hero__shift" data-speed="0.06">
          <img src={aboutHero.image} alt="" />
        </span>
        <span className="about-hero__veil" />
      </div>
      <div className="about-hero__copy">
        <p className="about-hero__eyebrow">{aboutHero.eyebrow}</p>
        <h1 id="about-hero-heading">{splitHeroTitle(aboutHero.title)}</h1>
        <p className="about-hero__lede">{aboutHero.copy}</p>
      </div>
      <button type="button" className="about-hero__cue" onClick={scrollToStory}>
        <span>Scroll to explore</span>
        <span className="about-hero__arrow" aria-hidden="true">
          ↓
        </span>
        <span className="about-hero__count">01 / 05</span>
      </button>
    </section>
  )
}

function StoryFigure({ src, alt }) {
  return (
    <figure className="about-figure">
      <span className="about-figure__media" data-speed="0.08">
        <img src={src} alt={alt} loading="lazy" decoding="async" />
      </span>
    </figure>
  )
}

function AboutIntro() {
  return (
    <section
      id="story-roots"
      data-story-index="0"
      data-story="roots"
      className="about-section about-section--roots"
      aria-labelledby="about-intro-heading"
    >
      <div className="about-section__grid">
        <div className="about-section__copy">
          <h2 id="about-intro-heading" className="about-rise about-section__title">
            <span>A house of native</span>
            <span>goodness, from</span>
            <span>Coimbatore.</span>
          </h2>
          <div className="about-rise">
            {aboutIntro.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p className="about-intro__origin">{aboutIntro.origin}</p>
          </div>
        </div>
        <StoryFigure src={aboutIntro.image} alt={aboutIntro.imageAlt} />
      </div>
    </section>
  )
}

function AboutChapter({ chapter, index }) {
  const step = aboutStorySteps.find((item) => item.id === chapter.id)
  const anchor = step?.anchor ?? `story-${chapter.id}`
  const story = anchor.replace(/^story-/, '')

  return (
    <section
      id={anchor}
      data-story-index={index}
      data-story={story}
      className={`about-section about-section--${chapter.id}${chapter.flip ? ' is-flip' : ''}`}
      aria-labelledby={`about-${chapter.id}-heading`}
    >
      <div className="about-section__grid">
        <StoryFigure src={chapter.image} alt={chapter.imageAlt} />
        <div className="about-section__copy">
          <h2 id={`about-${chapter.id}-heading`} className="about-rise">
            {chapter.title}
          </h2>
          <p className="about-rise">{chapter.copy}</p>
        </div>
      </div>
    </section>
  )
}

function AboutWhy() {
  return (
    <section
      id="story-future"
      data-story-index="4"
      data-story="future"
      className="about-section about-section--future"
      aria-labelledby="about-why-heading"
    >
      <header className="about-why__head">
        <h2 id="about-why-heading" className="about-rise">
          What we’re
          <br />
          working toward.
        </h2>
        <p className="about-why__lede about-rise">{aboutWhy.copy}</p>
      </header>
      <ol className="about-why__list">
        {aboutWhy.pillars.map((pillar) => (
          <li key={pillar.number} className="about-pillar">
            <p className="about-why__num">{pillar.number}</p>
            <h3>{pillar.title}</h3>
            <p>{pillar.copy}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

function AboutGrains() {
  return (
    <section className="about-grains" aria-labelledby="about-grains-heading">
      <header className="about-grains__head">
        <p className="about-kicker">{aboutGrains.eyebrow}</p>
        <h2 id="about-grains-heading">{aboutGrains.title}</h2>
        <p>{aboutGrains.copy}</p>
      </header>
      <ul className="about-grains__grid">
        {aboutGrains.items.map((grain) => (
          <li key={grain.id}>
            <Link to={grain.href} className="about-grain">
              <span className="about-grain__media">
                <img src={grain.image} alt="" loading="lazy" decoding="async" />
              </span>
              <p className="about-grain__type">{grain.type}</p>
              <h3>{grain.name}</h3>
              <p>{grain.note}</p>
              <span className="about-grain__more">
                Explore
                <span aria-hidden="true"> →</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

function AboutClose() {
  return (
    <section className="about-close" aria-labelledby="about-close-heading">
      <div className="about-close__media" aria-hidden="true">
        <span className="about-close__shift" data-speed="0.1">
          <img src={aboutClose.image} alt="" />
        </span>
        <span className="about-close__veil" />
      </div>
      <div className="about-close__copy">
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

function About() {
  useEffect(() => {
    document.title = 'About — SV Hub'
    window.scrollTo(0, 0)
    return () => {
      document.title = 'SV Hub — Pure Native Goodness'
    }
  }, [])

  return (
    <AboutScroll>
      <AboutHero />
      <section className="about-story">
        <StoryProgress />
        <div className="story-content">
          <AboutIntro />
          {aboutChapters.map((chapter, idx) => (
            <AboutChapter key={chapter.id} chapter={chapter} index={idx + 1} />
          ))}
          <AboutWhy />
        </div>
      </section>
      <AboutGrains />
      <AboutClose />
    </AboutScroll>
  )
}

export default About
