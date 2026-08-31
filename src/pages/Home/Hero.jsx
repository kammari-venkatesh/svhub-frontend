import { Link } from 'react-router-dom'
import { heroContent } from '../../data/home.js'
import './Hero.css'

function Star({ className }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero__top">
        <div className="hero__layer" aria-hidden="true" />

        <div className="hero__content">
          <Star className="hero__star hero__star--a" />
          <Star className="hero__star hero__star--b" />
          <Star className="hero__star hero__star--c" />
          <Star className="hero__star hero__star--d" />

          <p className="hero__eyebrow">
            <span className="hero__dot" />
            {heroContent.eyebrow}
          </p>
          <h1>{heroContent.title}</h1>
          <p className="hero__description">{heroContent.copy}</p>
          <Link to={heroContent.ctaTo} className="hero__button">
            Shop Now <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      <div className="hero__image" data-speed="0.18">
        <img src={heroContent.image} alt={heroContent.imageAlt} />
      </div>
    </section>
  )
}

export default Hero
