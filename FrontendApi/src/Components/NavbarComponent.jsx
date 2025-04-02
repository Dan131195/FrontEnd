import { Link } from "react-router-dom";

// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../redux/authSlice";

const NavbarComponent = () => {
  //   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  //   const dispatch = useDispatch();

  //   const handleLogout = () => {
  //     dispatch(logout());
  //   };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
      <Link className="navbar-brand" to="/">
        Clinica Veterinaria
      </Link>
      {/* {isAuthenticated ? (
        <button onClick={handleLogout} className="btn btn-outline-light ms-2">
          Logout
        </button>
      ) : (
        <Route path="/login" element={<LoginForm />} />
      )} */}
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
            <Link className="nav-link" to="/animali/list">
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
          <li className="nav-item">
            <Link className="nav-link" to="/vendite">
              Lista Vendite
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/ricoveri">
              Ricoveri Attivi
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarComponent;
