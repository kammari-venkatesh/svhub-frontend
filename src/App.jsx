import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CartProvider } from './context/CartContext.jsx'
import Layout from './components/layout/Layout.jsx'
import Home from './pages/Home/Home.jsx'
import CartPage from './pages/CartPage.jsx'
import PlaceholderPage from './pages/PlaceholderPage.jsx'

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/shop" element={<PlaceholderPage />} />
            <Route path="/nutri-hub" element={<PlaceholderPage />} />
            <Route path="/self-care" element={<PlaceholderPage />} />
            <Route path="/about" element={<PlaceholderPage />} />
            <Route path="/contact" element={<PlaceholderPage />} />
            <Route path="/search" element={<PlaceholderPage />} />
            <Route path="/account" element={<PlaceholderPage />} />
            <Route path="/privacy" element={<PlaceholderPage />} />
            <Route path="/terms" element={<PlaceholderPage />} />
            <Route path="/shipping" element={<PlaceholderPage />} />
            <Route path="/refund" element={<PlaceholderPage />} />
            <Route path="/category/:slug" element={<PlaceholderPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
