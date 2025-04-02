import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const RicoveroEditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ricovero, setRicovero] = useState(null);
  const [errore, setErrore] = useState("");

  useEffect(() => {
    const fetchRicovero = async () => {
      try {
        const res = await fetch(`https://localhost:7028/api/ricovero/${id}`);
        if (!res.ok) throw new Error("Errore nel recupero del ricovero");
        const data = await res.json();
        setRicovero(data);
      } catch (err) {
        setErrore(err.message);
      }
    };

    fetchRicovero();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRicovero((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://localhost:7028/api/ricovero/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ricovero),
      });

      if (!res.ok) throw new Error("Errore durante l'aggiornamento");
      alert("Ricovero aggiornato con successo!");
      navigate("/ricoveri");
    } catch (err) {
      console.error(err);
      setErrore("Errore durante l'aggiornamento del ricovero");
    }
  };

  if (!ricovero) return <p>Caricamento...</p>;

  return (
    <div className="card p-4">
      <h3 className="mb-3">Modifica Ricovero</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Data Inizio</label>
          <input
            type="datetime-local"
            className="form-control"
            name="dataInizio"
            value={ricovero.dataInizio?.slice(0, 16)} // ISO format
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
            value={ricovero.dataFine?.slice(0, 16)}
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
          <label>Animale</label>
          <input
            type="text"
            className="form-control"
            name="animaleId"
            value={ricovero.animaleId}
            onChange={handleChange}
            required
            disabled // opzionale: rimuovi se vuoi modificarlo
          />
        </div>

        {errore && <div className="alert alert-danger">{errore}</div>}

        <button type="submit" className="btn btn-primary">
          Salva modifiche
        </button>
      </form>
    </div>
  );
};

export default RicoveroEditForm;
