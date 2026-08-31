import { images } from './images.js'
import { products, productHref } from './products.js'

function grain(id, note) {
  const product = products.find((item) => item.id === id)
  if (!product) return null
  return {
    id: product.id,
    name: product.name.replace(/ Rice$/, ''),
    type: product.type,
    note,
    image: product.image,
    href: productHref(product),
  }
}

export const aboutHero = {
  eyebrow: 'Rooted in SV Hub',
  title: 'Rooted in Tradition, Built for Modern Life.',
  copy: 'Organic food and natural self-care from Coimbatore — grown with care, made by familiar hands, and meant for everyday homes.',
  image: images.hero,
  imageAlt: 'Green farmland stretching toward the horizon',
}

export const aboutStorySteps = [
  { id: 'roots', index: '01', label: 'Our Roots', anchor: 'story-roots' },
  { id: 'farm', index: '02', label: 'From Farm to Home', anchor: 'story-farm' },
  { id: 'pure', index: '03', label: 'Pure by Nature', anchor: 'story-nature' },
  { id: 'sustain', index: '04', label: 'Sustainable Living', anchor: 'story-sustainable' },
  { id: 'future', index: '05', label: 'Our Future', anchor: 'story-future' },
]

export const aboutIntro = {
  eyebrow: 'Who We Are',
  title: 'A house of native goodness, from Coimbatore.',
  paragraphs: [
    'SV Hub (Sadhguru Veera’s) is an organic food and natural self-care brand rooted in Tamil Nadu. We reconnect modern households with traditional Indian food and handmade care — native grains, authentic masalas, small-batch thokku, sweets, savouries, daily meals and herbal soaps.',
    'Nutri-Hub holds the kitchen. Self-Care holds the bath. Both are prepared with simple ingredients, traditional methods and an honest farm-to-home path from field to table.',
  ],
  origin: 'Coimbatore, Tamil Nadu',
  image: images.cooking,
  imageAlt: 'A home-cooked South Indian meal served on a banana leaf',
}

export const aboutChapters = [
  {
    id: 'farm',
    number: '02',
    title: 'From Farm to Home',
    copy: 'We source directly from farmers who still grow indigenous grains with patience and respect for the land. Each staple is packed in Coimbatore, so you can follow the path from field to kitchen — who grew it, how it was prepared, and why it belongs on an everyday table.',
    image: images.farmer,
    imageAlt: 'A farmer gathering harvested paddy in a rural field',
    flip: false,
  },
  {
    id: 'pure',
    number: '03',
    title: 'Pure by Nature',
    copy: 'We keep recipes close to the way they are made at home. Native rice stays unpolished. Thokku is slow-cooked in small batches. Soaps are handmade with familiar botanicals. No exaggerated claims — only natural, preservative-free products prepared with traditional methods.',
    image: images.ingredients,
    imageAlt: 'Turmeric, mustard, dried chillies and spices used in a Tamil kitchen',
    flip: true,
  },
  {
    id: 'sustain',
    number: '04',
    title: 'Sustainable Living',
    copy: 'Goodness should leave the land better than it found it. We choose growers who honour soil and season, pack with care, and keep our practices eco-conscious — so the food on your plate and the soap on your skin support the farms and homes they come from.',
    image: images.farmland,
    imageAlt: 'A colourful paddy field under open sky',
    flip: false,
  },
]

export const aboutWhy = {
  eyebrow: 'Our Future',
  title: 'What we’re working toward.',
  copy: 'SV Hub exists to bring traditional Indian food heritage back to the modern table — honestly, and close to home.',
  pillars: [
    {
      number: '01',
      title: 'Reviving India’s food heritage',
      copy: 'Native grains, regional masalas and home recipes deserve a place in kitchens that have forgotten their names.',
    },
    {
      number: '02',
      title: 'Supporting local farmers',
      copy: 'We work with growers of indigenous grains so their harvest reaches homes with dignity, traceability and fair care.',
    },
    {
      number: '03',
      title: 'Promoting conscious living',
      copy: 'Simple ingredients, traditional methods and thoughtful self-care — choices that are kinder to people, land and daily life.',
    },
  ],
}

export const aboutGrains = {
  eyebrow: 'Native Grain Heritage',
  title: 'Grains our kitchens remember.',
  copy: 'These are not novelty rices. They are everyday grains of Tamil Nadu, grown for meals that already live in our homes.',
  items: [
    grain(
      'kullakar-rice',
      'A small, earthy grain for everyday meals — at home beside sambar, kuzhambu and simple vegetable sides.',
    ),
    grain(
      'karuppu-kavuni-rice',
      'A dark native rice cooked for festive and ordinary days, soft and slightly sticky, with coconut or a savoury side.',
    ),
    grain(
      'mappillai-samba-rice',
      'A robust, aromatic staple — cooked as everyday rice or used in traditional preparations across Tamil households.',
    ),
  ].filter(Boolean),
}

export const aboutClose = {
  eyebrow: 'Taste of Tradition',
  title: 'Bring native goodness home.',
  copy: 'Explore organic staples, traditional recipes and handmade self-care — packed in Coimbatore for modern kitchens.',
  cta: 'Explore our products',
  ctaTo: '/shop',
  image: images.farmland,
  imageAlt: '',
}
