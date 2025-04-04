import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../Utils/fetchWithAuth";

const RicoveriAttiviList = () => {
  const [ricoveriConAnimali, setRicoveriConAnimali] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRicoveri();
  }, []);

  const fetchRicoveri = async () => {
    try {
      const ricoveriData = await fetchWithAuth(
        "https://localhost:7028/api/ricovero/attivi"
      );

      const enriched = await Promise.all(
        ricoveriData.map(async (r) => {
          if (r.animaleId) {
            try {
              const animale = await fetchWithAuth(
                `https://localhost:7028/api/animale/${r.animaleId}`
              );

              return { ...r, animale };
            } catch {
              return { ...r, animale: null };
            }
          }
          return { ...r, animale: null };
        })
      );

      setRicoveriConAnimali(enriched);
      console.log(enriched);
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
      {ricoveriConAnimali.length === 0 ? (
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
              {ricoveriConAnimali.map((r) => (
                <tr key={r.ricoveroId}>
                  {console.log(r.animaleId)}
                  <td>{new Date(r.dataInizio).toLocaleDateString()}</td>
                  <td>{r.descrizione}</td>
                  <td>{r.animale?.nomeAnimale || "-"}</td>
                  <td>{r.animale?.tipologia || "-"}</td>
                  <td>{r.numeroMicrochip || "No"}</td>
                  <td>
                    <div className="btn-group btn-group-sm">
                      <button
                        className="btn btn-success"
                        onClick={() => handleChiudiRicovero(r.ricoveroId)}
                      >
                        Chiudi
                      </button>
                      <button
                        className="btn btn-info"
                        onClick={() =>
                          navigate(`/ricovero/dettaglio/${r.ricoveroId}`)
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
