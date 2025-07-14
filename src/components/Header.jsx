import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import Cart from './Cart';

const Header = ({ menuOpen, setMenuOpen, onSearch }) => {
  const { cartItems } = useCart();
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleCart = (e) => {
    e.preventDefault();
    setCartOpen(!cartOpen);
  };

  const toggleMenu = () => {
    if (typeof setMenuOpen === 'function') {
      setMenuOpen(!menuOpen);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) onSearch(value);
  };

  return (
    <header className="header">
      <div className="top-bar">
        <div className="hamburger-icon" onClick={toggleMenu}>☰</div>

        <a href="/" className="logo">
          <img src="https://brandlogos.net/wp-content/uploads/2014/12/paris-saint-germain-logo-512x512.png" alt="PSG" />
          <div className="logo-divider"></div>
          <img src="https://logowik.com/content/uploads/images/260_nike.jpg" alt="Nike" />
        </a>

        {/* BÚSQUEDA DESKTOP */}
        <div className="search-bar desktop-only">
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <i className="fa fa-search"></i>
        </div>

        <div className="icons">
          <a href="#" className="fa fa-user" onClick={(e) => e.preventDefault()}></a>
          <a href="#" className="fa fa-shopping-cart" onClick={toggleCart}>
            <span className="cart-counter">{cartItemCount}</span>
          </a>
        </div>
      </div>

      <nav className={`navbar ${menuOpen ? 'open' : ''}`}>
        {/* BÚSQUEDA MÓVIL */}
        <div className="search-bar mobile-only">
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <i className="fa fa-search"></i>
        </div>

        <ul>
          <li><a href="#">EQUIPACIONES</a></li>
          <li><a href="#">ENTRENAMIENTO</a></li>
          <li><a href="#">HOMBRE</a></li>
          <li><a href="#">MUJER</a></li>
          <li><a href="#">NIÑOS</a></li>
          <li><a href="#">COLLECTION</a></li>
          <li><a href="#">OFERTAS</a></li>
        </ul>
      </nav>

      <Cart cartOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
};

export default Header;
