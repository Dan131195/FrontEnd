import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Redux/authSlice";
import { useNavigate } from "react-router-dom";

const NavbarComponent = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRole = localStorage.getItem("ruolo");

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("ruolo");
    localStorage.removeItem("nome");
    localStorage.removeItem("email");
    navigate("/");
  };

  return (
    <div className="container-fluid myNav">
      <Container className="">
        <nav className="navbar navbar-expand-lg">
          <Link className="navbar-brand text-white" to="/">
            <img
              src="../src/assets/img/logo.jpg"
              alt="Logo"
              className="logoClinica me-2"
            />
          </Link>

          <button
            className="navbar-toggler text-white border border-light"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <i className="bi bi-list"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="d-flex justify-content-between align-items-center w-100">
              {isAuthenticated ? (
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/animali/list">
                      <i class="bi bi-journal-medical me-1"></i>Animali
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white mx-md-3" to="/visite">
                      <i className="bi bi-clipboard2-pulse me-1"></i>Visite
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/ricoveri">
                      <i class="bi bi-hospital me-1"></i>Ricoveri
                    </Link>
                  </li>
                </ul>
              ) : (
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link
                      className="nav-link text-white"
                      to="/ricerca/microchip"
                    >
                      Ricerca Animale
                    </Link>
                  </li>
                </ul>
              )}

              <ul className="navbar-nav ms-auto">
                {!isAuthenticated ? (
                  <>
                    <li className="nav-item">
                      <Link
                        className="btn btn-outline-light loginBtn"
                        to="/login"
                      >
                        Login
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item me-md-3">
                      <Link className="nav-link text-white" to="/prodotti">
                        <i class="bi bi-capsule-pill me-1"></i>Farmacia
                      </Link>
                    </li>

                    {userRole === "Veterinario" && (
                      <li className="nav-item">
                        <Link className="nav-link" to="/registrati">
                          Registra
                        </Link>
                      </li>
                    )}
                    <li className="nav-item">
                      <button
                        className="btn btn-outline-light loginBtn"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </Container>
    </div>
  );
};

export default NavbarComponent;
