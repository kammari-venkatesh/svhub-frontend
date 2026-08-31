import { useLocation, useParams } from 'react-router-dom'
import SectionHeader from '../components/ui/SectionHeader.jsx'
import Button from '../components/ui/Button.jsx'
import { getCategoryBySlug } from '../data/categories.js'
import { getStorefront } from '../data/storefronts.js'
import './PlaceholderPage.css'

const copy = {
  '/search': {
    eyebrow: 'Search',
    title: 'Search will arrive with the shop',
    text: 'Until then, browse the featured products on the homepage.',
  },
}

function pageFromRoute(pathname, slug) {
  if (slug) {
    const category = getCategoryBySlug(slug)
    if (category) {
      const house = getStorefront(category.storefront)
      return {
        eyebrow: house?.name ?? 'Shop',
        title: category.name,
        text: `${category.description} This category page will open here in a later version.`,
      }
    }

    return {
      eyebrow: 'Shop',
      title: 'This category is on its way',
      text: 'Return home to continue exploring SV Hub.',
    }
  }

  return (
    copy[pathname] || {
      eyebrow: 'SV Hub',
      title: 'This page is on its way',
      text: 'Return home to continue exploring the brand.',
    }
  )
}

function PlaceholderPage() {
  const { pathname } = useLocation()
  const { slug } = useParams()
  const page = pageFromRoute(pathname, slug)

  return (
    <section className="placeholder">
      <div className="container">
        <SectionHeader eyebrow={page.eyebrow} title={page.title} copy={page.text} />
        <div className="placeholder__actions">
          <Button to="/">Back home</Button>
        </div>
      </div>
    </section>
  )
}

export default PlaceholderPage
