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
        <p className="mt-3">Nessun prodotto disponibile.</p>
      ) : (
        <div className="row mt-4">
          {prodotti.map((p) => (
            <div key={p.prodottoId} className="col-md-6 col-lg-3 mb-4">
              <div className="card h-100 shadow-sm">
                {p.tipo === "Medicinale" ? (
                  <img
                    src="https://www.shutterstock.com/image-vector/veterinary-icon-little-paw-cross-600nw-2428377771.jpg"
                    class="card-img-top"
                    alt="Logo Medicinale"
                  />
                ) : (
                  <img
                    src="https://static.vecteezy.com/ti/vettori-gratis/t1/50730314-verde-veterinario-dieta-etichetta-icona-animale-domestico-ciotola-e-dieta-cibo-gatto-cibo-proprieta-cibo-confezione-etichetta-vettoriale.jpg"
                    class="card-img-top"
                    alt="Logo Alimento"
                    className="p-4"
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{p.nome}</h5>
                  <p className="mb-1">
                    <strong>Tipo:</strong> {p.tipo}
                  </p>
                  <p className="mb-1">
                    <strong>Ditta Fornitrice:</strong> {p.dittaFornitrice}
                  </p>
                  <p className="mb-0">
                    <strong>Uso:</strong> {p.prodottoUso}
                  </p>
                </div>
                <div className="card-footer bg-transparent border-top-0 d-flex justify-content-end">
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
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProdottoList;
