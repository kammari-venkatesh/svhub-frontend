import { getCategoriesByStorefront } from './categories.js'
import { images } from './images.js'
import { products } from './products.js'
import { getStorefront } from './storefronts.js'

export const nutriHub = getStorefront('nutri-hub')

export const nutriHubIntro = {
  eyebrow: 'Nutri-Hub',
  title: 'Rooted in Tradition, Made for Every Day.',
  copy: 'Organic staples, native grains, authentic masalas, traditional pickles, sweets, savouries and wholesome daily meals.',
  cta: 'Shop Nutri-Hub',
  ctaTo: '/shop?house=nutri-hub',
  image: images.nutriHero,
  imageAlt: 'Native rice grains — white, parboiled and red varieties',
}

export const nutriHubPantry = {
  title: 'Our Pantry',
  copy: 'Discover the richness of our heritage through thoughtfully curated ingredients.',
  explore: 'Explore Collection',
}

export const nutriHubCategoryTitles = {
  'native-rice': 'Organic Staples & Native Rice',
  pickles: 'Pickles / Thokku',
  masalas: 'Masalas & Seasonings',
}

export const nutriHubCategories = getCategoriesByStorefront('nutri-hub')
  .filter((category) => nutriHubCategoryTitles[category.slug])
  .map((category) => ({
    ...category,
    displayName: nutriHubCategoryTitles[category.slug],
  }))

export const nutriHubFeaturedIntro = {
  eyebrow: 'Featured',
  title: 'Pantry Essentials',
  cta: 'View All',
  ctaTo: '/shop?house=nutri-hub',
}

const featuredIds = ['kullakar-rice', 'karuppu-kavuni-rice', 'venthaya-thokku', 'garam-masala']

export const nutriHubFeatured = featuredIds
  .map((id) => products.find((product) => product.id === id))
  .filter(Boolean)

export const nutriHubStory = {
  eyebrow: 'Our Process',
  title: 'Farm to Home.',
  paragraphs: [
    'We believe that true nourishment begins in the soil. Our commitment to native grains and traditional preparation methods isn’t just about preserving heritage—it’s about providing uncompromising quality for your daily meals.',
    'By working directly with farmers who honor the land, and preparing our staples with the same care used in traditional households, we ensure every grain and spice delivers authentic taste and vitality.',
  ],
  cta: 'Read Our Story',
  ctaTo: '/about',
  image: images.farmer,
  imageAlt: 'A farmer gathering harvested paddy in a rural field',
}

export const nutriHubClose = {
  headline: 'Bring Native Goodness Home',
  cta: 'Explore All Products',
  ctaTo: '/shop?house=nutri-hub',
  image: images.hero,
}
