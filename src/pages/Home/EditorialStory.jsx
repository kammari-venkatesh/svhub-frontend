import Button from '../../components/ui/Button.jsx'
import Reveal from '../../components/ui/Reveal.jsx'
import { editorial } from '../../data/home.js'
import './EditorialStory.css'

function EditorialStory() {
  return (
    <section className="home-section home-section--off editorial-section" aria-label="Our story">
      <div className="home-container editorial">
        <Reveal className="editorial__left">
          <header className="editorial__meta">
            <p className="editorial__label">{editorial.label}</p>
            <p className="editorial__origin">
              Est. {editorial.year}
              <span aria-hidden="true"> · </span>
              {editorial.origin}
            </p>
          </header>

          <ol className="editorial__themes">
            {editorial.themes.map((theme) => (
              <li key={theme.number}>
                <span className="editorial__theme-num">{theme.number}</span>
                <span>{theme.label}</span>
              </li>
            ))}
          </ol>

          <div className="editorial__story">
            <h3 className="editorial__lead">{editorial.storyTitle}</h3>
            <p className="editorial__copy">{editorial.storyCopy}</p>
            <Button to={editorial.storyTo} arrow className="editorial__cta">
              {editorial.storyCta}
            </Button>
          </div>
        </Reveal>

        <Reveal className="editorial__right" delay={120}>
          <h2 className="editorial__headline">{editorial.headline}</h2>
          <div className="editorial__grid">
            {editorial.grid.map((image) => {
              const frameClass = [
                'editorial__frame',
                image.featured ? 'editorial__frame--featured' : '',
                image.wide ? 'editorial__frame--wide' : '',
              ]
                .filter(Boolean)
                .join(' ')

              return (
                <figure key={image.alt} className={frameClass}>
                  <img src={image.src} alt={image.alt} loading="lazy" />
                </figure>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default EditorialStory
