import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext'; // asegúrate que esta ruta sea correcta
import Cart from './Cart'; // asegúrate que la ruta sea correcta

const Header = ({ menuOpen, setMenuOpen }) => {
  const { cartItems } = useCart();
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const [cartOpen, setCartOpen] = useState(false);

  const toggleCart = (e) => {
    e.preventDefault();
    setCartOpen(!cartOpen);
  };

  const toggleMenu = () => {
    if (typeof setMenuOpen === 'function') {
      setMenuOpen(!menuOpen);
    }
  };

  return (
    <header className="header">
      <div className="hamburger-icon" onClick={toggleMenu}>☰</div>

      <a href='/' className="logo">
        <img src="https://brandlogos.net/wp-content/uploads/2014/12/paris-saint-germain-logo-512x512.png" alt="Logo" />
        <div className="logo-divider"></div>
        <img src="https://logowik.com/content/uploads/images/260_nike.jpg" alt="Logo" />
      </a>

      <nav className={`navbar ${menuOpen ? 'open' : ''}`}>
        <ul>
          <li><a href="#">Equipaciones</a></li>
          <li><a href="#">Entrenamiento</a></li>
          <li><a href="#">Hombre</a></li>
          <li><a href="#">Mujer</a></li>
          <li><a href="#">Niños</a></li>
          <li><a href="#">Ofertas</a></li>
        </ul>
      </nav>

      <div className="icons">
        <a href="#" className="fa fa-search" onClick={(e) => e.preventDefault()}></a>
        <a href="#" className="fa fa-user" onClick={(e) => e.preventDefault()}></a>
        <a href="#" className="fa fa-shopping-cart" onClick={toggleCart}>
          <span className="cart-counter">{cartItemCount}</span>
        </a>
      </div>

      <Cart cartOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
};

export default Header;
