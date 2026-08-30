import { Link } from 'react-router-dom'
import Button from '../../components/ui/Button.jsx'
import SectionHeader from '../../components/ui/SectionHeader.jsx'
import Reveal from '../../components/ui/Reveal.jsx'
import { categories } from '../../data/categories.js'
import { housesIntro } from '../../data/home.js'
import { storefronts } from '../../data/storefronts.js'
import './Storefronts.css'

function houseCategories(house) {
  return house.categorySlugs
    .map((slug) => categories.find((category) => category.slug === slug))
    .filter(Boolean)
}

function Storefronts() {
  return (
    <section className="home-section home-section--off houses-section" aria-label="Shop by house">
      <div className="home-container">
        <Reveal className="home-section__header">
          <SectionHeader
            align="center"
            eyebrow={housesIntro.eyebrow}
            title={housesIntro.title}
            copy={housesIntro.copy}
          />
        </Reveal>

        <Reveal className="home-stagger houses">
          {storefronts.map((house) => (
            <article
              key={house.id}
              className={`house house--${house.accentToken}`}
              style={{ '--house-accent': house.accent }}
            >
              <img src={house.image} alt={house.imageAlt} />
              <div className="house__content">
                <p className="house__kicker">{house.kicker}</p>
                <h3>{house.name}</h3>
                <p className="house__copy">{house.copy}</p>
                <ul className="house__cats">
                  {houseCategories(house).map((category) => (
                    <li key={category.id}>
                      <Link to={category.to}>{category.name}</Link>
                    </li>
                  ))}
                  {house.extraLabels.map((label) => (
                    <li key={label}>
                      <span>{label}</span>
                    </li>
                  ))}
                </ul>
                <Button to={house.to} variant="inverse" arrow>
                  {house.cta}
                </Button>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

export default Storefronts
