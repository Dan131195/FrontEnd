import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../Utils/fetchWithAuth";

const ProdottoDettaglio = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [prodotto, setProdotto] = useState(null);
  const [errore, setErrore] = useState("");

  useEffect(() => {
    const fetchProdotto = async () => {
      try {
        const data = await fetchWithAuth(
          `https://localhost:7028/api/farmacia/prodotto/${id}`
        );
        setProdotto(data);
      } catch (err) {
        setErrore(err.message);
      }
    };

    fetchProdotto();
  }, [id]);

  if (errore) return <div className="alert alert-danger">{errore}</div>;
  if (!prodotto) return <p>Caricamento in corso...</p>;

  return (
    <div className="card p-4 mt-4">
      <h3 className="mb-3">Dettaglio Prodotto</h3>
      <p>
        <strong>Nome:</strong> {prodotto.nome}
      </p>
      <p>
        <strong>Tipo:</strong> {prodotto.tipo}
      </p>
      <p>
        <strong>Ditta Fornitrice:</strong> {prodotto.dittaFornitrice}
      </p>
      <p>
        <strong>Uso:</strong> {prodotto.prodottoUso}
      </p>
      <p>
        <strong>Codice Armadietto:</strong> {prodotto.codiceArmadietto}
      </p>
      <p>
        <strong>Numero Cassetto:</strong> {prodotto.numeroCassetto}
      </p>

      <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
        🔙 Torna Indietro
      </button>
    </div>
  );
};

export default ProdottoDettaglio;
