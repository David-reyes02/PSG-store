import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Store = () => {
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const navigate = useNavigate();
  const carouselRef = useRef(null);

  useEffect(() => {
    axios.get('https://backend-psg.onrender.com/api/products')
      .then(res => {
        const todos = res.data;
        setProducts(todos);

        const destacados = todos.filter((product, i) =>
          [5, 6, 7, 8, 9, 10, 11].includes(i) &&
          product &&
          product.img &&
          product.nameProduct &&
          product.price != null
        );

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
        <h2 className="carousel-title">New home kit 25/26</h2>

        <button className="arrow left" onClick={scrollLeft}>‹</button>

        <div className="carousel" ref={carouselRef}>
          {featuredProducts.map(product => (
            <div
              className="carousel-card"
              key={product.id}
              onClick={() => navigate(`/producto/${product.id}`)}
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

export default Store;
