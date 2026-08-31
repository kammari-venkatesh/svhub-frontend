import { useEffect } from 'react'
import ProductCard from '../../components/ui/ProductCard.jsx'
import Reveal from '../../components/ui/Reveal.jsx'
import {
  selfCare,
  selfCareClose,
  selfCareCollectionIntro,
  selfCareIntro,
  selfCareProducts,
  selfCareStills,
  selfCareStory,
} from '../../data/selfCare.js'
import HomeScroll from '../Home/HomeScroll.jsx'
import '../Home/Home.css'
import './SelfCare.css'

function Arrow({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 8h10M9.5 4.5 13 8l-3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function BatchNote() {
  return (
    <span className="sc-note">
      <span className="sc-note__label">made in small batches</span>
      <svg className="sc-note__arrow" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path
          d="M4 14c3.2-1.8 6.4-5.4 9.8-10.2M13.2 3.2h4.2v4.1"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg className="sc-note__mark" viewBox="0 0 168 14" fill="none" aria-hidden="true">
        <path
          d="M2.4 9.6c18.8-4.8 36.2 2.8 55.1.4 16.6-2.1 31.8-6.6 48.4-4.2 14.2 2 27.6 5.8 42.6 2.4 7.4-1.7 14.2-4.2 17.8-1.6"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    </span>
  )
}

function CareHero() {
  return (
    <section className="sc-hero" aria-labelledby="self-care-hero-heading">
      <div className="sc-hero__media" aria-hidden="true">
        <img src={selfCareIntro.image} alt="" />
        <span className="sc-hero__veil" />
        <span className="sc-hero__grain" />
      </div>

      <span className="sc-hero__watermark" aria-hidden="true">
        Care
      </span>

      <div className="home-container sc-hero__layout">
        <div className="sc-hero__copy">
          <p className="sc-hero__eyebrow">
            <span className="sc-hero__dot" />
            {selfCareIntro.eyebrow}
            <span aria-hidden="true"> · </span>
            {selfCareIntro.kicker}
          </p>
          <h1 id="self-care-hero-heading">{selfCareIntro.title}</h1>
          <p className="sc-hero__text">{selfCareIntro.copy}</p>
          <a href={selfCareIntro.ctaHref} className="sc-hero__cta">
            <span>{selfCareIntro.cta}</span>
            <Arrow size={15} />
          </a>
        </div>

        <ul className="sc-hero__stills">
          {selfCareStills.map((still) => (
            <li key={still.label}>
              <figure>
                <img src={still.src} alt={still.alt} />
                <figcaption>{still.label}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function CareCollection() {
  return (
    <section
      id="handmade-soaps"
      className="home-section home-section--off sc-collection"
      aria-labelledby="self-care-collection-heading"
    >
      <div className="home-container">
        <Reveal className="sc-header">
          <div>
            <p className="sc-eyebrow">{selfCareCollectionIntro.eyebrow}</p>
            <h2 id="self-care-collection-heading">{selfCareCollectionIntro.title}</h2>
            <BatchNote />
          </div>
          <div className="sc-header__lede">
            <p className="sc-header__count">06 Handmade Soaps</p>
            <p className="sc-header__copy">{selfCareCollectionIntro.copy}</p>
          </div>
        </Reveal>

        {selfCareProducts.length ? (
          <Reveal as="ul" className="home-stagger sc-product-grid">
            {selfCareProducts.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </Reveal>
        ) : (
          <div className="sc-empty">
            <p className="sc-eyebrow">Coming soon</p>
            <h3>These handmade soaps are being prepared.</h3>
            <p>Return shortly, or browse the rest of the shop while this collection is set out.</p>
          </div>
        )}
      </div>
    </section>
  )
}

function CareStory() {
  return (
    <section className="home-section home-section--white sc-story" aria-labelledby="self-care-story-heading">
      <div className="home-container sc-story__layout">
        <Reveal className="sc-story__copy">
          <p className="sc-eyebrow">{selfCareStory.eyebrow}</p>
          <h2 id="self-care-story-heading">{selfCareStory.title}</h2>
          <p className="sc-story__text">{selfCareStory.copy}</p>

          <ol className="sc-story__principles">
            {selfCareStory.principles.map((item) => (
              <li key={item.number}>
                <span>{item.number}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal className="sc-story__figures" delay={80}>
          {selfCareStory.figures.map((figure, index) => (
            <figure key={figure.alt} className={`sc-story__figure sc-story__figure--${index + 1}`}>
              <img src={figure.src} alt={figure.alt} loading="lazy" decoding="async" />
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function CareClose() {
  return (
    <section className="sc-close" aria-labelledby="self-care-close-heading">
      <div className="sc-close__media" aria-hidden="true">
        <img src={selfCareClose.image} alt="" />
        <span className="sc-close__veil" />
        <span className="sc-close__grain" />
      </div>

      <span className="sc-close__watermark" aria-hidden="true">
        {selfCare.name}
      </span>

      <div className="home-container sc-close__layout">
        <Reveal className="sc-close__main">
          <p className="sc-close__eyebrow">{selfCareClose.eyebrow}</p>
          <h2 id="self-care-close-heading">{selfCareClose.headline}</h2>
          <p className="sc-close__copy">{selfCareClose.copy}</p>
          <a href={selfCareClose.ctaHref} className="sc-close__cta">
            <span>{selfCareClose.cta}</span>
            <Arrow size={15} />
          </a>
        </Reveal>
      </div>
    </section>
  )
}

function SelfCare() {
  useEffect(() => {
    if (window.location.hash) {
      const node = document.querySelector(window.location.hash)
      node?.scrollIntoView()
      return
    }
    window.scrollTo(0, 0)
  }, [])

  return (
    <HomeScroll>
      <div className="sc">
        <CareHero />
        <CareCollection />
        <CareStory />
        <CareClose />
      </div>
    </HomeScroll>
  )
}

export default SelfCare
