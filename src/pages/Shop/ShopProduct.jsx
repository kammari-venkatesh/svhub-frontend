import { Link } from 'react-router-dom'
import CartStepper from '../../components/ui/CartStepper.jsx'
import { productHref } from '../../data/products.js'
import { formatPrice } from '../../utils/money.js'
import './ShopProduct.css'

function ShopProduct({ product, layout = 'tile', index }) {
  const outOfStock = product.stock === 'out-of-stock'
  const hasCompare = Boolean(product.originalPrice && product.originalPrice > product.price)
  const productTo = productHref(product)
  const showStock = product.stock !== 'in-stock'

  return (
    <article
      className={`shop-item shop-item--${layout}${outOfStock ? ' is-unavailable' : ''}`}
      style={{ '--item-accent': 'var(--charcoal-green)' }}
    >
      <div className="shop-item__frame">
        <Link to={productTo} className="shop-item__media" aria-label={`View ${product.name}`}>
          <img
            src={product.image}
            alt=""
            loading={index < 4 ? 'eager' : 'lazy'}
            decoding="async"
          />
        </Link>

        {product.discount ? (
          <p className="shop-item__badge">
            <span>{product.discount}% off</span>
          </p>
        ) : null}

        <div className="shop-item__step" onClick={(event) => event.stopPropagation()}>
          <CartStepper product={product} />
        </div>
      </div>

      <div className="shop-item__body">
        <h3 className="shop-item__name">
          <Link to={productTo}>{product.name}</Link>
        </h3>

        <p className="shop-item__meta">
          {hasCompare ? <s className="shop-item__original">{formatPrice(product.originalPrice)}</s> : null}
          <span className="shop-item__price">{formatPrice(product.price)}</span>
          {product.weight ? (
            <>
              <span className="shop-item__sep" aria-hidden="true">
                —
              </span>
              <span className="shop-item__weight">{product.weight}</span>
            </>
          ) : null}
        </p>

        {showStock ? (
          <p className={`shop-item__stock shop-item__stock--${product.stock}`}>
            {product.stock === 'low-stock' ? 'Low stock' : 'Out of stock'}
          </p>
        ) : null}
      </div>
    </article>
  )
}

export default ShopProduct
