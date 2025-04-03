import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchWithAuth } from "../Utils/fetchWithAuth";

const VenditaList = () => {
  const [vendite, setVendite] = useState([]);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchVendite = async () => {
      try {
        const data = await fetchWithAuth(
          "https://localhost:7028/api/farmacia/vendita",
          "GET",
          null,
          token
        );
        setVendite(data);
      } catch (err) {
        console.error("Errore nel recupero delle vendite:", err);
      }
    };

    fetchVendite();
  }, [token]);

  return (
    <div className="card p-4">
      <h3 className="mb-3">Elenco Vendite</h3>
      {vendite.length === 0 ? (
        <p>Nessuna vendita registrata.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Data Vendita</th>
                <th>Codice Fiscale Cliente</th>
                <th>Prodotto</th>
                <th>ID Animale</th>
                <th>Ricetta</th>
              </tr>
            </thead>
            <tbody>
              {vendite.map((v) => (
                <tr key={v.id}>
                  <td>{new Date(v.dataVendita).toLocaleDateString()}</td>
                  <td>{v.codiceFiscaleCliente}</td>
                  <td>{v.prodotto?.nome || "-"}</td>
                  <td>{v.animaleId}</td>
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

export default VenditaList;
