import React from 'react';

const Footer = () => {
  return (
    <div className="footer">
      <img
        src="https://usastore.psg.fr/content/ws/all/aa2e0284-f6d1-4135-a9b6-87b9f4cc2f30__1600X287.png?w=1600"
        alt="Banner Footer"
      />

      <section className="footer-section">
        <div className="footer-row">
          {/* Columna 1 */}
          <div className="footer-col">
            <h4>Atención al cliente</h4>
            <ul className="enlaces">
              <li><a href="#">Tarjeta de regalo</a></li>
              <li><a href="#">Ayuda</a></li>
              <li><a href="#">Localizador de envíos</a></li>
              <li><a href="#">Guía de tallas</a></li>
              <li><a href="#">Contacto</a></li>
            </ul>
          </div>

          {/* Columna 2 */}
          <div className="footer-col">
            <h4>Seguridad online</h4>
            <ul className="enlaces">
              <li><a href="#">Compra segura</a></li>
              <li><a href="#">Envío y entrega</a></li>
              <li><a href="#">Plazo de devolución de 90 días</a></li>
            </ul>
          </div>

          {/* Columna 3 */}
          <div className="footer-col">
            <h4>Centro de Ayuda</h4>
            <ul className="enlaces">
              <li><a href="#">Políticas de Cambios y Devoluciones</a></li>
              <li><a href="#">Política de privacidad</a></li>
              <li><a href="#">Preguntas Frecuentes</a></li>
              <li><a href="#">Términos y Condiciones</a></li>
              <li><a href="#">Contacto</a></li>
            </ul>
          </div>

          {/* Columna 4 */}
          <div className="footer-col">
            <h4>Botón de arrepentimiento</h4>
            <p>
              Ingresa tu correo para la solicitud de cancelación de compra y te contactaremos
            </p>
            <form action="#">
              <input type="text" placeholder="Tu correo electrónico" required />
              <button type="submit">ENVIAR</button>
            </form>
            <div className="iconos">
              <i className="fa-brands fa-facebook-f"></i>
              <i className="fa-brands fa-x-twitter"></i>
              <i className="fa-brands fa-instagram"></i>
              <i className="fa-brands fa-youtube"></i>
              <i className="fa-brands fa-tiktok"></i>
              <i className="fa-brands fa-snapchat"></i>
              <i className="fa-brands fa-threads"></i>
            </div>
          </div>
        </div>

        {/* Sección Legal */}
        <div className="footer-legal">
          <ul>
            <li><a href="#">Política de privacidad</a></li>
            <li><a href="#">Términos y condiciones</a></li>
            <li><a href="#">Mapa del sitio</a></li>
            <li><a href="#">Política y gestión de cookies</a></li>
            <li><a href="#">Inquietudes sobre el producto</a></li>
          </ul>
          <p>
            © 2025, Fanatics, LLC. y/o sus entidades afiliadas. Reservados todos los derechos.
            Ninguna parte de este sitio puede ser reproducida o duplicada sin el permiso expreso de Fanatics.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Footer;
