import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import { CartProvider } from './contexts/CartContext';
import Footer from './components/Footer';
import Champhions from './components/Champhions';
import Triomphe from './components/Triomphe';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <CartProvider>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home />
                <Products />
                <Champhions />
                <Triomphe />
              </>
            }
          />
          <Route path="/producto/:id" element={<ProductDetail />} />
        </Routes>
      </main>
      <Footer/>

    </CartProvider>
  );
}

export default App;
