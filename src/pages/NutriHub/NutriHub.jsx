import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../../components/ui/Reveal.jsx'
import {
  nutriHub,
  nutriHubCategories,
  nutriHubCategoryIntro,
  nutriHubClose,
  nutriHubFeatured,
  nutriHubFeaturedIntro,
  nutriHubGrain,
  nutriHubIntro,
  nutriHubManifesto,
  nutriHubStories,
  nutriHubStory,
} from '../../data/nutriHub.js'
import HomeScroll from '../Home/HomeScroll.jsx'
import '../Home/Home.css'
import NutriProduct from './NutriProduct.jsx'
import './NutriHub.css'

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

function splitLine(text) {
  const comma = text.indexOf(',')
  if (comma !== -1) {
    return (
      <>
        {`${text.slice(0, comma)}.`}
        <br />
        {text.slice(comma + 1).trim()}
      </>
    )
  }

  const period = text.indexOf('. ')
  if (period === -1) return text

  return (
    <>
      {text.slice(0, period + 1)}
      <br />
      {text.slice(period + 2)}
    </>
  )
}

function splitClose(text) {
  const match = text.match(/^(Bring Native)\s+(Goodness Home\.?)$/i)
  if (!match) return text
  return (
    <>
      <span>{match[1]}</span>
      <span>{match[2].replace(/\.$/, '')}.</span>
    </>
  )
}

function KitchenNote({ label = 'from the everyday kitchen' }) {
  return (
    <span className="nh-note">
      <span className="nh-note__label">{label}</span>
      <svg className="nh-note__arrow" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path
          d="M4 14c3.2-1.8 6.4-5.4 9.8-10.2M13.2 3.2h4.2v4.1"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg className="nh-note__mark" viewBox="0 0 220 14" fill="none" aria-hidden="true">
        <path
          d="M2.2 9.8c22.4-5.2 44.6 3.2 67.4.2 20.4-2.6 39.2-7.2 59.8-4.4 17.6 2.4 34.2 6.4 52.4 2.6 9.2-1.9 17.6-4.8 22.2-1.8"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    </span>
  )
}

