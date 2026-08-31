import { useState } from 'react'
import Reveal from '../../components/ui/Reveal.jsx'
import { images } from '../../data/images.js'
import { testimonials, testimonialsIntro } from '../../data/testimonials.js'
import './Testimonials.css'

function EverydayNote() {
  return (
    <span className="voices__note">
      <span className="voices__note-label">shared from everyday life</span>
      <svg className="voices__note-arrow" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path
          d="M4 14c3.2-1.8 6.4-5.4 9.8-10.2M13.2 3.2h4.2v4.1"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg className="voices__note-mark" viewBox="0 0 188 14" fill="none" aria-hidden="true">
        <path
          d="M2.2 9.8c20.8-5 41.4 2.8 62.6.2 18.8-2.3 36.4-6.8 55.4-4.2 16.4 2.2 32 5.8 49.2 2.4 8.6-1.7 16.4-4.6 20.6-1.6"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    </span>
  )
}

function Testimonials() {
  const [active, setActive] = useState(0)
  const featured = testimonials[active]
  const supporting = testimonials
    .map((item, index) => ({ item, index }))
    .filter(({ index }) => index !== active)

  return (
    <section className="home-section voices" aria-labelledby="voices-heading">
      <div className="home-container">
        <Reveal className="voices__header">
          <div className="voices__heading">
            <p className="voices__eyebrow">{testimonialsIntro.eyebrow}</p>
            <h2 id="voices-heading" className="voices__title">
              {testimonialsIntro.title}
            </h2>
            <EverydayNote />
          </div>
          <div className="voices__lede">
            <p className="voices__kicker">Real homes · Real routines</p>
            <p className="voices__copy">{testimonialsIntro.copy}</p>
          </div>
        </Reveal>

        <div className="voices__stage">
          <Reveal className="voices__featured-wrap">
            <blockquote className="voices__featured">
              <span className="voices__mark" aria-hidden="true">
                “
              </span>
              <p>{featured.quote}</p>
              <footer>
                <cite>{featured.name}</cite>
                <span>{featured.role}</span>
              </footer>
            </blockquote>
          </Reveal>

          <Reveal className="voices__aside" delay={80}>
            <div className="voices__visual" data-speed="0.1" aria-hidden="true">
              <p className="voices__watermark">Home</p>
              <img src={images.cooking} alt="" loading="lazy" decoding="async" />
            </div>
            <nav className="voices__pager" aria-label="Customer stories">
              {testimonials.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className={`voices__dot${active === index ? ' is-active' : ''}`}
                  aria-pressed={active === index}
                  aria-label={`Show story ${index + 1}, ${item.name}`}
                  onClick={() => setActive(index)}
                >
                  {String(index + 1).padStart(2, '0')}
                </button>
              ))}
            </nav>
          </Reveal>
        </div>

        <Reveal as="ul" className="home-stagger voices__supporting">
          {supporting.map(({ item, index }) => (
            <li key={item.id}>
              <blockquote className="voices__snippet">
                <button
                  type="button"
                  className="voices__snippet-btn"
                  onClick={() => setActive(index)}
                  aria-label={`Show ${item.name}'s story`}
                >
                  <span className="voices__snippet-index">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p>{item.quote}</p>
                  <footer>
                    <cite>{item.name}</cite>
                    <span>{item.role}</span>
                  </footer>
                  <span className="voices__hint" aria-hidden="true">
                    Read story
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M3 8h10M9.5 4.5 13 8l-3.5 3.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
              </blockquote>
            </li>
          ))}
        </Reveal>

        <Reveal delay={80}>
          <p className="voices__disclaimer">{testimonialsIntro.disclaimer}</p>
        </Reveal>
      </div>
    </section>
  )
}

export default Testimonials
