import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchWithAuth } from "../Utils/fetchWithAuth";

const RicoveroEditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ricovero, setRicovero] = useState(null);
  const [errore, setErrore] = useState("");
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchRicovero = async () => {
      try {
        const data = await fetchWithAuth(
          `https://localhost:7028/api/ricovero/${id}`,
          "GET",
          null,
          token
        );
        setRicovero(data);
      } catch (err) {
        setErrore(err.message);
      }
    };

    fetchRicovero();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRicovero((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetchWithAuth(
        `https://localhost:7028/api/ricovero/${id}`,
        "PUT",
        ricovero,
        token
      );
      alert("✅ Ricovero aggiornato con successo!");
      navigate("/ricoveri");
    } catch (err) {
      console.error(err);
      setErrore("❌ Errore durante l'aggiornamento del ricovero.");
    }
  };

  if (!ricovero) return <p>Caricamento in corso...</p>;

  return (
    <div className="card p-4">
      <h2 className="mb-3">Modifica Ricovero</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Data Inizio</label>
          <input
            type="datetime-local"
            className="form-control"
            name="dataInizio"
            value={ricovero.dataInizio?.slice(0, 16)}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Data Fine</label>
          <input
            type="datetime-local"
            className="form-control"
            name="dataFine"
            value={ricovero.dataFine?.slice(0, 16) || ""}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Tipologia</label>
          <input
            type="text"
            className="form-control"
            name="tipologia"
            value={ricovero.tipologia}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Colore Mantello</label>
          <input
            type="text"
            className="form-control"
            name="coloreMantello"
            value={ricovero.coloreMantello}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-check form-switch mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="microchipPresente"
            name="microchipPresente"
            checked={ricovero.microchipPresente}
            onChange={(e) =>
              setRicovero({
                ...ricovero,
                microchipPresente: e.target.checked,
                numeroMicrochip: e.target.checked
                  ? ricovero.numeroMicrochip
                  : "",
              })
            }
          />
          <label className="form-check-label" htmlFor="microchipPresente">
            Microchip Presente
          </label>
        </div>

        {ricovero.microchipPresente && (
          <div className="mb-3">
            <label>Numero Microchip</label>
            <input
              type="text"
              className="form-control"
              name="numeroMicrochip"
              value={ricovero.numeroMicrochip}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="mb-3">
          <label>Descrizione</label>
          <textarea
            className="form-control"
            name="descrizione"
            value={ricovero.descrizione}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>ID Animale</label>
          <input
            type="text"
            className="form-control"
            name="animaleId"
            value={ricovero.animaleId}
            onChange={handleChange}
            disabled
          />
        </div>

        {errore && <div className="alert alert-danger">{errore}</div>}

        <button type="submit" className="btn btn-primary">
          💾 Salva modifiche
        </button>
      </form>
    </div>
  );
};

export default RicoveroEditForm;
