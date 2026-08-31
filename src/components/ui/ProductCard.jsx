import { Link } from 'react-router-dom'
import CartStepper from './CartStepper.jsx'
import { productHref } from '../../data/products.js'
import { getStorefront } from '../../data/storefronts.js'
import { formatPrice } from '../../utils/money.js'
import './ProductCard.css'

const stockLabels = {
  'in-stock': 'In stock',
  'low-stock': 'Low stock',
  'out-of-stock': 'Out of stock',
}

function ProductCard({ product }) {
  const outOfStock = product.stock === 'out-of-stock'
  const house = getStorefront(product.storefront)
  const hasCompare = Boolean(product.originalPrice && product.originalPrice > product.price)
  const productTo = productHref(product)
  const accent = house?.accentToken === 'terracotta' ? 'terracotta' : 'espresso'

  return (
    <article
      className={`product-card product-card--${accent}`}
      style={{ '--card-accent': house?.accent ?? 'var(--espresso-brown)' }}
    >
      <div className="product-card__frame">
        <Link to={productTo} className="product-card__media" aria-label={`View ${product.name}`}>
          <img src={product.image} alt="" loading="lazy" decoding="async" />
        </Link>
        {product.discount ? (
          <p className="product-card__badge">
            <span>{product.discount}% off</span>
          </p>
        ) : null}
        <div className="product-card__step" onClick={(event) => event.stopPropagation()}>
          <CartStepper product={product} />
        </div>
      </div>

      <div className="product-card__body">
        <p className="product-card__type">{product.type}</p>
        <h3 className="product-card__name">
          <Link to={productTo}>{product.name}</Link>
        </h3>
        <p className="product-card__meta">
          <span className="product-card__price">
            {hasCompare ? (
              <s className="product-card__original">{formatPrice(product.originalPrice)}</s>
            ) : null}
            {formatPrice(product.price)}
          </span>
          {product.weight ? <span className="product-card__weight">{product.weight}</span> : null}
        </p>
        <p className={`product-card__stock product-card__stock--${product.stock}`}>
          {stockLabels[product.stock]}
        </p>
      </div>
    </article>
  )
}

export default ProductCard
