import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CartProvider } from './context/CartContext.jsx'
import Layout from './components/layout/Layout.jsx'
import Home from './pages/Home/Home.jsx'
import Shop from './pages/Shop/Shop.jsx'
import NutriHub from './pages/NutriHub/NutriHub.jsx'
import Search from './pages/Search/Search.jsx'
import Category from './pages/Category/Category.jsx'
import Product from './pages/Product/Product.jsx'
import CartPage from './pages/CartPage.jsx'
import SelfCare from './pages/SelfCare/SelfCare.jsx'
import PlaceholderPage from './pages/PlaceholderPage.jsx'

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/nutri-hub" element={<NutriHub />} />
            <Route path="/self-care" element={<SelfCare />} />
            <Route path="/about" element={<PlaceholderPage />} />
            <Route path="/contact" element={<PlaceholderPage />} />
            <Route path="/search" element={<Search />} />
            <Route path="/account" element={<PlaceholderPage />} />
            <Route path="/privacy" element={<PlaceholderPage />} />
            <Route path="/terms" element={<PlaceholderPage />} />
            <Route path="/shipping" element={<PlaceholderPage />} />
            <Route path="/refund" element={<PlaceholderPage />} />
            <Route path="/category/:slug" element={<Category />} />
            <Route path="/product/:slug" element={<Product />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
