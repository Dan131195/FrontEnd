import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchWithAuth } from "../Utils/fetchWithAuth";

const VenditaInternaForm = ({ prodottoId, onClose }) => {
  const [form, setForm] = useState({
    animaleId: "",
    codiceFiscaleCliente: "",
    prodottoId: prodottoId,
    numeroRicetta: "",
    dataVendita: new Date().toISOString().slice(0, 10),
  });

  const [animali, setAnimali] = useState([]);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchAnimali = async () => {
      try {
        const data = await fetchWithAuth("https://localhost:7028/api/animale");
        setAnimali(data);
      } catch (err) {
        console.error("Errore nel caricamento animali:", err);
      }
    };

    fetchAnimali();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Se l'utente cambia animale, aggiorniamo anche il codice fiscale
    if (name === "animaleId") {
      const animaleSelezionato = animali.find((a) => a.animaleId === value);

      setForm((prev) => ({
        ...prev,
        animaleId: value,
        codiceFiscaleCliente:
          animaleSelezionato?.codiceFiscaleProprietario || "",
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
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
      alert("✅ Vendita interna registrata con successo!");
      setForm({
        animaleId: "",
        codiceFiscaleCliente: "",
        prodottoId: prodottoId,
        numeroRicetta: "",
        dataVendita: new Date().toISOString().slice(0, 10),
      });

      if (onClose) onClose();
    } catch (err) {
      console.error(err);
      alert("❌ Errore durante la registrazione della vendita interna.");
    }
  };

  return (
    <div className="p-4 mt-4">
      <h3 className="mb-3">Vendita Interna</h3>
      <form onSubmit={handleSubmit}>
        {/* 🔽 Select Animale */}
        <div className="mb-3">
          <label>Seleziona Animale</label>
          <select
            className="form-select"
            name="animaleId"
            value={form.animaleId}
            onChange={handleChange}
            required
          >
            <option value="">-- Seleziona un animale --</option>
            {animali.map((a) => (
              <option key={a.animaleId} value={a.animaleId}>
                {a.nomeAnimale} ({a.tipologia}) -{" "}
                {a.numeroMicrochip || "No chip"}
              </option>
            ))}
          </select>
        </div>

        {/* Codice fiscale (auto-compilato) */}
        <div className="mb-3">
          <label>Codice Fiscale Cliente</label>
          <input
            type="text"
            className="form-control"
            name="codiceFiscaleCliente"
            value={form.codiceFiscaleCliente}
            disabled
          />
        </div>

        <div className="mb-3">
          <label>ID Prodotto</label>
          <input
            type="text"
            className="form-control"
            name="prodottoId"
            value={form.prodottoId}
            disabled
          />
        </div>

        <div className="mb-3">
          <label>Numero Ricetta</label>
          <input
            type="text"
            className="form-control"
            name="numeroRicetta"
            value={form.numeroRicetta}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Data Vendita</label>
          <input
            type="date"
            className="form-control"
            name="dataVendita"
            value={form.dataVendita}
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn btn-success">Salva Vendita Interna</button>

        {onClose && (
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={onClose}
          >
            Annulla
          </button>
        )}
      </form>
    </div>
  );
};

export default VenditaInternaForm;
