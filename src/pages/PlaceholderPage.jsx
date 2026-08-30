import { useLocation, useParams } from 'react-router-dom'
import SectionHeader from '../components/ui/SectionHeader.jsx'
import Button from '../components/ui/Button.jsx'
import { getCategoryBySlug } from '../data/categories.js'
import { getStorefront } from '../data/storefronts.js'
import './PlaceholderPage.css'

const copy = {
  '/shop': {
    eyebrow: 'Shop',
    title: 'The full shop is being prepared',
    text: 'Featured products are already on the homepage. The complete catalogue will live here.',
  },
  '/nutri-hub': {
    eyebrow: 'Nutri-Hub',
    title: 'Organic food and traditional products',
    text: 'Native rice, thokku, masalas and daily meals will be gathered here.',
  },
  '/self-care': {
    eyebrow: 'Self-Care',
    title: 'Handmade personal-care products',
    text: 'Botanical soaps and traditional care will have their own house here.',
  },
  '/about': {
    eyebrow: 'About',
    title: 'The SV Hub story',
    text: 'A longer farm-to-home story is coming. For now, the homepage holds the promise.',
  },
  '/contact': {
    eyebrow: 'Contact',
    title: 'We are in Coimbatore',
    text: 'Write to hello@svhub.in or call +91 98765 43210. A full contact page will follow.',
  },
  '/search': {
    eyebrow: 'Search',
    title: 'Search will arrive with the shop',
    text: 'Until then, browse the featured products on the homepage.',
  },
  '/account': {
    eyebrow: 'Account',
    title: 'Your account',
    text: 'Sign in and order history will live here in a later version.',
  },
  '/privacy': {
    eyebrow: 'Policies',
    title: 'Privacy Policy',
    text: 'A full policy page will replace this placeholder. Your data will be handled with care.',
  },
  '/terms': {
    eyebrow: 'Policies',
    title: 'Terms & Conditions',
    text: 'The complete terms will be published here before orders go live.',
  },
  '/shipping': {
    eyebrow: 'Policies',
    title: 'Shipping Policy',
    text: 'Shipping from Coimbatore will be explained here in detail.',
  },
  '/refund': {
    eyebrow: 'Policies',
    title: 'Refund Policy',
    text: 'Refund and cancellation details will be listed here.',
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
        <Button to="/">Back home</Button>
      </div>
    </section>
  )
}

export default PlaceholderPage
