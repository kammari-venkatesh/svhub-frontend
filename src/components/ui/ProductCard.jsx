import { useEffect, useState } from 'react'
import Button from './Button.jsx'
import { useCart } from '../../context/CartContext.jsx'
import { getStorefront } from '../../data/storefronts.js'
import './ProductCard.css'

const stockLabels = {
  'in-stock': 'In Stock',
  'low-stock': 'Low stock',
  'out-of-stock': 'Out of stock',
}

const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

function formatPrice(value) {
  return inr.format(value)
}

function ProductCard({ product }) {
  const { addItem } = useCart()
  const [justAdded, setJustAdded] = useState(false)
  const outOfStock = product.stock === 'out-of-stock'
  const house = getStorefront(product.storefront)
  const showStock = product.stock !== 'in-stock'
  const buttonVariant = house?.accentToken === 'terracotta' ? 'terracotta' : 'espresso'
  const hasCompare = Boolean(product.originalPrice && product.originalPrice > product.price)

  useEffect(() => {
    if (!justAdded) return undefined
    const timer = window.setTimeout(() => setJustAdded(false), 1800)
    return () => window.clearTimeout(timer)
  }, [justAdded])

  function handleAdd() {
    if (outOfStock) return
    addItem(product)
    setJustAdded(true)
  }

  return (
    <article
      className="product-card"
      style={{ '--card-accent': house?.accent ?? 'var(--espresso-brown)' }}
    >
      <div className="product-card__media">
        <img src={product.image} alt={product.name} loading="lazy" />
        {product.discount ? (
          <span className="product-card__badge">{product.discount}% off</span>
        ) : null}
      </div>
      <div className="product-card__body">
        <p className="product-card__type">{product.type}</p>
        <h3 className="product-card__name">{product.name}</h3>
        <div className="product-card__price-row">
          <p className="product-card__price">{formatPrice(product.price)}</p>
          {hasCompare ? (
            <p className="product-card__original">{formatPrice(product.originalPrice)}</p>
          ) : null}
          {product.weight ? <p className="product-card__weight">{product.weight}</p> : null}
        </div>
        {showStock ? (
          <p className={`product-card__stock product-card__stock--${product.stock}`}>
            {stockLabels[product.stock]}
          </p>
        ) : null}
        <Button
          size="sm"
          variant={buttonVariant}
          disabled={outOfStock}
          onClick={handleAdd}
          aria-live="polite"
        >
          {outOfStock ? 'Out of stock' : justAdded ? 'Added' : 'Add to cart'}
        </Button>
      </div>
    </article>
  )
}

export default ProductCard
