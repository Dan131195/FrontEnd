import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchWithAuth } from "../Utils/fetchWithAuth";

const VisitaEditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const [form, setForm] = useState({
    dataVisita: "",
    esameObiettivo: "",
    curaPrescritta: "",
    animaleId: "",
  });

  useEffect(() => {
    const fetchVisita = async () => {
      try {
        const data = await fetchWithAuth(
          `https://localhost:7028/api/visite/${id}`,
          "GET",
          null,
          token
        );
        setForm({
          dataVisita: data.dataVisita.slice(0, 10),
          esameObiettivo: data.esameObiettivo,
          curaPrescritta: data.curaPrescritta,
          animaleId: data.animaleId,
        });
      } catch (err) {
        console.error("Errore nel caricamento visita:", err);
      }
    };

    fetchVisita();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetchWithAuth(
        `https://localhost:7028/api/visite/${id}`,
        "PUT",
        form,
        token
      );

      alert("✅ Visita aggiornata con successo!");
      navigate("/visite");
    } catch (error) {
      console.error(error);
      alert("❌ Errore durante l'aggiornamento della visita.");
    }
  };

  return (
    <div className="card p-4">
      <h3 className="mb-3">Modifica Visita</h3>
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
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Cura Prescritta</label>
          <textarea
            className="form-control"
            name="curaPrescritta"
            value={form.curaPrescritta}
            onChange={handleChange}
            required
          ></textarea>
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
          Salva Modifiche
        </button>
      </form>
    </div>
  );
};

export default VisitaEditForm;
