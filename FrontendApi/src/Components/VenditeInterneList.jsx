import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchWithAuth } from "../Utils/fetchWithAuth";
import { useNavigate } from "react-router-dom";

const VenditeInterneList = () => {
  const [venditeInterne, setVenditeInterne] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVenditeInterne = async () => {
      try {
        const vendite = await fetchWithAuth(
          "https://localhost:7028/api/farmacia/vendita",
          "GET",
          null,
          token
        );

        const venditeConDettagli = await Promise.all(
          vendite.map(async (v) => {
            let animale = null;
            let prodotto = null;

            try {
              animale = await fetchWithAuth(
                `https://localhost:7028/api/Animale/${v.animaleId}`,
                "GET",
                null,
                token
              );
              prodotto = await fetchWithAuth(
                `https://localhost:7028/api/farmacia/Prodotto/${v.prodottoId}`,
                "GET",
                null,
                token
              );
            } catch (err) {
              console.warn("Errore nel recupero dati animale/prodotto", err);
            }

            return {
              ...v,
              nomeAnimale: animale?.nomeAnimale || "N/A",
              specie: animale?.tipologia || "-",
              nomeProdotto: prodotto?.nome || "N/A",
            };
          })
        );

        setVenditeInterne(venditeConDettagli);
      } catch (err) {
        console.error("Errore nel recupero delle vendite interne:", err);
      }
    };

    fetchVenditeInterne();
  }, [token]);

  const handleEditVendita = (id) => {
    navigate(`/vendita/modifica/${id}`);
  };

  const handleRicercaVendita = () => {
    navigate(`/vendita/ricerca`);
  };

  return (
    <div className="myContainer p-4">
      <h2 className="mb-3">Vendite Interne</h2>
      <button
        className="btn btn-sm btn-primary"
        title="Modifica"
        onClick={() => handleRicercaVendita()}
      >
        <i className="bi bi-search me-1"></i>Ricerca Vendita
      </button>
      {venditeInterne.length === 0 ? (
        <p>Nessuna vendita interna registrata.</p>
      ) : (
        <div className="table-responsive my-2">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Data</th>
                <th>Codice Fiscale Cliente</th>
                <th>Animale</th>
                <th>Specie</th>
                <th>Prodotto</th>
                <th>Ricetta</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {venditeInterne.map((v) => (
                <tr key={v.id}>
                  <td>{new Date(v.dataVendita).toLocaleDateString()}</td>
                  <td>{v.codiceFiscaleCliente}</td>
                  <td>{v.nomeAnimale}</td>
                  <td>{v.specie}</td>
                  <td>{v.nomeProdotto}</td>
                  <td>{v.numeroRicetta || "-"}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning"
                      title="Modifica"
                      onClick={() => handleEditVendita(v.id)}
                    >
                      <i className="bi bi-pencil-square"></i>
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

export default VenditeInterneList;
