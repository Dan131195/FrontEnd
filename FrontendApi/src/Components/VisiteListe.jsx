import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const VisiteList = () => {
  const [visite, setVisite] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVisite();
  }, []);

  const fetchVisite = async () => {
    try {
      const res = await fetch("https://localhost:7028/api/visite");
      if (!res.ok) throw new Error("Errore nel recupero delle visite");
      const data = await res.json();
      setVisite(data);
    } catch (err) {
      console.error("Errore nel recupero delle visite:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Sei sicuro di voler eliminare questa visita?")) return;

    try {
      const res = await fetch(`https://localhost:7028/api/visite/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Errore nella cancellazione");
      setVisite(visite.filter((v) => v.visitaId !== id));
    } catch (err) {
      console.error("Errore durante la cancellazione:", err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/visite/modifica/${id}`);
  };

  return (
    <div className="card p-4">
      <h3 className="mb-3">Elenco Visite Veterinarie</h3>
      {visite.length === 0 ? (
        <p>Nessuna visita registrata.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Data</th>
                <th>Esame Obiettivo</th>
                <th>Cura Prescritta</th>
                <th>ID Animale</th>
                <th>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {visite.map((v) => (
                <tr key={v.visitaId}>
                  <td>{new Date(v.dataVisita).toLocaleDateString()}</td>
                  <td>{v.esameObiettivo}</td>
                  <td>{v.curaPrescritta}</td>
                  <td>{v.animaleId}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(v.visitaId)}
                    >
                      Modifica
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(v.visitaId)}
                    >
                      Elimina
                    </button>
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

export default VisiteList;
