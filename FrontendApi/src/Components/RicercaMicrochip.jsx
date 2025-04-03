import { useState } from "react";
import { useSelector } from "react-redux";
import { fetchWithAuth } from "../Utils/fetchWithAuth";

const RicercaMicrochip = () => {
  const [microchip, setMicrochip] = useState("");
  const [risultato, setRisultato] = useState(null);
  const [errore, setErrore] = useState("");
  const token = useSelector((state) => state.auth.token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrore("");
    setRisultato(null);

    try {
      const data = await fetchWithAuth(
        `https://localhost:7028/api/ricovero/ricerca-microchip/${microchip}`,
        "GET",
        null,
        token
      );
      setRisultato(data);
    } catch {
      setErrore("⚠️ Microchip non trovato o errore nella ricerca.");
    }
  };

  return (
    <div className="card p-4 mt-4 w-50 m-auto">
      <h3 className="mb-3">🔍 Cerca Microchip</h3>

      <form onSubmit={handleSubmit} className="mb-3">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Inserisci numero microchip"
            value={microchip}
            onChange={(e) => setMicrochip(e.target.value)}
            required
          />
          <button className="btn btn-primary" type="submit">
            Cerca
          </button>
        </div>
      </form>

      {errore && <div className="alert alert-danger">{errore}</div>}

      {risultato && (
        <div className="alert alert-success">
          <h5 className="mb-3">✅ Animale trovato</h5>
          <p>
            <strong>Presente:</strong> {risultato.presente ? "Sì" : "No"}
          </p>
          <p>
            <strong>Tipologia:</strong> {risultato.tipologia}
          </p>
          <p>
            <strong>Colore:</strong> {risultato.colore}
          </p>
          <p>
            <strong>Descrizione:</strong> {risultato.descrizione}
          </p>
        </div>
      )}
    </div>
  );
};

export default RicercaMicrochip;
