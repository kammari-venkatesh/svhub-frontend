import { Link } from 'react-router-dom'
import SectionHeader from '../../components/ui/SectionHeader.jsx'
import Reveal from '../../components/ui/Reveal.jsx'
import { categories } from '../../data/categories.js'
import { categoryIntro } from '../../data/home.js'
import { getStorefront } from '../../data/storefronts.js'
import './CategorySection.css'

function ShopArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 8h10M9.5 4.5 13 8l-3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CategorySection() {
  return (
    <section
      id="shop-by-category"
      className="home-section home-section--white categories-section"
      aria-label="Shop by category"
    >
      <div className="home-container">
        <Reveal className="home-section__header">
          <SectionHeader
            align="center"
            eyebrow={categoryIntro.eyebrow}
            title={categoryIntro.title}
            copy={categoryIntro.copy}
          />
        </Reveal>
        <Reveal as="ul" className="home-stagger category-grid">
          {categories.map((category) => {
            const house = getStorefront(category.storefront)

            return (
              <li key={category.id}>
                <Link to={category.to} className="category-tile">
                  <span className="category-tile__media">
                    <img src={category.image} alt="" loading="lazy" decoding="async" />
                  </span>
                  <span className="category-tile__overlay">
                    {house?.name ? <span className="category-tile__house">{house.name}</span> : null}
                    <span className="category-tile__name">{category.name}</span>
                    <span className="category-tile__cta">
                      Shop
                      <ShopArrow />
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
