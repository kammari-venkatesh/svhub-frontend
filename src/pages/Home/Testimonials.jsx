import SectionHeader from '../../components/ui/SectionHeader.jsx'
import Reveal from '../../components/ui/Reveal.jsx'
import { testimonials, testimonialsIntro } from '../../data/testimonials.js'
import './Testimonials.css'

function Testimonials() {
  return (
    <section className="home-section home-section--white voices" aria-label="Customer stories">
      <div className="home-container">
        <Reveal className="home-section__header">
          <SectionHeader
            align="center"
            eyebrow={testimonialsIntro.eyebrow}
            title={testimonialsIntro.title}
            copy={testimonialsIntro.copy}
          />
        </Reveal>
        <Reveal className="home-stagger voices__grid">
          {testimonials.map((item) => (
            <blockquote key={item.id}>
              <p>“{item.quote}”</p>
              <footer>
                <cite>{item.name}</cite>
                <span>{item.role}</span>
              </footer>
            </blockquote>
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
