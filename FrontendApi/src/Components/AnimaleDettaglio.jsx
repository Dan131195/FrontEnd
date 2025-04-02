import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const AnimaleDettaglio = () => {
  const { id } = useParams();
  const [animale, setAnimale] = useState(null);
  const [errore, setErrore] = useState("");

  useEffect(() => {
    const fetchAnimale = async () => {
      try {
        const res = await fetch(`https://localhost:7028/api/animale/${id}`);
        if (!res.ok) throw new Error("Errore nel caricamento dell'animale");
        const data = await res.json();
        setAnimale(data);
      } catch (err) {
        setErrore(err.message);
      }
    };

    fetchAnimale();
  }, [id]);

  if (errore) return <div className="alert alert-danger">{errore}</div>;
  if (!animale) return <p>Caricamento in corso...</p>;

  return (
    <div className="myContainer2 border border-1 rounded p-3 mt-4">
      <h3 className="mb-4">Dettaglio Animale</h3>
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
        <strong>Numero Microchip:</strong> {animale.numeroMicrochip || "N/A"}
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
      <Link className="btn btn-secondary" to="/animali/list">
        Indietro
      </Link>
    </div>
  );
};

export default AnimaleDettaglio;
