import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { CartProvider } from "./context/CartProvider";
import Menu from './components/Menu';
import Footer from './components/Footer';
import Home from './components/Home';
import Product from './components/Product';
import Detail from './components/Detail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Profile from './components/Profile';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Container className="py-2 px-0 px-sm-3 min-vh-100 d-flex flex-column justify-content-between" style={{ maxWidth: '100vw', overflowX: 'hidden' }}>
          <div>
            <Menu />
            
            {/* Main Application Pages routing */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/make-up" element={<Product />} />
              <Route path="/detail/:id" element={<Detail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
          
          <Footer />
        </Container>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;