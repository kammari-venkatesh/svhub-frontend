import { Link } from 'react-router-dom'
import Reveal from '../../components/ui/Reveal.jsx'
import { categories } from '../../data/categories.js'
import { categoryIntro } from '../../data/home.js'
import './CategorySection.css'

const roles = ['feature', 'secondary', 'secondary', 'support', 'support', 'support', 'support']

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

function GoodnessNote() {
  return (
    <span className="categories__note">
      <span className="categories__note-label">choose your everyday goodness</span>
      <svg className="categories__note-arrow" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path
          d="M4 14c3.2-1.8 6.4-5.4 9.8-10.2M13.2 3.2h4.2v4.1"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg className="categories__note-mark" viewBox="0 0 220 14" fill="none" aria-hidden="true">
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

function CategorySection() {
  return (
    <section
      id="shop-by-category"
      className="home-section home-section--off categories-section"
      aria-labelledby="categories-heading"
    >
      <div className="home-container">
        <Reveal className="categories__header">
          <div className="categories__heading">
            <p className="categories__eyebrow">{categoryIntro.eyebrow}</p>
            <h2 id="categories-heading" className="categories__title">
              {categoryIntro.title}
            </h2>
            <GoodnessNote />
          </div>
          <div className="categories__lede">
            <p className="categories__count">07 Everyday Categories</p>
            <p className="categories__copy">{categoryIntro.copy}</p>
          </div>
        </Reveal>

        <Reveal as="ul" className="home-stagger category-grid">
          {categories.map((category, index) => {
            const number = String(index + 1).padStart(2, '0')
            const role = roles[index] ?? 'support'

            return (
              <li key={category.id} className={`category-item category-item--${role}`}>
                <Link
                  to={category.to}
                  className="category-tile"
                  aria-label={`Explore ${category.name}`}
                >
                  <span className="category-tile__media" data-speed="0.1">
                    <img src={category.image} alt="" loading="lazy" decoding="async" />
                  </span>
                  <span className="category-tile__overlay">
                    <span className="category-tile__index">{number}</span>
                    <span className="category-tile__name">{category.name}</span>
                    <span className="category-tile__cta" aria-hidden="true">
                      Explore
                      <Arrow size={13} />
                    </span>
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

export default CategorySection
