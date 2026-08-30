import { Link } from 'react-router-dom'
import SectionHeader from '../components/ui/SectionHeader.jsx'
import Button from '../components/ui/Button.jsx'
import { useCart } from '../context/CartContext.jsx'
import './CartPage.css'

function CartPage() {
  const { items, count } = useCart()

  return (
    <section className="cart-page">
      <div className="container">
        <SectionHeader
          eyebrow="Cart"
          title="Your basket"
          copy={
            count
              ? `${count} item${count === 1 ? '' : 's'} added from the homepage.`
              : 'Your cart is empty. Add something from the featured products.'
          }
        />

        {items.length === 0 ? (
          <Button to="/">Explore products</Button>
        ) : (
          <ul className="cart-page__list">
            {items.map((item) => (
              <li key={item.id}>
                <img src={item.image} alt="" />
                <div>
                  <p className="cart-page__name">{item.name}</p>
                  <p>
                    {item.type} · Qty {item.quantity}
                  </p>
                </div>
                <p className="cart-page__price">₹{item.price * item.quantity}</p>
              </li>
            ))}
          </ul>
        )}

        <p className="cart-page__note">
          Checkout is not live yet.{' '}
          <Link to="/shop">Continue browsing</Link>
        </p>
      </div>
    </section>
  )
}

export default CartPage
