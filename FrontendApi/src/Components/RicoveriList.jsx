import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RicoveriList = () => {
  const [ricoveri, setRicoveri] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRicoveri();
  }, []);

  const fetchRicoveri = async () => {
    try {
      const res = await fetch("https://localhost:7028/api/ricovero/tutti");
      if (!res.ok) throw new Error("Errore nel recupero dei ricoveri");
      const data = await res.json();
      console.log(data);
      setRicoveri(data);
    } catch (err) {
      console.error("Errore nel recupero dei ricoveri:", err);
    }
  };

  const handleChiudiRicovero = async (id) => {
    // Chiedi all'utente la data di fine, default = oggi
    const dataFine = prompt(
      "Inserisci la data di fine (YYYY-MM-DD):",
      new Date().toISOString().split("T")[0]
    );

    if (!dataFine) return; // Se annulla, esci

    try {
      const res = await fetch(
        `https://localhost:7028/api/ricovero/${id}/chiudi`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          // Converte in formato ISO e manda come stringa JSON pura
          body: JSON.stringify(new Date(dataFine).toISOString()),
        }
      );

      if (!res.ok) throw new Error("Errore nella chiusura del ricovero");

      alert("✅ Ricovero chiuso con successo.");
      fetchRicoveri(); // aggiorna la lista dopo la chiusura
    } catch (err) {
      console.error("Errore:", err);
      alert("❌ Impossibile chiudere il ricovero.");
    }
  };

  const handleAddRicovero = () => {
    navigate(`/ricovero/nuovo`);
  };

  const handleDettagliRicovero = (id) => {
    navigate(`/ricovero/dettaglio/${id}`);
  };

  const handleEditRicovero = (id) => {
    navigate(`/ricovero/modifica/${id}`);
  };

  const handleDeleteRicovero = async (id) => {
    if (!window.confirm("Sei sicuro di voler eliminare questo ricovero?"))
      return;

    try {
      const res = await fetch(`https://localhost:7028/api/ricovero/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Errore durante l'eliminazione");

      setRicoveri((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error("Errore durante l'eliminazione del ricovero:", err);
    }
  };

  return (
    <div className="container py-4">
      <div className="card shadow-sm border-0">
        <div className="card-body myContainer">
          <h2 className="mb-4 text-primary">Ricoveri</h2>

          <button
            className="btn btn-outline-primary mb-4"
            onClick={() => handleAddRicovero()}
          >
            <i className="bi bi-plus-circle me-2"></i>Aggiungi Ricovero
          </button>

          {ricoveri.length === 0 ? (
            <div className="alert alert-info">
              Nessun ricovero nel registro.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-primary">
                  <tr>
                    <th>Data Inizio</th>
                    <th>Descrizione</th>
                    <th>Tipologia</th>
                    <th>Mantello</th>
                    <th>Microchip</th>
                    <th>Chiusura Ricovero</th>
                    <th>Azioni</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {ricoveri.map((r) => (
                    <tr key={r.id}>
                      <td>{new Date(r.dataFine).toLocaleDateString()}</td>
                      <td>{r.descrizione}</td>
                      <td>{r.tipologia || "-"}</td>
                      <td>{r.coloreMantello || "-"}</td>
                      <td>{r.numeroMicrochip || "No"}</td>
                      <td>
                        {r.dataFine == null ? (
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => handleChiudiRicovero(r.ricoveroId)}
                          >
                            Chiudi Ricovero
                          </button>
                        ) : (
                          r.dataFine
                        )}
                      </td>
                      <td>
                        <div className="btn-group" role="group">
                          <button
                            className="btn btn-sm btn-info"
                            title="Dettagli"
                            onClick={() => handleDettagliRicovero(r.ricoveroId)}
                          >
                            <i className="bi bi-info-circle"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-warning"
                            title="Modifica"
                            onClick={() => handleEditRicovero(r.ricoveroId)}
                          >
                            <i className="bi bi-pencil-square"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            title="Elimina"
                            onClick={() => handleDeleteRicovero(r.ricoveroId)}
                          >
                            <i className="bi bi-trash"></i>
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
      </div>
    </div>
  );
};

export default RicoveriList;
