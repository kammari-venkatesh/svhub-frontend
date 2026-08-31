import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import Layout from './components/layout/Layout.jsx'
import Home from './pages/Home/Home.jsx'
import Shop from './pages/Shop/Shop.jsx'
import NutriHub from './pages/NutriHub/NutriHub.jsx'
import Search from './pages/Search/Search.jsx'
import Category from './pages/Category/Category.jsx'
import Product from './pages/Product/Product.jsx'
import CartPage from './pages/CartPage.jsx'
import Checkout from './pages/Checkout/Checkout.jsx'
import OrderSuccess from './pages/OrderSuccess/OrderSuccess.jsx'
import PaymentFailed from './pages/PaymentFailed/PaymentFailed.jsx'
import SelfCare from './pages/SelfCare/SelfCare.jsx'
import About from './pages/About/About.jsx'
import Contact from './pages/Contact/Contact.jsx'
import Login from './pages/Auth/Login.jsx'
import Register from './pages/Auth/Register.jsx'
import ForgotPassword from './pages/Auth/ForgotPassword.jsx'
import ResetPassword from './pages/Auth/ResetPassword.jsx'
import Account from './pages/Account/Account.jsx'
import Overview from './pages/Account/Overview.jsx'
import Profile from './pages/Account/Profile.jsx'
import Orders from './pages/Account/Orders.jsx'
import OrderDetail from './pages/Account/OrderDetail.jsx'
import Addresses from './pages/Account/Addresses.jsx'
import PrivacyPolicy from './pages/Legal/PrivacyPolicy.jsx'
import Terms from './pages/Legal/Terms.jsx'
import ShippingPolicy from './pages/Legal/ShippingPolicy.jsx'
import RefundPolicy from './pages/Legal/RefundPolicy.jsx'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              <Route path="/payment-failed" element={<PaymentFailed />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/nutri-hub" element={<NutriHub />} />
              <Route path="/self-care" element={<SelfCare />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/search" element={<Search />} />
              <Route path="/account" element={<Account />}>
                <Route index element={<Overview />} />
                <Route path="profile" element={<Profile />} />
                <Route path="orders" element={<Orders />} />
                <Route path="orders/:orderId" element={<OrderDetail />} />
                <Route path="addresses" element={<Addresses />} />
              </Route>
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/privacy" element={<Navigate to="/privacy-policy" replace />} />
              <Route path="/terms-and-conditions" element={<Terms />} />
              <Route path="/terms" element={<Navigate to="/terms-and-conditions" replace />} />
              <Route path="/shipping-policy" element={<ShippingPolicy />} />
              <Route path="/shipping" element={<Navigate to="/shipping-policy" replace />} />
              <Route path="/refund-policy" element={<RefundPolicy />} />
              <Route path="/refund" element={<Navigate to="/refund-policy" replace />} />
              <Route path="/category/:slug" element={<Category />} />
              <Route path="/product/:slug" element={<Product />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
