import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchWithAuth } from "../Utils/fetchWithAuth";
import { useNavigate } from "react-router-dom";

const RicoveroForm = () => {
  const token = useSelector((state) => state.auth.token);
  const [animali, setAnimali] = useState([]);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    dataInizio: new Date().toISOString().split("T")[0],
    descrizione: "",
    animaleId: "",
    tipologia: "",
    coloreMantello: "",
    microchipPresente: false,
    numeroMicrochip: "",
  });

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
    const { name, value, type, checked } = e.target;

    if (name === "animaleId") {
      if (value === "") {
        // Nessun animale selezionato → inserimento manuale
        setForm((prev) => ({
          ...prev,
          animaleId: "",
          tipologia: "",
          coloreMantello: "",
          microchipPresente: false,
          numeroMicrochip: "",
        }));
      } else {
        const selected = animali.find((a) => a.animaleId === value);
        if (selected) {
          setForm((prev) => ({
            ...prev,
            animaleId: selected.animaleId,
            tipologia: selected.tipologia,
            coloreMantello: selected.coloreMantello,
            microchipPresente: selected.microchipPresente,
            numeroMicrochip: selected.numeroMicrochip,
          }));
        }
      }
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
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
        tipologia: "",
        coloreMantello: "",
        microchipPresente: false,
        numeroMicrochip: "",
      });
      navigate("/ricoveri");
    } catch (err) {
      console.error("Errore:", err);
      alert("❌ Errore nella registrazione del ricovero.");
    }
  };

  const isManual = form.animaleId === "";

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
          <label>Animale registrato</label>
          <select
            className="form-select"
            name="animaleId"
            value={form.animaleId}
            onChange={handleChange}
          >
            <option value="">-- Inserimento manuale --</option>
            {animali.map((a) => (
              <option key={a.animaleId} value={a.animaleId}>
                {a.nomeAnimale} ({a.tipologia})
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Tipologia</label>
          <input
            type="text"
            className="form-control"
            name="tipologia"
            value={form.tipologia}
            onChange={handleChange}
            required
            disabled={!isManual}
          />
        </div>

        <div className="mb-3">
          <label>Colore Mantello</label>
          <input
            type="text"
            className="form-control"
            name="coloreMantello"
            value={form.coloreMantello}
            onChange={handleChange}
            required
            disabled={!isManual}
          />
        </div>

        <div className="mb-3">
          <label className="form-label me-3">Microchip presente?</label>
          <input
            type="checkbox"
            name="microchipPresente"
            className="form-check-input"
            checked={form.microchipPresente}
            onChange={handleChange}
            disabled={!isManual}
          />
        </div>

        <div className="mb-3">
          <label>Numero Microchip</label>
          <input
            type="text"
            className="form-control"
            name="numeroMicrochip"
            value={form.numeroMicrochip || ""}
            onChange={handleChange}
            disabled={!isManual}
          />
        </div>

        <button type="submit" className="btn btn-success">
          <i class="bi bi-floppy me-1"></i>Salva Ricovero
        </button>
        <button
          type="submit"
          className="btn btn-dark"
          onClick={() => navigate("/ricoveri")}
        >
          <i class="bi bi-arrow-left-circle me-1"></i> Indietro
        </button>
      </form>
    </div>
  );
};

export default RicoveroForm;
