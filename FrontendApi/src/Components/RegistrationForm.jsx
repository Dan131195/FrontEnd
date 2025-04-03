import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../Utils/fetchWithAuth";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetchWithAuth(
        "https://localhost:7028/api/account/register",
        "POST",
        form
      );

      alert("✅ Registrazione completata con successo!");
      navigate("/login");
    } catch (err) {
      console.error("Errore:", err);
      alert("❌ Registrazione fallita: " + err.message);
    }
  };

  return (
    <div className="card p-4">
      <h3 className="mb-3">Registrati</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nome</label>
          <input
            type="text"
            name="firstName"
            className="form-control"
            value={form.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Cognome</label>
          <input
            type="text"
            name="lastName"
            className="form-control"
            value={form.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Registrati
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
