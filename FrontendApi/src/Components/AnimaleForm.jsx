import { useState } from "react";
import { Link } from "react-router-dom";

const AnimaleForm = () => {
  const [form, setForm] = useState({
    dataRegistrazione: new Date().toISOString(),
    nomeAnimale: "",
    tipologia: "",
    coloreMantello: "",
    dataNascita: "",
    microchipPresente: false,
    numeroMicrochip: "",
    nomeProprietario: "",
    cognomeProprietario: "",
    codiceFiscaleProprietario: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://localhost:7028/api/animale", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Errore HTTP: " + res.status);

      alert("Animale registrato con successo!");
    } catch (error) {
      console.error(error);
      alert("Errore nella registrazione dell'animale.");
    }
  };

  return (
    <div className="card p-4">
      <h3 className="mb-3">Registra un nuovo animale</h3>
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
          <div className="col-md-6">
            <label className="form-label">Presenza Microchip</label>
            <input
              type="checkbox"
              className="form-check-input ms-2"
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
                value={form.numeroMicrochip}
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
            />
          </div>
        </div>

        <button type="submit" className="btn btn-success mt-4">
          Salva Animale
        </button>
        <Link className="btn btn-secondary mt-4 ms-2" to="/animali/list">
          Indietro
        </Link>
      </form>
    </div>
  );
};

export default AnimaleForm;
