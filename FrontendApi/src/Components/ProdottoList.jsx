import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProdottoList = () => {
  const [prodotti, setProdotti] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProdotti();
  }, []);

  const fetchProdotti = async () => {
    try {
      const res = await fetch("https://localhost:7028/api/farmacia/prodotto");
      if (!res.ok) throw new Error("Errore nel caricamento dei prodotti");
      const data = await res.json();
      setProdotti(data.data);
    } catch (err) {
      console.error("Errore:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Sei sicuro di voler eliminare questo prodotto?"))
      return;

    try {
      const res = await fetch(
        `https://localhost:7028/api/farmacia/prodotto/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) throw new Error("Errore nella cancellazione");
      setProdotti((prev) => prev.filter((p) => p.prodottoId !== id));
    } catch (err) {
      console.error("Errore durante la cancellazione:", err);
    }
  };

  const handleAddProdotto = () => {
    navigate(`/prodotto/nuovo`);
  };

  const handleEditProdotto = (id) => {
    navigate(`/prodotto/modifica/${id}`);
  };

  const handleDettaglioProdotto = (id) => {
    navigate(`/prodotto/dettaglio/${id}`);
  };

  return (
    <div className="card p-4">
      <h3 className="mb-3">Elenco Prodotti</h3>

      <button
        className="btn btn-warning btn-sm me-2"
        onClick={() => handleAddProdotto()}
      >
        Aggiungi un prodotto
      </button>

      {prodotti.length === 0 ? (
        <p>Nessun prodotto disponibile.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Nome</th>
                <th>Tipo</th>
                <th>Ditta Fornitrice</th>
                <th>Uso</th>
                <th>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {prodotti.map((p) => (
                <tr key={p.prodottoId}>
                  <td>{p.nome}</td>
                  <td>{p.tipo}</td>
                  <td>{p.dittaFornitrice}</td>
                  <td>{p.numeroCassetto}</td>
                  <td>
                    <button
                      className="btn btn-info btn-sm me-2"
                      onClick={() => handleDettaglioProdotto(p.prodottoId)}
                    >
                      <i className="bi bi-info-circle"></i>
                    </button>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEditProdotto(p.prodottoId)}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(p.prodottoId)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProdottoList;
