/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchWithAuth } from "../Utils/fetchWithAuth";
import dogImg from "../assets/img/dog.png";
import catImg from "../assets/img/cat.png";
import parotImg from "../assets/img/parot.png";
import snakeImg from "../assets/img/snake.png";
import pawImg from "../assets/img/paw.png";

const AnimaleDettaglio = () => {
  const { id } = useParams();
  const [animale, setAnimale] = useState(null);
  const [visite, setVisite] = useState([]);
  const [errore, setErrore] = useState("");

  useEffect(() => {
    fetchAnimale();
    fetchVisite();
  }, [id]);

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

  const fetchVisite = async () => {
    try {
      const data = await fetchWithAuth(
        `https://localhost:7028/api/visite/anamnesi/${id}`
      );
      const sorted = data.sort(
        (a, b) => new Date(b.dataVisita) - new Date(a.dataVisita)
      );
      setVisite(sorted);
    } catch (err) {
      console.error(err);
    }
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

  if (errore) return <div className="alert alert-danger">{errore}</div>;
  if (!animale) return <p>Caricamento in corso...</p>;

  return (
    <div className="myContainer2 border border-1 rounded p-3 mt-4">
      <div className="d-flex justify-content-between">
        <div>
          <h2 className="mb-4">Dettaglio Animale</h2>

          <p>
            <strong>Nome:</strong> {animale.nomeAnimale}
          </p>
          <p>
            <strong>Tipologia:</strong> {animale.tipologia}
          </p>
          <p>
            <strong>Colore Mantello:</strong> {animale.coloreMantello}
          </p>
          <p>
            <strong>Data di Nascita:</strong>{" "}
            {new Date(animale.dataNascita).toLocaleDateString()}
          </p>
          <p>
            <strong>Microchip:</strong>{" "}
            {animale.microchipPresente ? "Presente" : "Assente"}
          </p>
          <p>
            <strong>Numero Microchip:</strong>{" "}
            {animale.numeroMicrochip || "N/A"}
          </p>
          <p>
            <strong>Nome Proprietario:</strong> {animale.nomeProprietario}
          </p>
          <p>
            <strong>Cognome Proprietario:</strong> {animale.cognomeProprietario}
          </p>
          <p>
            <strong>Codice Fiscale Proprietario:</strong>{" "}
            {animale.codiceFiscaleProprietario}
          </p>
        </div>
        <div>
          {console.log(animale.tipologia)}
          <img
            src={getImageByTipo(animale.tipologia)}
            alt="Logo pet"
            className="petLogo"
          />
        </div>
      </div>

      <hr />

      <h5 className="mt-4">🩺 Anamnesi (Visite effettuate)</h5>
      {visite.length === 0 ? (
        <p>Nessuna visita registrata per questo animale.</p>
      ) : (
        <ul className="list-group mb-3">
          {visite.map((v) => (
            <li key={v.visitaId} className="list-group-item">
              <strong>{new Date(v.dataVisita).toLocaleDateString()}</strong> –{" "}
              {v.esameObiettivo}
              <br />
              <small>
                <strong>Cura:</strong> {v.curaPrescritta}
              </small>
            </li>
          ))}
        </ul>
      )}

      <Link className="btn btn-secondary" to="/animali/list">
        <i className="bi bi-arrow-left-circle me-1"></i>Indietro
      </Link>
    </div>
  );
};

export default AnimaleDettaglio;
