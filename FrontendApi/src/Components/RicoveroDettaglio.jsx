import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const RicoveroDettaglio = () => {
  const { id } = useParams();
  const [ricovero, setRicovero] = useState(null);
  const [errore, setErrore] = useState("");

  useEffect(() => {
    const fetchRicovero = async () => {
      try {
        const res = await fetch(`https://localhost:7028/api/ricovero/${id}`);
        if (!res.ok) throw new Error("Errore nel recupero del ricovero");
        const data = await res.json();
        console.log(data);
        setRicovero(data);
      } catch (err) {
        setErrore(err.message);
      }
    };
    fetchRicovero();
  }, [id]);

  if (errore) return <div className="alert alert-danger">{errore}</div>;
  if (!ricovero) return <p>Caricamento in corso...</p>;

  return (
    <div className="card p-4 shadow-sm">
      <h3 className="mb-4 text-primary">Dettagli Ricovero</h3>

      <dl className="row">
        <dt className="col-sm-4">ID Ricovero</dt>
        <dd className="col-sm-8">{ricovero.ricoveroId}</dd>

        <dt className="col-sm-4">Nome Animale</dt>
        <dd className="col-sm-8">{ricovero.nomeAnimale}</dd>

        <dt className="col-sm-4">Data Inizio</dt>
        <dd className="col-sm-8">{ricovero.dataInizio.toLocaleString()}</dd>

        <dt className="col-sm-4">Data Fine</dt>
        <dd className="col-sm-8">
          {ricovero.dataFine != null
            ? ricovero.dataFine
            : "Ricovero ancora attivo"}
        </dd>

        <dt className="col-sm-4">Tipologia</dt>
        <dd className="col-sm-8">{ricovero.tipologia}</dd>

        <dt className="col-sm-4">Colore Mantello</dt>
        <dd className="col-sm-8">{ricovero.coloreMantello}</dd>

        <dt className="col-sm-4">Microchip Presente</dt>
        <dd className="col-sm-8">{ricovero.microchipPresente ? "Sì" : "No"}</dd>

        {ricovero.microchipPresente && (
          <>
            <dt className="col-sm-4">Numero Microchip</dt>
            <dd className="col-sm-8">{ricovero.numeroMicrochip}</dd>
          </>
        )}

        <dt className="col-sm-4">Descrizione</dt>
        <dd className="col-sm-8">{ricovero.descrizione}</dd>

        <dt className="col-sm-4">ID Animale</dt>
        <dd className="col-sm-8">{ricovero.animaleId}</dd>
      </dl>

      <Link className="btn btn-secondary" to="/ricoveri/">
        Indietro
      </Link>
    </div>
  );
};

export default RicoveroDettaglio;
