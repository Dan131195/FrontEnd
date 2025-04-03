import { useState } from "react";
import { useSelector } from "react-redux";
import { fetchWithAuth } from "../Utils/fetchWithAuth";

const VisitaForm = () => {
  const [form, setForm] = useState({
    dataVisita: new Date().toISOString().slice(0, 10),
    esameObiettivo: "",
    curaPrescritta: "",
    animaleId: "",
  });

  const token = useSelector((state) => state.auth.token);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetchWithAuth(
        "https://localhost:7028/api/visite",
        "POST",
        form,
        token
      );
      alert("Visita registrata con successo!");
      setForm({
        dataVisita: new Date().toISOString().slice(0, 10),
        esameObiettivo: "",
        curaPrescritta: "",
        animaleId: "",
      });
    } catch (error) {
      console.error(error);
      alert("Errore nella registrazione della visita.");
    }
  };

  return (
    <div className="card p-4">
      <h3 className="mb-3">Registra una Visita Veterinaria</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Data Visita</label>
          <input
            type="date"
            className="form-control"
            name="dataVisita"
            value={form.dataVisita}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Esame Obiettivo</label>
          <textarea
            className="form-control"
            name="esameObiettivo"
            value={form.esameObiettivo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Cura Prescritta</label>
          <textarea
            className="form-control"
            name="curaPrescritta"
            value={form.curaPrescritta}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">ID Animale</label>
          <input
            type="text"
            className="form-control"
            name="animaleId"
            value={form.animaleId}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Salva Visita
        </button>
      </form>
    </div>
  );
};

export default VisitaForm;