function NutriHero() {
  return (
    <section className="nh-hero" aria-labelledby="nutri-hero-heading">
      <div className="nh-hero__media" aria-hidden="true">
        <img src={nutriHubIntro.image} alt="" fetchPriority="high" />
        <span className="nh-hero__veil" />
        <span className="nh-hero__grain" />
      </div>

      <span className="nh-hero__watermark" aria-hidden="true">
        Grain
      </span>

      <div className="home-container nh-hero__layout">
        <p className="nh-path">
          <Link to="/">SV Hub</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{nutriHub.name}</span>
        </p>

        <div className="nh-hero__copy">
          <p className="nh-hero__eyebrow">
            <span className="nh-hero__dot" />
            {nutriHubIntro.kicker}
            <span aria-hidden="true"> · </span>
            {nutriHubIntro.eyebrow}
          </p>
          <h1 id="nutri-hero-heading">{splitLine(nutriHubIntro.title)}</h1>
          <p className="nh-hero__text">{nutriHubIntro.copy}</p>
          <Link to={nutriHubIntro.ctaTo} className="nh-hero__cta">
            <span>{nutriHubIntro.cta}</span>
            <Arrow size={15} />
          </Link>
        </div>

        <nav className="nh-rail" aria-label="Nutri-Hub categories">
          <p className="nh-rail__label">Explore</p>
          <ul className="nh-rail__list">
            {nutriHubCategories.map((category, index) => (
              <li key={category.id}>
                <Link to={category.to} className="nh-rail__item">
                  <span className="nh-rail__media">
                    <img src={category.image} alt="" loading="eager" decoding="async" />
                  </span>
                  <span className="nh-rail__meta">
                    <span className="nh-rail__index">{String(index + 1).padStart(2, '0')}</span>
                    <span className="nh-rail__name">{category.name}</span>
                    <span className="nh-rail__cta">
                      Explore
                      <Arrow size={12} />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  )
}

function NutriGrain() {
  return (
    <section className="home-section nh-grain" aria-labelledby="nutri-grain-heading">
      <div className="home-container">
        <Reveal className="nh-header">
          <div>
            <p className="nh-eyebrow">{nutriHubGrain.eyebrow}</p>
            <h2 id="nutri-grain-heading">{splitLine(nutriHubGrain.title)}</h2>
            <KitchenNote label="from field to table" />
          </div>
          <p className="nh-header__copy">{nutriHubGrain.copy}</p>
        </Reveal>

        <Reveal as="div" className="nh-spread home-stagger">
          {nutriHubGrain.frames.map((frame) => (
            <figure key={frame.role} className={`nh-spread__frame nh-spread__frame--${frame.role}`}>
              <img src={frame.src} alt={frame.alt} loading="lazy" decoding="async" />
              {frame.label ? <figcaption>{frame.label}</figcaption> : null}
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function NutriCategories() {
  return (
    <section className="home-section home-section--white nh-cats" aria-labelledby="nutri-cats-heading">
      <div className="home-container">
        <Reveal className="nh-header">
          <div>
            <p className="nh-eyebrow">{nutriHubCategoryIntro.eyebrow}</p>
            <h2 id="nutri-cats-heading">{nutriHub.name}</h2>
            <KitchenNote />
          </div>
          <div className="nh-header__lede">
            <p className="nh-header__count">
              {String(nutriHubCategories.length).padStart(2, '0')} food categories
            </p>
            <p className="nh-header__copy">{nutriHubCategoryIntro.copy}</p>
          </div>
        </Reveal>

        <Reveal as="ul" className="home-stagger nh-cat-grid">
          {nutriHubCategories.map((category, index) => {
            const number = String(index + 1).padStart(2, '0')
            const role = index === 0 ? 'lead' : index < 3 ? 'pair' : 'row'

            return (
              <li key={category.id} className={`nh-cat nh-cat--${role}`}>
                <Link to={category.to} className="nh-cat__tile" aria-label={`Explore ${category.name}`}>
                  <span className="nh-cat__media">
                    <img src={category.image} alt="" loading="lazy" decoding="async" />
                  </span>
                  <span className="nh-cat__overlay">
                    <span className="nh-cat__index">{number}</span>
                    <span className="nh-cat__name">{category.displayName}</span>
                    <span className="nh-cat__cta" aria-hidden="true">
                      Explore
                      <Arrow size={13} />
                    </span>
                    <span className="nh-cat__rule" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}

function NutriFeatured() {
  return (
    <section className="home-section nh-featured" aria-labelledby="nutri-featured-heading">
      <div className="home-container">
        <Reveal className="nh-header">
          <div>
            <p className="nh-eyebrow">{nutriHubFeaturedIntro.eyebrow}</p>
            <h2 id="nutri-featured-heading">{nutriHubFeaturedIntro.title}</h2>
          </div>
          <p className="nh-header__copy">{nutriHubFeaturedIntro.copy}</p>
        </Reveal>

        <Reveal as="ul" className="home-stagger nh-product-grid">
          {nutriHubFeatured.map((product, index) => (
            <li key={product.id} className={index === 0 ? 'nh-product-grid__lead' : undefined}>
              <NutriProduct product={product} featured={index === 0} eager={index < 4} />
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function NutriGrown() {
  const [active, setActive] = useState(0)

  return (
    <section className="home-section home-section--white nh-grown" aria-labelledby="nutri-grown-heading">
      <div className="home-container nh-grown__layout">
        <Reveal className="nh-grown__copy">
          <p className="nh-eyebrow">{nutriHubStory.eyebrow}</p>
          <h2 id="nutri-grown-heading">{splitLine(nutriHubStory.title)}</h2>
          <p className="nh-grown__text">{nutriHubStory.copy}</p>

          <ol className="nh-grown__principles">
            {nutriHubStory.principles.map((item, index) => (
              <li key={item.number}>
                <button
                  type="button"
                  className={`nh-grown__item${active === index ? ' is-active' : ''}`}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  aria-current={active === index}
                >
                  <span>{item.number}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                    <i aria-hidden="true" />
                  </div>
                </button>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal className="nh-grown__figures" delay={80}>
          {nutriHubStory.figures.map((figure, index) => (
            <figure
              key={figure.alt}
              className={`nh-grown__figure nh-grown__figure--${index + 1}${active === index ? ' is-hot' : ''}`}
            >
              <img src={figure.src} alt={figure.alt} loading="lazy" decoding="async" />
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function NutriManifesto() {
  return (
    <section className="home-section nh-manifesto" aria-labelledby="nutri-manifesto-heading">
      <span className="nh-manifesto__mark" aria-hidden="true">
        {nutriHubManifesto.watermark}
      </span>
      <span className="nh-manifesto__grain" aria-hidden="true" />
      <div className="home-container">
        <Reveal className="nh-header nh-header--light">
          <div>
            <p className="nh-eyebrow">{nutriHubManifesto.eyebrow}</p>
            <h2 id="nutri-manifesto-heading">{nutriHubManifesto.title}</h2>
          </div>
          <p className="nh-header__copy">{nutriHubManifesto.copy}</p>
        </Reveal>

        <Reveal as="ol" className="home-stagger nh-manifesto__list">
          {nutriHubManifesto.items.map((item) => (
            <li key={item.number}>
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function NutriStories() {
  const [active, setActive] = useState(0)
  const featured = nutriHubStories.items[active]

  return (
    <section className="home-section nh-stories" aria-labelledby="nutri-stories-heading">
      <div className="home-container">
        <Reveal className="nh-header">
          <div>
            <p className="nh-eyebrow">{nutriHubStories.eyebrow}</p>
            <h2 id="nutri-stories-heading">{nutriHubStories.title}</h2>
            <KitchenNote label="shared from everyday life" />
          </div>
          <p className="nh-header__copy">{nutriHubStories.copy}</p>
        </Reveal>

        {featured ? (
          <div className="nh-stories__stage">
            <Reveal>
              <blockquote className="nh-stories__quote">
                <p>{featured.quote}</p>
                <footer>
                  <cite>{featured.name}</cite>
                  <span>{featured.role}</span>
                </footer>
              </blockquote>
            </Reveal>

            <Reveal className="nh-stories__aside" delay={80}>
              <ul>
                {nutriHubStories.items.map((item, index) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      className={index === active ? 'is-active' : undefined}
                      onClick={() => setActive(index)}
                      aria-pressed={index === active}
                    >
                      <span>{item.name}</span>
                      <span>{item.role}</span>
                    </button>
                  </li>
                ))}
              </ul>
              <p className="nh-stories__disclaimer">{nutriHubStories.disclaimer}</p>
            </Reveal>
          </div>
        ) : null}
      </div>
    </section>
  )
}

function NutriClose() {
  return (
    <section className="nh-close" aria-label="Explore Nutri-Hub products">
      <div className="nh-close__media" aria-hidden="true">
        <img src={nutriHubClose.image} alt="" />
        <span className="nh-close__veil" />
        <span className="nh-close__grain" />
      </div>
      <span className="nh-close__watermark" aria-hidden="true">
        Native
      </span>
      <div className="home-container nh-close__layout">
        <Reveal className="nh-close__main">
          <p className="nh-close__eyebrow">{nutriHubClose.eyebrow}</p>
          <h2>{splitClose(nutriHubClose.headline)}</h2>
          <p className="nh-close__copy">{nutriHubClose.copy}</p>
          <div className="nh-close__actions">
            <Link to={nutriHubClose.ctaTo} className="nh-close__cta">
              <span>{nutriHubClose.cta}</span>
              <Arrow size={15} />
            </Link>
            <Link to={nutriHubClose.secondary.to} className="nh-close__ghost">
              <span>{nutriHubClose.secondary.label}</span>
              <Arrow size={14} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function NutriHub() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <HomeScroll>
      <div className="nh">
        <NutriHero />
        <NutriGrain />
        <NutriCategories />
        <NutriFeatured />
        <NutriGrown />
        <NutriManifesto />
        <NutriStories />
        <NutriClose />
      </div>
    </HomeScroll>
  )
}

export default NutriHub
