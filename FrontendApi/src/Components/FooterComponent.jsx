import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const FooterComponent = () => {
  return (
    <footer className="bg-primary text-white py-4 mt-5">
      <Container className="d-flex flex-column flex-md-row justify-content-between align-items-center">
        <div className="mb-3 mb-md-0 text-center text-md-start">
          <h5 className="fw-bold">Clinica Veterinaria</h5>
          <p className="mb-0 small">Via degli Animali 12, Roma (RM)</p>
          <p className="mb-0 small">
            📞 +39 06 1234567 | ✉️ info@clinicavet.it
          </p>
        </div>

        <div className="text-center mb-3 mb-md-0">
          <Link to="/" className="text-white text-decoration-none me-3">
            Home
          </Link>
          <Link to="/contatti" className="text-white text-decoration-none me-3">
            Contatti
          </Link>
          <Link to="/servizi" className="text-white text-decoration-none">
            Servizi
          </Link>
        </div>

        <div className="text-center text-md-end">
          <p className="mb-1 small">Seguici sui social</p>
          <a href="#" className="text-white me-2" title="Facebook">
            <i className="bi bi-facebook fs-5"></i>
          </a>
          <a href="#" className="text-white me-2" title="Instagram">
            <i className="bi bi-instagram fs-5"></i>
          </a>
          <a href="#" className="text-white" title="WhatsApp">
            <i className="bi bi-whatsapp fs-5"></i>
          </a>
        </div>
      </Container>
    </footer>
  );
};

export default FooterComponent;
