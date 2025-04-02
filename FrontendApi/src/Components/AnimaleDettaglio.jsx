import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

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
      const res = await fetch(`https://localhost:7028/api/animale/${id}`);
      if (!res.ok) throw new Error("Errore nel caricamento dell'animale");
      const data = await res.json();
      setAnimale(data);
    } catch (err) {
      setErrore(err.message);
    }
  };

  const fetchVisite = async () => {
    try {
      const res = await fetch(
        `https://localhost:7028/api/visite/anamnesi/${id}`
      );
      if (!res.ok) throw new Error("Errore nel caricamento delle visite");
      const data = await res.json();
      // Ordina le visite dalla più recente alla più vecchia
      const sorted = data.sort(
        (a, b) => new Date(b.dataVisita) - new Date(a.dataVisita)
      );
      setVisite(sorted);
    } catch (err) {
      console.error(err);
    }
  };

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
        🔙 Indietro
      </Link>
    </div>
  );
};

export default AnimaleDettaglio;
