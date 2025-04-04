import React from "react";
import { useSelector } from "react-redux";
import homeImg from "../assets/img/home.jpg";

const HomePage = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const nome = localStorage.getItem("nome") || "Utente";
  // const cognome = localStorage.getItem("cognome") || "";

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center text-center"
      style={{
        background: "linear-gradient(to bottom, #e0f7fa, #ffffff)",
        backgroundImage: "url('/img/silhouette-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "bottom center",
        padding: "3rem",
      }}
    >
      <div
        className="bg-white p-5 rounded shadow"
        style={{ maxWidth: "800px", zIndex: 2 }}
      >
        {!isAuthenticated ? (
          <div className="px-4">
            <img src={homeImg} alt="" id="homeImg" />
            <h1 className="mb-3">Un team di veterinari per i tuoi animali</h1>
            <p className="lead">
              Alla <strong>Clinica Veterinaria</strong> ci occupiamo da anni
              della cura degli{" "}
              <strong>animali domestici e non convenzionali</strong>. Una
              squadra formata da medici di grande competenza ed esperienza si
              dedica con <strong>passione</strong> al benessere di cani, gatti,
              conigli, pappagalli, cincillà, serpenti e molti altri.
            </p>
            <button className="btn btn-info text-white fw-bold mt-3">
              VISITE PER ANIMALI
            </button>
          </div>
        ) : (
          <div>
            <img src={homeImg} alt="" id="homeImg" />
            <h1 className="mb-3 ">Clinica Veterinaria</h1>
            <p className="lead">
              Benvenuto/a nella nostra clinica {nome}! Qui puoi registrare gli
              animali, gestire le visite, i ricoveri e accedere alla farmacia
              interna in modo semplice e veloce.
            </p>
          </div>
        )}
      </div>

      {/* Sezione immagine veterinari */}
      {/* {isAuthenticated && (
        <div className="mt-4 d-flex flex-column align-items-center">
          <img
            src="/img/veterinari.png" // Sostituisci con percorso reale
            alt="Veterinari"
            className="img-fluid"
            style={{ maxWidth: "300px", borderRadius: "15px" }}
          />
          <p className="mt-2 text-muted">
            <strong>Angelo e Alessandro Sferlazzo</strong>
            <br />
            Fondatori e proprietari della clinica
          </p>
        </div>
      )} */}
    </div>
  );
};

export default HomePage;
