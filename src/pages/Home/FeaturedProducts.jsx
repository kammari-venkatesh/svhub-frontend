import ProductCard from '../../components/ui/ProductCard.jsx'
import SectionHeader from '../../components/ui/SectionHeader.jsx'
import Button from '../../components/ui/Button.jsx'
import Reveal from '../../components/ui/Reveal.jsx'
import { featuredIntro } from '../../data/home.js'
import { featuredProducts } from '../../data/products.js'
import './FeaturedProducts.css'

function FeaturedProducts() {
  return (
    <section className="home-section home-section--white featured" aria-label="Featured products">
      <div className="home-container">
        <Reveal className="home-section__header">
          <SectionHeader
            align="center"
            eyebrow={featuredIntro.eyebrow}
            title={featuredIntro.title}
            copy={featuredIntro.copy}
          />
        </Reveal>
        <Reveal className="home-stagger featured__grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Reveal>
        <Reveal className="featured__cta" delay={80}>
          <Button to={featuredIntro.ctaTo} variant="secondary" arrow>
            {featuredIntro.cta}
          </Button>
        </Reveal>
      </div>
    </section>
  )
}

export default FeaturedProducts
