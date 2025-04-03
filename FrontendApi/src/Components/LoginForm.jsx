import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../Redux/authSlice";
import { useNavigate } from "react-router-dom";

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
      console.log(data.token);

      // Salvo il token nel localStorage
      localStorage.setItem("token", data.token);

      // Lo salvo anche in Redux
      dispatch(loginSuccess(data.token));

      // Reindirizzo l'utente
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Credenziali non valide");
    }
  };

  return (
    <div className="card p-4">
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
        <button className="btn btn-primary">Accedi</button>
      </form>
    </div>
  );
};

export default LoginForm;
