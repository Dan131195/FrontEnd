/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchWithAuth } from "../Utils/fetchWithAuth";
import medRecord from "../assets/img/recordd.jpg";

const VisiteList = () => {
  const [visite, setVisite] = useState([]);
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const userRole = localStorage.getItem("ruolo");

  useEffect(() => {
    fetchVisite();
  }, []);

  const fetchVisite = async () => {
    try {
      const data = await fetchWithAuth(
        "https://localhost:7028/api/visite",
        "GET",
        null,
        token
      );
      setVisite(data);
    } catch (err) {
      console.error("Errore nel recupero delle visite:", err);
    }
  };

  const handleDeleteVisita = async (id) => {
    if (!window.confirm("Sei sicuro di voler eliminare questa visita?")) return;

    try {
      await fetchWithAuth(
        `https://localhost:7028/api/visite/${id}`,
        "DELETE",
        null,
        token
      );
      setVisite((prev) => prev.filter((v) => v.visitaId !== id));
    } catch (err) {
      console.error("Errore durante la cancellazione:", err);
    }
  };

  const handleEditVisita = (id) => {
    navigate(`/visite/modifica/${id}`);
  };

  return (
    <div className="py-4">
      <div className="myContainer shadow-sm border-0 p-3">
        <div className="card-body ">
          <div className="d-flex justify-content-between">
            <div>
              <h2 className="mb-4">Elenco Visite Veterinarie</h2>

              <Link className="btn btn-outline-primary mb-4" to="/visite/nuova">
                <i className="bi bi-plus-circle me-2"></i>Aggiungi una visita
              </Link>
            </div>
            <img
              src={medRecord}
              alt="Medical record"
              id="medRecord"
              className="me-5"
            />
          </div>

          {visite.length === 0 ? (
            <div className="alert alert-info">Nessuna visita registrata.</div>
          ) : (
            <div className="table-responsive my-2">
              <table className="table table-hover align-middle table-striped">
                <thead className="table-primary">
                  <tr>
                    <th>Data</th>
                    <th>Esame Obiettivo</th>
                    <th>Cura Prescritta</th>
                    <th>ID Animale</th>
                    {userRole === "Veterinario" && <th>Azioni</th>}
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {visite.map((v) => (
                    <tr key={v.visitaId}>
                      <td>{new Date(v.dataVisita).toLocaleDateString()}</td>
                      <td>{v.esameObiettivo}</td>
                      <td>{v.curaPrescritta}</td>
                      <td>{v.animaleId}</td>
                      {userRole == "Veterinario" && (
                        <td>
                          <div className="btn-group" role="group">
                            <button
                              className="btn btn-sm btn-warning"
                              title="Modifica"
                              onClick={() => handleEditVisita(v.visitaId)}
                            >
                              <i className="bi bi-pencil-square"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-danger"
                              title="Elimina"
                              onClick={() => handleDeleteVisita(v.visitaId)}
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </td>
                      )}
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

export default VisiteList;
