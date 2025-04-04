import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchWithAuth } from "../Utils/fetchWithAuth";

const ProdottoEditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: "",
    tipo: "",
    dittaFornitrice: "",
    prodottoUso: "",
    codiceArmadietto: "",
    numeroCassetto: "",
  });

  useEffect(() => {
    const fetchProdotto = async () => {
      try {
        const data = await fetchWithAuth(
          `https://localhost:7028/api/farmacia/prodotto/${id}`
        );
        setForm(data);
      } catch (err) {
        console.error("Errore nel caricamento del prodotto:", err);
      }
    };

    fetchProdotto();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetchWithAuth(
        `https://localhost:7028/api/farmacia/prodotto/${id}`,
        "PUT",
        form
      );

      alert("Prodotto aggiornato con successo!");
      navigate("/prodotti");
    } catch (err) {
      console.error("Errore:", err);
      alert("Errore nell'aggiornamento del prodotto.");
    }
  };

  return (
    <div className="card p-4">
      <h2 className="mb-3">Modifica Prodotto</h2>
      <form onSubmit={handleSubmit}>
        {Object.entries(form).map(([key, value]) => (
          <div className="mb-3" key={key}>
            <label className="form-label">{key}</label>
            <input
              type="text"
              name={key}
              className="form-control"
              value={value}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit" className="btn btn-success">
          <i class="bi bi-floppy me-1"></i>Salva modifiche
        </button>
        <button
          type="submit"
          className="btn btn-secondary"
          onClick={() => navigate("/prodotti")}
        >
          <i class="bi bi-arrow-left-circle"></i>Indietro
        </button>
      </form>
    </div>
  );
};

export default ProdottoEditForm;
