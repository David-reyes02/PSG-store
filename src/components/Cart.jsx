import { useEffect } from 'react';
import { useCart } from '../contexts/CartContext'; 

const Cart = ({ cartOpen, onClose }) => {
  const { cartItems, removeFromCart } = useCart();
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  useEffect(() => {
    if (cartOpen) {
      document.body.style.overflow = 'hidden'; // desactiva scroll
    } else {
      document.body.style.overflow = 'auto'; // vuelve a activar scroll
    }

    // Limpieza cuando el componente se desmonta o cambia cartOpen
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [cartOpen]);

  return (
    <>
      {/* Fondo oscurecido, al hacer clic cierra el carrito */}
      {cartOpen && <div className="cart-overlay" onClick={onClose}></div>}

      {/* Contenedor del carrito */}
      <div className={`cart-dropdown ${cartOpen ? 'open' : ''}`}>
        {/* Botón para cerrar */}
        <button className="cart-close-btn" onClick={onClose}>×</button>
        <h2>Carrito</h2>

        {cartItems.length === 0 ? (
          <p>No hay productos en el carrito</p>
        ) : (
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div key={`${item.id}-${index}`} className="cart-item">
                <img src={item.img} alt={item.nameProduct} />
                <h4>{item.nameProduct}</h4>
                <p className="cart-size"><strong>Talle:</strong> {item.size}</p>
                <p>${item.price.toFixed(2)} x {item.quantity}</p>

                <button
                  onClick={() => removeFromCart(index)}
                  className="remove-btn"
                >
                  <i className="fa fa-trash-can"></i>
                </button>
              </div>
            ))}

            <div className="cart-total">
              <h3>Total: ${totalPrice.toFixed(2)}</h3>
              <button className="pay-button">Finalizar compra</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
