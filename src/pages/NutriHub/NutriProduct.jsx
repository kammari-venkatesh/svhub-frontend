import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext.jsx'
import { productHref } from '../../data/products.js'
import { formatPrice } from '../../utils/money.js'

const stockLabels = {
  'in-stock': 'In stock',
  'low-stock': 'Low stock',
  'out-of-stock': 'Out of stock',
}

function Arrow({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 8h10M9.5 4.5 13 8l-3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function NutriProduct({ product, featured = false, eager = false }) {
  const { addItem } = useCart()
  const [justAdded, setJustAdded] = useState(false)
  const outOfStock = product.stock === 'out-of-stock'
  const hasCompare = Boolean(product.originalPrice && product.originalPrice > product.price)
  const productTo = productHref(product)
  const cartLabel = outOfStock ? 'Out of stock' : justAdded ? 'Added' : 'Add to cart'

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
    <article className={`nh-item${featured ? ' nh-item--lead' : ''}${outOfStock ? ' is-unavailable' : ''}`}>
      <div className="nh-item__frame">
        <Link to={productTo} className="nh-item__media" aria-label={`View ${product.name}`}>
          <img src={product.image} alt="" loading={eager ? 'eager' : 'lazy'} decoding="async" />
          <span className="nh-item__veil" aria-hidden="true" />
          <span className="nh-item__peek">
            View product
            <Arrow />
          </span>
        </Link>
        {product.discount ? (
          <p className="nh-item__badge">
            <span>{product.discount}% off</span>
          </p>
        ) : null}
      </div>

      <div className="nh-item__body">
        <p className="nh-item__type">{product.type}</p>
        <h3 className="nh-item__name">
          <Link to={productTo}>{product.name}</Link>
        </h3>
        <p className="nh-item__meta">
          <span className="nh-item__price">
            {formatPrice(product.price)}
            {hasCompare ? <s className="nh-item__original">{formatPrice(product.originalPrice)}</s> : null}
          </span>
          {product.weight ? <span className="nh-item__weight">{product.weight}</span> : null}
        </p>
        <p className={`nh-item__stock nh-item__stock--${product.stock}`}>
          <span className="nh-item__mark" aria-hidden="true" />
          {stockLabels[product.stock]}
        </p>
        <div className="nh-item__actions">
          <button
            type="button"
            className="nh-item__cart"
            disabled={outOfStock}
            onClick={handleAdd}
            aria-label={outOfStock ? `${product.name} is out of stock` : `Add ${product.name} to cart`}
            aria-live="polite"
          >
            <span>{cartLabel}</span>
            {outOfStock ? null : <Arrow />}
          </button>
        </div>
      </div>
    </article>
  )
}

export default NutriProduct
