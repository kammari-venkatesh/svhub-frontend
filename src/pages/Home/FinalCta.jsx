import Button from '../../components/ui/Button.jsx'
import Reveal from '../../components/ui/Reveal.jsx'
import { finalCta } from '../../data/home.js'
import './FinalCta.css'

function FinalCta() {
  return (
    <section className="close" aria-label="Shop SV Hub">
      <Reveal className="home-container close__inner">
        <p className="close__eyebrow">{finalCta.eyebrow}</p>
        <h2>{finalCta.headline}</h2>
        <p className="close__copy">{finalCta.copy}</p>
        <div className="close__actions">
          <Button to={finalCta.primary.to} variant="inverse" size="lg" arrow>
            {finalCta.primary.label}
          </Button>
          <Button to={finalCta.secondary.to} variant="ghost" size="lg" arrow>
            {finalCta.secondary.label}
          </Button>
        </div>
      </Reveal>
    </section>
  )
}

export default FinalCta
