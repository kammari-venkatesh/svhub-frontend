import { useState } from 'react'
import Reveal from '../../components/ui/Reveal.jsx'
import { grownIntro } from '../../data/home.js'
import { images } from '../../data/images.js'
import './GrownCare.css'

const figures = [
  { src: images.farmer, alt: 'A farmer gathering harvested paddy in a rural field' },
  { src: images.rice, alt: 'Native rice grains in a traditional brass vessel' },
  { src: images.cooking, alt: 'A traditional South Indian meal served at home' },
]

function GrownCare() {
  const [active, setActive] = useState(0)

  return (
    <section className="home-section home-section--white grown" aria-labelledby="grown-heading">
      <div className="home-container grown__layout">
        <Reveal className="grown__copy">
          <p className="grown__eyebrow">{grownIntro.eyebrow}</p>
          <h2 id="grown-heading">{grownIntro.title}</h2>
          <p className="grown__text">{grownIntro.copy}</p>

          <ol className="grown__principles">
            {grownIntro.principles.map((item, index) => (
              <li key={item.number}>
                <button
                  type="button"
                  className={`grown__item${active === index ? ' is-active' : ''}`}
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

        <Reveal className="grown__figures" delay={80}>
          {figures.map((figure, index) => (
            <figure
              key={figure.alt}
              className={`grown__figure grown__figure--${index + 1}${active === index ? ' is-hot' : ''}`}
            >
              <img src={figure.src} alt={figure.alt} loading="lazy" decoding="async" />
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

export default GrownCare
