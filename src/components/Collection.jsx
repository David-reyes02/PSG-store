import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Collection = () => {
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const navigate = useNavigate();
  const carouselRef = useRef(null);

  useEffect(() => {
    axios.get('https://backend-psg.onrender.com/api/products')
      .then(res => {
        const todos = res.data;
        setProducts(todos);

        // Productos destacados: índices específicos
        const destacados = todos.filter((_, i) => [ 0, 2, 3, 4, 1].includes(i));
        setFeaturedProducts(destacados);
      })
      .catch(err => console.error('Error cargando productos:', err));
  }, []);

  const scrollRight = () => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const scrollLeft = () => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  return (
    <div className="product-detail-page">
      <div className="carousel-container">
      <h2 className="carousel-title">Collection</h2>
        <button className="arrow left" onClick={scrollLeft}>‹</button>
        <div className="carousel" ref={carouselRef}>
          {featuredProducts.map(product => (
            <div
              className="carousel-card"
              key={product.id}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                navigate(`/producto/${product.id}`);
              }}
              style={{ cursor: 'pointer' }}
            >
              <img src={product.img} alt={product.nameProduct} />
              <h4>{product.nameProduct}</h4>
              <p>${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
        <button className="arrow right" onClick={scrollRight}>›</button>
      </div>
    </div>
  );
};

export default Collection;
