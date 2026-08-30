import Hero from './Hero.jsx'
import StatsStrip from './StatsStrip.jsx'
import Storefronts from './Storefronts.jsx'
import FeaturedProducts from './FeaturedProducts.jsx'
import EditorialStory from './EditorialStory.jsx'
import CategorySection from './CategorySection.jsx'
import WhySvHub from './WhySvHub.jsx'
import Testimonials from './Testimonials.jsx'
import FinalCta from './FinalCta.jsx'
import './Home.css'

function Home() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <Storefronts />
      <FeaturedProducts />
      <EditorialStory />
      <CategorySection />
      <WhySvHub />
      <Testimonials />
      <FinalCta />
    </>
  )
}

export default Home
