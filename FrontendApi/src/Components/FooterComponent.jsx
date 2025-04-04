import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const FooterComponent = () => {
  return (
    <footer className=" text-white py-4 mt-5">
      <Container>
        <div className="row align-items-center">
          <div className="col-12 col-md-4 mb-3 mb-md-0 text-center text-md-start">
            <h5 className="fw-bold">Clinica Veterinaria</h5>
            <p className="mb-0 small">Via degli Animali 12, Roma (RM)</p>
            <p className="mb-0 small">
              <i class="bi bi-telephone me-1"></i>+39 06 1234567 |{" "}
              <i class="bi bi-envelope me-1"></i>
              info@clinicavet.it
            </p>
          </div>

          <div className="col-12 col-md-4 text-center mb-3 mb-md-0">
            <Link to="/" className="text-white text-decoration-none me-3">
              Home
            </Link>
            <Link
              to="/contatti"
              className="text-white text-decoration-none me-3"
            >
              Contatti
            </Link>
            <Link to="/servizi" className="text-white text-decoration-none">
              Servizi
            </Link>
          </div>

          <div className="col-12 col-md-4 text-center text-md-end">
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
        </div>
      </Container>
    </footer>
  );
};

export default FooterComponent;
