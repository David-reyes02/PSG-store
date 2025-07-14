import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Champhions = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('https://backend-psg.onrender.com/api/products')
      .then((res) => {
        const indicesDeseados = [2, 1];
        const productosEspecificos = res.data.filter((_, i) =>
          indicesDeseados.includes(i)
        );
        setProducts(productosEspecificos);
      })
      .catch((err) => console.error('Error al cargar productos:', err));
  }, []);

  const productoDiv3 = products[0];
  const productoDiv4 = products[1];

  return (
    <>
      <div className="parent">
        <div className="div1">
          <div className="div2">
            <img
              src="https://usastore.psg.fr/content/ws/all/c7b5a241-9388-4160-9148-da563f86fc6e__1600X952.png?w=1600"
              alt="Imagen decorativa"
            />
          </div>

          <div className="products-container">
          <div className="div3">
            {/* Producto 1 */}
            {products.length > 0 ? (
              <div className="product-wrapper">
                <div
                  className="carousel-card"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    navigate(`/producto/${productoDiv3.id}`);
                  }}
                  
                  style={{ cursor: 'pointer' }}
                >
                  <img src={productoDiv3.img} alt={productoDiv3.nameProduct} />
                  <h4>{productoDiv3.nameProduct}</h4>
                  <p>${productoDiv3.price.toFixed(2)}</p>
                </div>
              </div>
            ) : (
              <p style={{ color: 'black' }}>Cargando...</p>
            )}
          </div>

          <div className="div4">
            {/* Producto 2 */}
            {products.length > 1 ? (
              <div className="product-wrapper">
                <div
                  className="carousel-card"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    navigate(`/producto/${productoDiv4.id}`);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <img src={productoDiv4.img} alt={productoDiv4.nameProduct} />
                  <h4>{productoDiv4.nameProduct}</h4>
                  <p>${productoDiv4.price.toFixed(2)}</p>
                </div>
              </div>
            ) : (
              <p style={{ color: 'black' }}>Cargando...</p>
            )}
          </div>
        </div>
        </div>
      </div>

      {/* Imágenes decorativas abajo */}
      <div className="collection">
        <div className="shirts">
          <img
            src="https://usastore.psg.fr/content/ws/all/48551c06-a5dc-4880-b6c5-c4f21dd1ec1b__533X594.png?w=533"
            alt="#"
          />
        </div>
        <div className="shirts2">
          <img
            src="https://usastore.psg.fr/content/ws/all/e8f84e9a-141c-4efc-82dc-ae99ea3e6969__533X594.png?w=533"
            alt="#"
          />
        </div>
        <div className="shirts3">
          <img
            src="https://usastore.psg.fr/content/ws/all/73d20a78-194f-48a7-b916-3e468f79e850__534X594.png?w=534"
            alt="#"
          />
        </div>
      </div>
    </>
  );
};

export default Champhions;
