import { useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const Cart = ({ cartOpen, onClose }) => {
  const { cartItems, removeFromCart } = useCart();
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  useEffect(() => {
    document.body.style.overflow = cartOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [cartOpen]);

  const handleCheckout = async () => {
    try {
      const stripe = await loadStripe('pk_test_51RZHmr2ertZAmIL7T6yPgjspYyh7gqK0Ywcu9p9GPyodPLPCYHExAMKnKBAMM3LLQVUsKJx8m6Qcx50BRbpP7adY00CeWIhDk5');

      const response = await axios.post('https://backend-psg.onrender.com/api/create-checkout-session', {
        items: cartItems
      });

      const session = response.data;
      await stripe.redirectToCheckout({ sessionId: session.id });
    } catch (error) {
      console.error('Error al redirigir a Stripe:', error);
    }
  };

  return (
    <>
      {cartOpen && <div className="cart-overlay" onClick={onClose}></div>}

      <div className={`cart-dropdown ${cartOpen ? 'open' : ''}`}>
        <button className="cart-close-btn" onClick={onClose}>×</button>
        <h2>Carrito</h2>

        {cartItems.length === 0 ? (
          <p>No hay productos en el carrito</p>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item, index) => (
                <div key={`${item.id}-${index}`} className="cart-item">
                  <div className="cart-item-details">
                    <div className="cart-item-header">
                      <img src={item.img} alt={item.nameProduct} />
                      <h4>{item.nameProduct}</h4>
                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(index)}
                        aria-label="Eliminar producto"
                      >
                        <i className="fa fa-trash-can"></i>
                      </button>
                    </div>

                    <div className="cart-item-meta">
                      <p><strong>Talle:</strong> {item.size}</p>
                      <p><strong>Cantidad:</strong> {item.quantity}</p>
                      <p><strong>Precio:</strong> ${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-total-container">
              <div className="cart-total">
                <span>Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <button className="pay-button" onClick={handleCheckout}>
                Finalizar compra
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
