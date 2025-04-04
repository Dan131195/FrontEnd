import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../Utils/fetchWithAuth";

const RicoveriAttiviList = () => {
  const [ricoveri, setRicoveri] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRicoveri();
  }, []);

  const fetchRicoveri = async () => {
    try {
      const data = await fetchWithAuth(
        "https://localhost:7028/api/ricovero/attivi"
      );
      setRicoveri(data);
    } catch (err) {
      console.error("Errore nel recupero dei ricoveri:", err);
    }
  };

  const handleChiudiRicovero = async (id) => {
    const dataFine = prompt(
      "Inserisci la data di fine (YYYY-MM-DD):",
      new Date().toISOString().split("T")[0]
    );
    if (!dataFine) return;

    try {
      await fetchWithAuth(
        `https://localhost:7028/api/ricovero/${id}/chiudi`,
        "PATCH",
        { dataFine }
      );
      alert("✅ Ricovero chiuso con successo.");
      fetchRicoveri();
    } catch (err) {
      console.error("Errore:", err);
      alert("❌ Impossibile chiudere il ricovero.");
    }
  };

  return (
    <div className="card p-4">
      <h2 className="mb-3">Ricoveri Attivi</h2>
      {ricoveri.length === 0 ? (
        <p>Nessun ricovero attivo.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>Data Inizio</th>
                <th>Descrizione</th>
                <th>Animale</th>
                <th>Tipologia</th>
                <th>Microchip</th>
                <th>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {ricoveri.map((r) => (
                <tr key={r.id}>
                  <td>{new Date(r.dataInizio).toLocaleDateString()}</td>
                  <td>{r.descrizione}</td>
                  <td>{r.animale?.nomeAnimale || "-"}</td>
                  <td>{r.animale?.tipologia || "-"}</td>
                  <td>{r.animale?.numeroMicrochip || "No"}</td>
                  <td>
                    <div className="btn-group btn-group-sm">
                      <button
                        className="btn btn-success"
                        onClick={() => handleChiudiRicovero(r.id)}
                      >
                        Chiudi
                      </button>
                      <button
                        className="btn btn-info"
                        onClick={() =>
                          navigate(`/animali/dettaglio/${r.animale?.id}`)
                        }
                      >
                        Dettagli
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RicoveriAttiviList;
