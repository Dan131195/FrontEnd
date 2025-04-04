import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchWithAuth } from "../Utils/fetchWithAuth";

const VisitaForm = () => {
  const [form, setForm] = useState({
    dataVisita: new Date().toISOString().slice(0, 10),
    esameObiettivo: "",
    curaPrescritta: "",
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
        console.error("Errore nel caricamento degli animali:", err);
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
        "https://localhost:7028/api/visite",
        "POST",
        form,
        token
      );
      alert("✅ Visita registrata con successo!");
      setForm({
        dataVisita: new Date().toISOString().slice(0, 10),
        esameObiettivo: "",
        curaPrescritta: "",
        animaleId: "",
      });
    } catch (error) {
      console.error(error);
      alert("❌ Errore nella registrazione della visita.");
    }
  };

  return (
    <div className="card p-4">
      <h2 className="mb-3">Registra una Visita Veterinaria</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Data Visita</label>
          <input
            type="date"
            className="form-control"
            name="dataVisita"
            value={form.dataVisita}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Esame Obiettivo</label>
          <textarea
            className="form-control"
            name="esameObiettivo"
            value={form.esameObiettivo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Cura Prescritta</label>
          <textarea
            className="form-control"
            name="curaPrescritta"
            value={form.curaPrescritta}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Animale</label>
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
          Salva Visita
        </button>
      </form>
    </div>
  );
};

export default VisitaForm;
