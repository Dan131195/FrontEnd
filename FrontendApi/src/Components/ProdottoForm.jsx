import { useState } from "react";

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
      const res = await fetch("https://localhost:7028/api/farmacia/prodotto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Errore durante la creazione del prodotto");
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
      <h3 className="mb-3">Aggiungi Prodotto</h3>
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
        <button type="submit" className="btn btn-primary">
          Salva
        </button>
      </form>
    </div>
  );
};

export default ProdottoForm;
