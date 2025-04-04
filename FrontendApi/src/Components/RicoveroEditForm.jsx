import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchWithAuth } from "../Utils/fetchWithAuth";

const RicoveroEditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const [ricovero, setRicovero] = useState(null);
  const [errore, setErrore] = useState("");
  const [animali, setAnimali] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [ricoveroData, animaliData] = await Promise.all([
          fetchWithAuth(
            `https://localhost:7028/api/ricovero/${id}`,
            "GET",
            null,
            token
          ),
          fetchWithAuth(
            `https://localhost:7028/api/animale`,
            "GET",
            null,
            token
          ),
        ]);
        setRicovero(ricoveroData);
        setAnimali(animaliData);
      } catch (err) {
        console.log(err);
        setErrore("Errore nel caricamento dei dati.");
      }
    };

    fetchAll();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "animaleId") {
      if (value === "") {
        // Inserimento manuale
        setRicovero((prev) => ({
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
          setRicovero((prev) => ({
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
      setRicovero((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
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

  const isManual = ricovero.animaleId === "";

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
          <label>Animale registrato</label>
          <select
            className="form-select"
            name="animaleId"
            value={ricovero.animaleId || ""}
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
            value={ricovero.tipologia}
            onChange={handleChange}
            required
            readOnly={!isManual}
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
            readOnly={!isManual}
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
              handleChange({
                target: {
                  name: "microchipPresente",
                  type: "checkbox",
                  checked: e.target.checked,
                },
              })
            }
            disabled={!isManual}
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
              value={ricovero.numeroMicrochip || ""}
              onChange={handleChange}
              required
              readOnly={!isManual}
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

        {errore && <div className="alert alert-danger">{errore}</div>}

        <button type="submit" className="btn btn-success">
          <i class="bi bi-floppy me-1"></i> Salva modifiche
        </button>
        <button
          type="submit"
          className="btn btn-dark"
          onClick={navigate("/ricoveri")}
        >
          <i class="bi bi-arrow-left-circle me-1"></i> Indietro
        </button>
      </form>
    </div>
  );
};

export default RicoveroEditForm;
