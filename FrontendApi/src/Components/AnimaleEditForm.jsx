import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchWithAuth } from "../Utils/fetchWithAuth";

const AnimaleEditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [animale, setAnimale] = useState(null);
  const [errore, setErrore] = useState("");

  useEffect(() => {
    const fetchAnimale = async () => {
      try {
        const data = await fetchWithAuth(
          `https://localhost:7028/api/animale/${id}`
        );
        setAnimale(data);
      } catch (err) {
        setErrore(err.message);
      }
    };

    fetchAnimale();
  }, [id]);

  const handleChange = (e) => {
    setAnimale({ ...animale, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetchWithAuth(
        `https://localhost:7028/api/animale/${id}`,
        "PUT",
        animale
      );

      navigate("/animali/list"); // oppure navigate("/animali/list") se usi una route specifica
    } catch (err) {
      setErrore(err.message);
    }
  };

  if (!animale) return <p>Caricamento...</p>;

  return (
    <div className="container mt-4 myContainer2 py-2">
      <h2>Modifica Animale</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nome</label>
          <input
            className="form-control"
            name="nomeAnimale"
            value={animale.nomeAnimale}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Tipologia</label>
          <input
            className="form-control"
            name="tipologia"
            value={animale.tipologia}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Colore Mantello</label>
          <input
            className="form-control"
            name="coloreMantello"
            value={animale.coloreMantello}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Data di Nascita</label>
          <input
            className="form-control"
            type="date"
            name="dataNascita"
            value={animale.dataNascita?.split("T")[0]}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Microchip</label>
          <input
            className="form-control"
            name="numeroMicrochip"
            value={animale.numeroMicrochip || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="microchipPresente"
            name="microchipPresente"
            checked={animale.microchipPresente || false}
            onChange={(e) =>
              setAnimale({ ...animale, microchipPresente: e.target.checked })
            }
          />
          <label className="form-check-label" htmlFor="microchipPresente">
            Microchip presente
          </label>
        </div>
        <div className="mb-3">
          <label>Nome Proprietario</label>
          <input
            className="form-control"
            name="nomeProprietario"
            value={animale.nomeProprietario}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Cognome Proprietario</label>
          <input
            className="form-control"
            name="cognomeProprietario"
            value={animale.cognomeProprietario}
            onChange={handleChange}
          />
        </div>

        {errore && <div className="alert alert-danger">{errore}</div>}
        <button className="btn btn-primary">
          <i className="bi bi-floppy p-1 me-1 text-white"></i>Salva modifiche
        </button>
        <Link className="btn btn-secondary ms-3" to="/animali/list">
          <i className="bi bi-arrow-left-circle me-1"></i>Indietro
        </Link>
      </form>
    </div>
  );
};

export default AnimaleEditForm;
