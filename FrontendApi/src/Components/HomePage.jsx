import React from "react";

const HomePage = () => {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center text-white text-center"
      id="homeImg"
    >
      <div className="bg-dark bg-opacity-75 p-5 rounded">
        <h1 className="mb-3">Clinica Veterinaria</h1>
        <p className="lead">
          Benvenuto nella nostra clinica! Qui puoi registrare gli animali,
          gestire le visite, i ricoveri e accedere alla farmacia interna in modo
          semplice e veloce.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
