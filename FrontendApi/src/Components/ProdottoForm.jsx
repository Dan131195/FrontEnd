import { useState } from "react";
import { fetchWithAuth } from "../Utils/fetchWithAuth";

const ProdottoForm = () => {
  const [form, setForm] = useState({
    nome: "",
    tipo: "",
    dittaFornitrice: "",
    prodottoUso: "",
    codiceArmadietto: "",
    numeroCassetto: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetchWithAuth(
        "https://localhost:7028/api/farmacia/prodotto",
        "POST",
        form
      );

      alert("Prodotto creato con successo!");
      setForm({
        nome: "",
        tipo: "",
        dittaFornitrice: "",
        prodottoUso: "",
        codiceArmadietto: "",
        numeroCassetto: "",
      });
    } catch (err) {
      console.error("Errore:", err);
      alert("Errore nella creazione del prodotto.");
    }
  };

  return (
    <div className="card p-4">
      <h2 className="mb-3">Aggiungi Prodotto</h2>
      <form onSubmit={handleSubmit}>
        {Object.entries(form).map(([key, value]) => (
          <div className="mb-3" key={key}>
            <label className="form-label">{key}</label>
            <input
              type="text"
              name={key}
              className="form-control"
              value={value}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit" className="btn btn-success">
          <i class="bi bi-floppy me-1"></i>Salva
        </button>
      </form>
    </div>
  );
};

export default ProdottoForm;
