import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../Utils/fetchWithAuth";
import { useSelector } from "react-redux";

const RicoveriList = () => {
  const [ricoveri, setRicoveri] = useState([]);
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    fetchRicoveri();
  }, []);

  const fetchRicoveri = async () => {
    try {
      const data = await fetchWithAuth(
        "https://localhost:7028/api/ricovero/tutti",
        "GET",
        null,
        token
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
        { dataFine },
        token
      );
      alert("✅ Ricovero chiuso con successo.");
      fetchRicoveri();
    } catch (err) {
      console.error("Errore:", err);
      alert("❌ Impossibile chiudere il ricovero.");
    }
  };

  const handleAddRicovero = () => navigate("/ricovero/nuovo");
  const handleEditRicovero = (id) => navigate(`/ricovero/modifica/${id}`);
  const handleDettagliRicovero = (id) => navigate(`/ricovero/dettaglio/${id}`);

  const handleDeleteRicovero = async (id) => {
    if (!window.confirm("Sei sicuro di voler eliminare questo ricovero?"))
      return;
    try {
      await fetchWithAuth(
        `https://localhost:7028/api/ricovero/${id}`,
        "DELETE",
        null,
        token
      );
      setRicoveri((prev) => prev.filter((r) => r.ricoveroId !== id));
    } catch (err) {
      console.error("Errore durante l'eliminazione:", err);
    }
  };

  return (
    <div className="container py-4">
      <div className="card shadow-sm border-0">
        <div className="card-body myContainer">
          <h2 className="mb-4 text-primary">Ricoveri</h2>

          <button
            className="btn btn-outline-primary mb-4"
            onClick={handleAddRicovero}
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
                    <tr key={r.ricoveroId}>
                      <td>{new Date(r.dataInizio).toLocaleDateString()}</td>
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
                          new Date(r.dataFine).toLocaleDateString()
                        )}
                      </td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <button
                            className="btn btn-info"
                            onClick={() => handleDettagliRicovero(r.ricoveroId)}
                          >
                            <i className="bi bi-info-circle"></i>
                          </button>
                          <button
                            className="btn btn-warning"
                            onClick={() => handleEditRicovero(r.ricoveroId)}
                          >
                            <i className="bi bi-pencil-square"></i>
                          </button>
                          <button
                            className="btn btn-danger"
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
