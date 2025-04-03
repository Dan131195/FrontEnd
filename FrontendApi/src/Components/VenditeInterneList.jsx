import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchWithAuth } from "../Utils/fetchWithAuth";

const VenditeInterneList = () => {
  const [venditeInterne, setVenditeInterne] = useState([]);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchVenditeInterne = async () => {
      try {
        const data = await fetchWithAuth(
          "https://localhost:7028/api/farmacia/vendita",
          "GET",
          null,
          token
        );
        setVenditeInterne(data);
      } catch (err) {
        console.error("Errore nel recupero delle vendite interne:", err);
      }
    };

    fetchVenditeInterne();
  }, [token]);

  return (
    <div className="card p-4">
      <h3 className="mb-3">Vendite Interne</h3>
      {venditeInterne.length === 0 ? (
        <p>Nessuna vendita interna registrata.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Data</th>
                <th>Codice Fiscale Cliente</th>
                <th>ID Animale</th>
                <th>Prodotto</th>
                <th>Ricetta</th>
              </tr>
            </thead>
            <tbody>
              {venditeInterne.map((v) => (
                <tr key={v.id}>
                  <td>{new Date(v.dataVendita).toLocaleDateString()}</td>
                  <td>{v.codiceFiscaleCliente}</td>
                  <td>{v.animaleId}</td>
                  <td>{v.prodottoId}</td>
                  <td>{v.numeroRicetta || "-"}</td>
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
