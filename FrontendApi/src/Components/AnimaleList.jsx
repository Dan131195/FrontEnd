import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fetchWithAuth } from "../Utils/fetchWithAuth";
import dogImg from "../assets/img/dog.png";
import catImg from "../assets/img/cat.png";
import parotImg from "../assets/img/parot.png";
import snakeImg from "../assets/img/snake1.png";
import pawImg from "../assets/img/paw.png";

const AnimaleList = () => {
  const [animali, setAnimali] = useState([]);
  const navigate = useNavigate();
  const userRole = localStorage.getItem("ruolo");

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

  const getImageByTipo = (tipo) => {
    switch (tipo) {
      case "Cane":
        return dogImg;
      case "Gatto":
        return catImg;
      case "Pappagallo":
        return parotImg;
      case "Serpente":
        return snakeImg;
      default:
        return pawImg;
    }
  };

  return (
    <div className="py-4">
      <div className=" myContainer shadow-sm border-0 p-3">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <div className="">
              <h2 className="mb-4">Elenco Animali Registrati</h2>
              {userRole == "Veterinario" && (
                <Link
                  className="btn btn-outline-primary mb-4"
                  to="/animali/nuovo"
                >
                  <i className="bi bi-plus-circle me-2"></i>Registra Animale
                </Link>
              )}
            </div>

            <img
              src="../src/assets/img/pets.png"
              alt="Pets image"
              id="petsImg"
              className="me-4"
            />
          </div>

          {animali.length === 0 ? (
            <div className="alert alert-info">Nessun animale registrato.</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle table-striped">
                <thead className="table-primary">
                  <tr>
                    <th></th>
                    <th>Nome</th>
                    <th>Tipologia</th>
                    <th>Colore</th>
                    <th>Data Nascita</th>
                    <th>Microchip</th>
                    <th>Cod. Fiscale</th>
                    <th>Azioni</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {animali.map((a) => (
                    <tr key={a.id}>
                      <td>
                        <img
                          src={getImageByTipo(a.tipologia)}
                          alt="Logo pet"
                          className="petLogoList"
                        />
                      </td>
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
                            onClick={() => handleViewDetails(a.animaleId)}
                          >
                            <i className="bi bi-info-circle"></i>
                          </button>
                          {userRole == "Veterinario" && (
                            <>
                              <button
                                className="btn btn-sm btn-warning"
                                title="Modifica"
                                onClick={() => handleEditAnimale(a.animaleId)}
                              >
                                <i className="bi bi-pencil-square"></i>
                              </button>
                              <button
                                className="btn btn-sm btn-danger"
                                title="Elimina"
                                onClick={() => handleDeleteAnimale(a.animaleId)}
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </>
                          )}
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
