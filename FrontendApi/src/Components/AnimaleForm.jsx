import { useState } from "react";
import { Link } from "react-router-dom";
import { fetchWithAuth } from "../Utils/fetchWithAuth";

const AnimaleForm = () => {
  const [form, setForm] = useState({
    dataRegistrazione: new Date().toISOString(),
    nomeAnimale: "",
    tipologia: "",
    coloreMantello: "",
    dataNascita: "",
    microchipPresente: false,
    numeroMicrochip: null,
    nomeProprietario: "",
    cognomeProprietario: "",
    codiceFiscaleProprietario: "",
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "microchipPresente") {
      setForm((prev) => ({
        ...prev,
        microchipPresente: checked,
        numeroMicrochip: checked ? prev.numeroMicrochip : null,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formToSend = {
      ...form,
      numeroMicrochip: form.microchipPresente ? form.numeroMicrochip : null,
    };

    try {
      await fetchWithAuth(
        "https://localhost:7028/api/animale",
        "POST",
        formToSend
      );
      alert("✅ Animale registrato con successo!");
    } catch (error) {
      console.error(error);
      alert("❌ Errore nella registrazione dell'animale.");
    }
  };

  return (
    <div className="card p-4">
      <h2 className="mb-3">Registra un nuovo animale</h2>
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Nome Animale</label>
            <input
              type="text"
              className="form-control"
              name="nomeAnimale"
              value={form.nomeAnimale}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Tipologia</label>
            <input
              type="text"
              className="form-control"
              name="tipologia"
              value={form.tipologia}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Colore Mantello</label>
            <input
              type="text"
              className="form-control"
              name="coloreMantello"
              value={form.coloreMantello}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Data di Nascita</label>
            <input
              type="date"
              className="form-control"
              name="dataNascita"
              value={form.dataNascita}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 d-flex align-items-center">
            <label className="form-label me-3 mb-0">Presenza Microchip</label>
            <input
              type="checkbox"
              className="form-check-input"
              name="microchipPresente"
              checked={form.microchipPresente}
              onChange={handleChange}
            />
          </div>
          {form.microchipPresente && (
            <div className="col-md-6">
              <label className="form-label">Numero Microchip</label>
              <input
                type="text"
                className="form-control"
                name="numeroMicrochip"
                value={form.numeroMicrochip || ""}
                onChange={handleChange}
              />
            </div>
          )}
          <div className="col-md-4">
            <label className="form-label">Nome Proprietario</label>
            <input
              type="text"
              className="form-control"
              name="nomeProprietario"
              value={form.nomeProprietario}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Cognome Proprietario</label>
            <input
              type="text"
              className="form-control"
              name="cognomeProprietario"
              value={form.cognomeProprietario}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Codice Fiscale</label>
            <input
              type="text"
              className="form-control"
              name="codiceFiscaleProprietario"
              value={form.codiceFiscaleProprietario}
              onChange={handleChange}
              required
              minLength={16}
              maxLength={16}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-success mt-4">
          <i class="bi bi-floppy me-1"></i>Salva Animale
        </button>
        <Link className="btn btn-secondary mt-4 ms-2" to="/animali/list">
          <i class="bi bi-arrow-left-circle me-1"></i>Indietro
        </Link>
      </form>
    </div>
  );
};

export default AnimaleForm;
