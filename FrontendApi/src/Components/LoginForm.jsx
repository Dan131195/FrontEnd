import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../Redux/authSlice";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const LoginForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://localhost:7028/api/account/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Login fallito");

      const data = await res.json();
      const token = data.token;

      // 🔍 Decodifica il token per ottenere info utente
      const decoded = jwtDecode(token);

      const ruolo =
        decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      const nome =
        decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
      const email =
        decoded[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
        ];

      console.log("Ruolo:", ruolo);
      console.log("Nome:", nome);

      // ✅ Salvo token e info utente in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("ruolo", ruolo);
      localStorage.setItem("nome", nome);
      localStorage.setItem("email", email);

      // ✅ Salvo anche in Redux
      dispatch(
        loginSuccess({
          token,
          user: {
            ruolo,
            nome,
            email,
          },
        })
      );

      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Credenziali non valide");
    }
  };

  return (
    <div className="myContainer p-4 w-50 m-auto">
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email:</label>
          <input
            name="email"
            type="email"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password:</label>
          <input
            name="password"
            type="password"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <button className="btn btn-primary">
          <i class="bi bi-box-arrow-in-right me-1"></i>Accedi
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
