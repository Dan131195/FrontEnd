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
      setRicoveri(data);
    } catch (err) {
      console.error("Errore nel recupero dei ricoveri:", err);
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
      const res = await fetch(`https://localhost:7028/api/ricoveri/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Errore durante l'eliminazione");

      setRicoveri((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error("Errore durante l'eliminazione del ricovero:", err);
    }
  };

  return (
    <div className="card p-4">
      <h3 className="mb-3">Ricoveri</h3>
      <button
        className="btn btn-primary btn-sm my-2"
        onClick={() => handleAddRicovero()}
      >
        Aggiungi Ricovero
      </button>
      {ricoveri.length === 0 ? (
        <p>Nessun ricovero nel registro.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Data Inizio</th>
                <th>Descrizione</th>
                <th>Tipologia</th>
                <th>Colore Mantello</th>
                <th>Microchip</th>
                <th>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {ricoveri.map((r) => (
                <tr key={r.id}>
                  <td>{new Date(r.dataInizio).toLocaleDateString()}</td>
                  <td>{r.descrizione}</td>
                  <td>{r.tipologia || "-"}</td>
                  <td>{r.coloreMantello || "-"}</td>
                  <td>{r.numeroMicrochip || "No"}</td>
                  <td>
                    <div className="d-flex justify-content-between align-items-center">
                      <button
                        className="btn btn-info btn-sm me-2"
                        onClick={() => handleDettagliRicovero(r.ricoveroId)}
                      >
                        <i className="bi bi-info-circle"></i>
                      </button>

                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEditRicovero(r.ricoveroId)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
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
  );
};

export default RicoveriList;
