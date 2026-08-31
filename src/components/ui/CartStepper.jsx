import { useCart } from '../../context/CartContext.jsx'
import './CartStepper.css'

const MAX_QTY = 12

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 3.25v9.5M3.25 8h9.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function CartStepper({ product, className = '' }) {
  const { addItem, setItemQuantity, quantityOf } = useCart()
  const qty = quantityOf(product)
  const outOfStock = product.stock === 'out-of-stock'
  const classes = `cart-step${className ? ` ${className}` : ''}`

  if (outOfStock) {
    return (
      <span className={`${classes} cart-step--oos`} aria-label={`${product.name} is out of stock`}>
        ×
      </span>
    )
  }

  if (qty === 0) {
    return (
      <button
        type="button"
        className={`${classes} cart-step--add`}
        onClick={() => addItem(product, 1)}
        aria-label={`Add ${product.name} to cart`}
      >
        <PlusIcon />
      </button>
    )
  }

  return (
    <div className={`${classes} cart-step--qty`} role="group" aria-label={`Quantity of ${product.name}`}>
      <button
        type="button"
        className="cart-step__btn"
        onClick={() => setItemQuantity(product, qty - 1)}
        aria-label={`Remove one ${product.name}`}
      >
        −
      </button>
      <span className="cart-step__value" aria-live="polite">
        {qty}
      </span>
      <button
        type="button"
        className="cart-step__btn"
        disabled={qty >= MAX_QTY}
        onClick={() => setItemQuantity(product, qty + 1)}
        aria-label={`Add another ${product.name}`}
      >
        +
      </button>
    </div>
  )
}

export default CartStepper
