import { Link } from 'react-router-dom'
import Reveal from '../../components/ui/Reveal.jsx'
import { editorial } from '../../data/home.js'
import './EditorialStory.css'

function EditorialArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
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

function splitHeadline(text) {
  const grain = text.match(/^(From the grain)\s+(to the table\.?)$/i)
  if (grain) {
    return (
      <>
        <span>{grain[1]}</span>
        <span>{grain[2]}</span>
      </>
    )
  }
  return text
}

function EditorialStory() {
  const [dominant, ...rest] = editorial.grid

  return (
    <section className="home-section home-section--white grain-story" aria-labelledby="grain-heading">
      <div className="home-container">
        <Reveal className="grain-story__header">
          <div>
            <p className="grain-story__eyebrow">
              {editorial.label}
              <span aria-hidden="true"> · </span>
              Est. {editorial.year}
            </p>
            <h2 id="grain-heading" className="grain-story__title">
              {splitHeadline(editorial.headline)}
            </h2>
          </div>
          <div className="grain-story__lede">
            <p>{editorial.storyCopy}</p>
            <Link to={editorial.storyTo} className="grain-story__link">
              {editorial.storyCta}
              <EditorialArrow />
            </Link>
          </div>
        </Reveal>

        <Reveal className="grain-story__collage">
          <figure className="grain-story__frame grain-story__frame--lead">
            <img src={dominant.src} alt={dominant.alt} loading="lazy" decoding="async" />
            <figcaption>
              <span>01 / Native rice</span>
              Native grains
            </figcaption>
          </figure>
          {rest.slice(0, 2).map((image, index) => (
            <figure key={image.alt} className={`grain-story__frame grain-story__frame--${index + 2}`}>
              <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
              <figcaption>
                <span>0{index + 2} / Traditional food</span>
                {index === 0 ? 'Home cooking' : 'Ingredients'}
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

export default EditorialStory
