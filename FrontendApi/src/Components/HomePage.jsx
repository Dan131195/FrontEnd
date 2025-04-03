import React from "react";
import { useSelector } from "react-redux";

const HomePage = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const nome = localStorage.getItem("nome") || "Utente";
  const cognome = localStorage.getItem("cognome") || "";

  return (
    <>
      {isAuthenticated ? (
        <div
          className="d-flex flex-column justify-content-center align-items-center text-white text-center"
          id="homeImg"
        >
          <div
            className="bg-dark bg-opacity-75 p-5 rounded shadow mt-5"
            style={{ zIndex: 2, maxWidth: "700px" }}
          >
            <h1 className="mb-3">
              Benvenuto/a, {nome} {cognome}
            </h1>
            <p className="lead">
              Sei all'interno della <strong>Clinica Veterinaria</strong>. Da qui
              puoi:
            </p>
            <ul className="list-unstyled fs-5 mt-3">
              <li>🐾 Registrare e visualizzare i pazienti animali</li>
              <li>📋 Gestire le visite veterinarie e anamnesi</li>
              <li>🏥 Monitorare i ricoveri attivi</li>
              <li>💊 Accedere alla farmacia interna</li>
            </ul>
            <p className="mt-4 fst-italic">
              Tutto a portata di clic, in un ambiente pensato per semplificare
              il tuo lavoro.
            </p>
          </div>
        </div>
      ) : (
        <div
          className="d-flex flex-column justify-content-center align-items-center text-white text-center"
          id="homeImg"
        >
          <div className="bg-dark bg-opacity-75 p-5 rounded">
            <h1 className="mb-3">Clinica Veterinaria</h1>
            <p className="lead">
              Benvenuto nella nostra clinica! Qui puoi registrare gli animali,
              gestire le visite, i ricoveri e accedere alla farmacia interna in
              modo semplice e veloce.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
