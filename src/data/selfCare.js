import { images } from './images.js'
import { products } from './products.js'
import { getStorefront } from './storefronts.js'

export const selfCare = getStorefront('self-care')

export const selfCareIntro = {
  eyebrow: 'House of Care',
  kicker: 'Self-Care',
  title: 'Simple Care, Rooted in Nature.',
  copy: 'Handmade herbal soaps inspired by traditional ingredients and everyday care.',
  cta: 'Shop Self-Care',
  ctaHref: '#handmade-soaps',
  image: images.careHero,
  imageAlt: 'Handmade herbal soap bars stacked with dried botanicals',
}

export const selfCareStills = [
  { src: images.herbs, alt: 'Fresh garden herbs gathered for traditional soap making', label: 'Herbs' },
  { src: images.careLeaves, alt: 'Green leaves used as natural soap ingredients', label: 'Leaves' },
  { src: images.careIngredients, alt: 'Turmeric and kitchen spices used in handmade care', label: 'Natural ingredients' },
  { src: images.handmadeSoaps, alt: 'Cut bars of handmade herbal soap', label: 'Handmade soap' },
  { src: images.carePrep, alt: 'Wooden spoons of turmeric and herbal powders used in traditional care', label: 'Traditional preparation' },
  { src: images.careTexture, alt: 'Earthy handmade soap bars cut by hand', label: 'Home-crafted textures' },
]

export const selfCareCollectionIntro = {
  eyebrow: 'The Collection',
  title: 'Handmade soaps for everyday care.',
  copy: 'Six bars, each named for the ingredient that shapes it — mixed and cut by hand.',
}

export const selfCareProductIds = [
  'vettiver-soap',
  'kuppaimeni-soap',
  'kasthuri-manjal-soap',
  'sweet-basil-soap',
  'hibiscus-soap',
  'multanimitti-soap',
]

export const selfCareProducts = selfCareProductIds
  .map((id) => products.find((product) => product.id === id))
  .filter(Boolean)

export const selfCareStory = {
  eyebrow: 'Our Approach',
  title: 'Made by hand, in the old way.',
  copy: 'These soaps begin with herbs, oils and clays that have long belonged in South Indian homes. Each bar is mixed, poured and cut by hand — a small-batch craft meant for everyday washing, not for extravagant promises.',
  principles: [
    {
      number: '01',
      title: 'Handmade batches',
      copy: 'Every bar is prepared slowly, in small quantities, without industrial shortcuts.',
    },
    {
      number: '02',
      title: 'Traditional ingredients',
      copy: 'Vettiver, kuppaimeni, kasthuri manjal, sweet basil, hibiscus and multanimitti — named as they are known.',
    },
    {
      number: '03',
      title: 'Everyday care',
      copy: 'Simple soaps for daily washing, kept honest rather than dressed in clinical claims.',
    },
  ],
  figures: [
    { src: images.carePrep, alt: 'Wooden spoons of turmeric and herbal powders used in traditional care' },
    { src: images.herbs, alt: 'Fresh herbs set aside for soap making' },
    { src: images.handmadeSoaps, alt: 'Handmade soap bars stacked in a home setting' },
  ],
}

export const selfCareClose = {
  eyebrow: 'House of Care',
  headline: 'Explore Handmade Care',
  copy: 'Choose a bar named for its ingredient, and bring a little handmade care into the rhythm of your day.',
  cta: 'Shop Self-Care',
  ctaHref: '#handmade-soaps',
  image: images.handmadeSoaps,
}
