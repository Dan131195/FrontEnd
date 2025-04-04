import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchWithAuth } from "../Utils/fetchWithAuth";

const RicoveroForm = () => {
  const [form, setForm] = useState({
    dataInizio: new Date().toISOString().split("T")[0],
    descrizione: "",
    animaleId: "",
  });

  const [animali, setAnimali] = useState([]);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchAnimali = async () => {
      try {
        const data = await fetchWithAuth(
          "https://localhost:7028/api/animale",
          "GET",
          null,
          token
        );
        setAnimali(data);
      } catch (err) {
        console.error("Errore nel recupero degli animali:", err);
      }
    };

    fetchAnimali();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetchWithAuth(
        "https://localhost:7028/api/ricovero",
        "POST",
        form,
        token
      );

      alert("✅ Ricovero registrato con successo!");
      setForm({
        dataInizio: new Date().toISOString().split("T")[0],
        descrizione: "",
        animaleId: "",
      });
    } catch (err) {
      console.error("Errore:", err);
      alert("❌ Errore nella registrazione del ricovero.");
    }
  };

  return (
    <div className="card p-4">
      <h2 className="mb-3">Registra un Ricovero</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Data Inizio</label>
          <input
            type="date"
            className="form-control"
            name="dataInizio"
            value={form.dataInizio}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Descrizione</label>
          <textarea
            className="form-control"
            name="descrizione"
            value={form.descrizione}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Animale</label>
          <select
            className="form-select"
            name="animaleId"
            value={form.animaleId}
            onChange={handleChange}
            required
          >
            <option value="">Seleziona un animale...</option>
            {animali.map((a) => (
              <option key={a.animaleId} value={a.animaleId}>
                {a.nomeAnimale} ({a.tipologia})
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Salva Ricovero
        </button>
      </form>
    </div>
  );
};

export default RicoveroForm;
