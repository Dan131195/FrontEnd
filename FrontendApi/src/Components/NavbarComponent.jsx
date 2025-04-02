import { Link } from "react-router-dom";

const NavbarComponent = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
      <Link className="navbar-brand" to="/">
        Clinica Veterinaria
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Animali
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/animali/nuovo">
              Registra Animale
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/visite/nuova">
              Visita
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/vendite/nuova">
              Vendita Farmacia
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarComponent;
