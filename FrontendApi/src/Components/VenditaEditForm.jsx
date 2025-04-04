import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchWithAuth } from "../Utils/fetchWithAuth";

const VenditaEditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const [form, setForm] = useState({
    animaleId: "",
    codiceFiscaleCliente: "",
    prodottoId: "",
    numeroRicetta: "",
    dataVendita: "",
  });

  useEffect(() => {
    const fetchVendita = async () => {
      try {
        const data = await fetchWithAuth(
          `https://localhost:7028/api/farmacia/Vendita/${id}`,
          "GET",
          null,
          token
        );
        setForm({
          animaleId: data.animaleId,
          codiceFiscaleCliente: data.codiceFiscaleCliente,
          prodottoId: data.prodottoId,
          numeroRicetta: data.numeroRicetta || "",
          dataVendita: data.dataVendita?.slice(0, 10) || "",
        });
      } catch (err) {
        console.error("Errore nel caricamento della vendita:", err);
      }
    };

    fetchVendita();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetchWithAuth(
        `https://localhost:7028/api/farmacia/Vendita/${id}`,
        "PUT",
        form,
        token
      );
      alert("✅ Vendita aggiornata con successo!");
      navigate("/vendite-interne");
    } catch (err) {
      console.error("Errore nell'aggiornamento della vendita:", err);
      alert("❌ Errore durante l'aggiornamento.");
    }
  };

  return (
    <div className="card p-4">
      <h2 className="mb-3">Modifica Vendita Farmacia</h2>
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

        <button type="submit" className="btn btn-primary">
          Salva Modifiche
        </button>
      </form>
    </div>
  );
};

export default VenditaEditForm;
