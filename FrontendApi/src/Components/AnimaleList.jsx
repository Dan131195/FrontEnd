import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fetchWithAuth } from "../Utils/fetchWithAuth";

const AnimaleList = () => {
  const [animali, setAnimali] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAnimali();
  }, []);

  const fetchAnimali = async () => {
    try {
      const data = await fetchWithAuth("https://localhost:7028/api/animale");
      setAnimali(data);
    } catch (err) {
      console.error("Errore nel recupero degli animali:", err);
    }
  };

  const handleDeleteAnimale = async (id) => {
    if (!window.confirm("Sei sicuro di voler eliminare questo animale?"))
      return;

    try {
      await fetchWithAuth(`https://localhost:7028/api/animale/${id}`, "DELETE");
      setAnimali(animali.filter((a) => a.id !== id));
      fetchAnimali();
    } catch (err) {
      console.error("Errore durante la cancellazione:", err);
    }
  };

  const handleEditAnimale = (id) => {
    navigate(`/animali/modifica/${id}`);
  };

  const handleViewDetails = (id) => {
    navigate(`/animali/dettaglio/${id}`);
  };

  return (
    <div className="container py-4">
      <div className="card shadow-sm border-0">
        <div className="card-body myContainer">
          <h2 className="mb-4 text-primary">Elenco Animali Registrati</h2>

          <Link className="btn btn-outline-primary mb-4" to="/animali/nuovo">
            <i className="bi bi-plus-circle me-2"></i>Registra Animale
          </Link>

          {animali.length === 0 ? (
            <div className="alert alert-info">Nessun animale registrato.</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-primary">
                  <tr>
                    <th>Nome</th>
                    <th>Tipologia</th>
                    <th>Colore</th>
                    <th>Data Nascita</th>
                    <th>Microchip</th>
                    <th>Cod. Fiscale Proprietario</th>
                    <th>Azioni</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {animali.map((a) => (
                    <tr key={a.id}>
                      <td>{a.nomeAnimale}</td>
                      <td>{a.tipologia}</td>
                      <td>{a.coloreMantello}</td>
                      <td>{new Date(a.dataNascita).toLocaleDateString()}</td>
                      <td>{a.microchipPresente ? a.numeroMicrochip : "No"}</td>
                      <td>{a.codiceFiscaleProprietario}</td>
                      <td>
                        <div className="btn-group" role="group">
                          <button
                            className="btn btn-sm btn-info"
                            title="Dettagli"
                            onClick={() => handleViewDetails(a.id)}
                          >
                            <i className="bi bi-info-circle"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-warning"
                            title="Modifica"
                            onClick={() => handleEditAnimale(a.id)}
                          >
                            <i className="bi bi-pencil-square"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            title="Elimina"
                            onClick={() => handleDeleteAnimale(a.id)}
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

export default AnimaleList;
