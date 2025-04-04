import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fetchWithAuth } from "../Utils/fetchWithAuth";
import pharmacyImg from "../assets/img/pharmacy.png";

const ProdottoList = () => {
  const [prodotti, setProdotti] = useState([]);
  const navigate = useNavigate();
  const userRole = localStorage.getItem("ruolo");

  useEffect(() => {
    fetchProdotti();
  }, []);

  const fetchProdotti = async () => {
    try {
      const data = await fetchWithAuth(
        "https://localhost:7028/api/farmacia/prodotto"
      );
      setProdotti(data.data || data);
    } catch (err) {
      console.error("Errore nel caricamento dei prodotti:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Sei sicuro di voler eliminare questo prodotto?"))
      return;

    try {
      await fetchWithAuth(
        `https://localhost:7028/api/farmacia/prodotto/${id}`,
        "DELETE"
      );
      setProdotti((prev) => prev.filter((p) => p.prodottoId !== id));
    } catch (err) {
      console.error("Errore durante la cancellazione:", err);
    }
  };

  const handleAddProdotto = () => navigate(`/prodotto/nuovo`);
  const handleEditProdotto = (id) => navigate(`/prodotto/modifica/${id}`);
  const handleDettaglioProdotto = (id) => navigate(`/prodotto/dettaglio/${id}`);

  return (
    <div className="myContainer p-4">
      <div className="d-flex justify-content-between">
        <div>
          <h2 className="mb-4">Elenco Prodotti</h2>
          <div className="d-flex align-items-center">
            {userRole == "Veterinario" && (
              <button
                className="btn btn-warning me-2"
                onClick={handleAddProdotto}
              >
                <i className="bi bi-plus-circle me-1"></i>Aggiungi un prodotto
              </button>
            )}

            <Link className="btn-primary btn" to="/vendite-interne">
              <i className="bi bi-card-list me-1"></i> Registro Vendite
            </Link>
          </div>
        </div>
        <img
          src={pharmacyImg}
          alt="Pharmacy image"
          id="pharmacyImg"
          className="me-4"
        />
      </div>

      {prodotti.length === 0 ? (
        <p className="mt-3">Nessun prodotto disponibile.</p>
      ) : (
        <div className="row mt-4">
          {prodotti.map((p) => (
            <div key={p.prodottoId} className="col-6 col-lg-2 mb-4">
              <div className="card h-100 shadow-sm">
                <img
                  src={
                    p.tipo === "Medicinale"
                      ? "https://www.shutterstock.com/image-vector/veterinary-icon-little-paw-cross-600nw-2428377771.jpg"
                      : "https://static.vecteezy.com/ti/vettori-gratis/t1/50730314-verde-veterinario-dieta-etichetta-icona-animale-domestico-ciotola-e-dieta-cibo-gatto-cibo-proprieta-cibo-confezione-etichetta-vettoriale.jpg"
                  }
                  className="card-img-top p-4"
                  alt={`Logo ${p.tipo}`}
                />
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
