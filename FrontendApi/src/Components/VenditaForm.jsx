import { useState } from "react";
import { useSelector } from "react-redux";
import { fetchWithAuth } from "../Utils/fetchWithAuth";

const VenditaForm = () => {
  const [form, setForm] = useState({
    animaleId: "",
    codiceFiscaleCliente: "",
    prodottoId: "",
    numeroRicetta: "",
    dataVendita: new Date().toISOString().slice(0, 10),
  });

  const token = useSelector((state) => state.auth.token);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetchWithAuth(
        "https://localhost:7028/api/farmacia/vendita",
        "POST",
        form,
        token
      );

      alert("Vendita registrata con successo!");
      setForm({
        animaleId: "",
        codiceFiscaleCliente: "",
        prodottoId: "",
        numeroRicetta: "",
        dataVendita: new Date().toISOString().slice(0, 10),
      });
    } catch (error) {
      console.error(error);
      alert("Errore durante la registrazione della vendita.");
    }
  };

  return (
    <div className="card p-4">
      <h3 className="mb-3">Registra una Vendita Farmacia</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">ID Animale</label>
          <input
            type="text"
            className="form-control"
            name="animaleId"
            value={form.animaleId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Codice Fiscale Cliente</label>
          <input
            type="text"
            className="form-control"
            name="codiceFiscaleCliente"
            value={form.codiceFiscaleCliente}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">ID Prodotto</label>
          <input
            type="text"
            className="form-control"
            name="prodottoId"
            value={form.prodottoId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Numero Ricetta (opzionale)</label>
          <input
            type="text"
            className="form-control"
            name="numeroRicetta"
            value={form.numeroRicetta}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Data Vendita</label>
          <input
            type="date"
            className="form-control"
            name="dataVendita"
            value={form.dataVendita}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-success">
          Salva Vendita
        </button>
      </form>
    </div>
  );
};

export default VenditaForm;
