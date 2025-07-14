import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../contexts/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [talle, setTalle] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const carouselRef = useRef(null);

  useEffect(() => {
    axios.get(`https://backend-psg.onrender.com/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error('Error cargando producto:', err));

    axios.get('https://backend-psg.onrender.com/api/products')
      .then(res => setAllProducts(res.data))
      .catch(err => console.error('Error cargando sugerencias:', err));
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, cantidad, talle); 
  };

  if (!product) return <p className="loading-message">Cargando producto...</p>;

  const tallesDisponibles = ['S', 'M', 'L', 'XL', '2XL'];
  const sugerencias = allProducts.filter(p => p.id !== id).slice(0, 8);

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -220, behavior: 'smooth' });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 220, behavior: 'smooth' });
  };

  return (
    <div className="product-detail-page">
      <div className="product-section">
        <div className="image-gallery">
          <img
            src={product.img}
            alt={product.nameProduct}
            className="main-product-image"
          />
        </div>

        <div className="product-details">
          <h1 className="product-name">{product.nameProduct}</h1>
          <p className="product-price">Precio: ${product.price.toFixed(2)}</p>

          <p className="availability">En stock</p>

          <div className="size-selector">
            <label htmlFor="talle">Elegir talle:</label>
            <div className="size-options">
              {tallesDisponibles.map((t) => (
                <button
                  key={t}
                  className={`size-option ${talle === t ? 'selected' : ''}`}
                  onClick={() => setTalle(t)}
                >
                  {t}
                </button>
              ))}
              <span className="size-guide">GUÍA DE TALLAS</span>
            </div>
          </div>

          <div className="quantity-selector">
          <select
            id="cantidad"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
            className="quantity-dropdown"
          >
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>


            <button
              onClick={handleAddToCart}
              className="add-to-cart-btn"
            >
              Agregar al carrito
            </button>
          </div>

          <div className="shipping-info">
            <p><strong>Envíos:</strong></p>
            <ul>
              <li>Este artículo saldrá del almacén en 6 días laborables.</li>
              <li>Continúe con el pago para conocer las opciones de envío y tiempos de tránsito adicionales.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="suggestions">
        <h2>También puede interesarte</h2><br/>
        <div className="carousel-container">
          <button className="arrow left" onClick={scrollLeft}>‹</button>
          <div className="carousel" ref={carouselRef}>
            {sugerencias.map((prod) => (
              <div
                key={prod.id}
                className="carousel-card"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  navigate(`/producto/${prod.id}`);
                }}

              >
                <img src={prod.img} alt={prod.nameProduct} />
                <h4>{prod.nameProduct}</h4>
                <p>${prod.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
          <button className="arrow right" onClick={scrollRight}>›</button>
        </div>
      </div>

      <div className="video-section">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="promo-video"
          style={{ width: '100%', maxHeight: '500px', objectFit: 'cover', marginTop: '40px' }}
        >
         <source src="/video/trailer-kit.mp4" type="video/mp4" /><source src="video\trailer-kit.mp4" type="video/mp4" />
          Tu navegador no soporta el video.
        </video>
      </div>
    </div>
  );
};

export default ProductDetail;
