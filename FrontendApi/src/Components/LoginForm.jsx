import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../Redux/authSlice";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errore, setErrore] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrore("");

    try {
      const res = await fetch("http://localhost:7028/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Credenziali errate o errore server");
      }

      const data = await res.json();

      dispatch(loginSuccess({ token: data.token, user: data.user }));
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setErrore("Login fallito. Verifica le credenziali.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Email</label>
          <input
            className="form-control"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            className="form-control"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errore && <div className="alert alert-danger">{errore}</div>}
        <button className="btn btn-primary">Accedi</button>
      </form>
    </div>
  );
};

export default LoginForm;
