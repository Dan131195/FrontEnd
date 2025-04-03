import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/authSlice";

const NavbarComponent = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container-fluid bg-primary">
      <Container className="bg-primary">
        <nav className="navbar navbar-expand-lg bg-primary">
          <Link className="navbar-brand text-white" to="/">
            <img
              src="../src/assets/img/logo.jpg"
              alt="Logo"
              className="logoClinica me-2"
            />
            ClinicaVet
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
            <div className="d-flex justify-content-between align-items-center w-100">
              <div>
                <ul className="navbar-nav ms-auto text-white">
                  <li className="nav-item">
                    <Link className="nav-link" to="/animali/list">
                      Registro Animali
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/visite">
                      Registro Visite
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/ricoveri">
                      Registro Ricoveri
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/prodotti">
                      Farmacia
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="navbar-nav ms-auto">
                  {isAuthenticated ? (
                    <li className="nav-item">
                      <button
                        onClick={handleLogout}
                        className="btn btn-outline-light ms-2"
                      >
                        Logout
                      </button>
                    </li>
                  ) : (
                    <li className="nav-item">
                      <Link className="nav-link text-white" to="/login">
                        Login
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </Container>
    </div>
  );
};

export default NavbarComponent;
