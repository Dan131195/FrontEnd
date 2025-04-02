import { useEffect, useState } from "react";

const RicoveriList = () => {
  const [ricoveri, setRicoveri] = useState([]);

  useEffect(() => {
    const fetchRicoveri = async () => {
      try {
        const res = await fetch("https://localhost:7028/api/ricoveri/attivi");
        if (!res.ok) throw new Error("Errore nel recupero dei ricoveri");
        const data = await res.json();
        setRicoveri(data);
      } catch (err) {
        console.error("Errore nel recupero dei ricoveri:", err);
      }
    };

    fetchRicoveri();
  }, []);

  return (
    <div className="card p-4">
      <h3 className="mb-3">Ricoveri Attivi</h3>
      {ricoveri.length === 0 ? (
        <p>Nessun ricovero attivo.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Data Inizio</th>
                <th>Descrizione</th>
                <th>Tipologia</th>
                <th>Colore Mantello</th>
                <th>Microchip</th>
              </tr>
            </thead>
            <tbody>
              {ricoveri.map((r) => (
                <tr key={r.id}>
                  <td>{new Date(r.dataInizio).toLocaleDateString()}</td>
                  <td>{r.descrizione}</td>
                  <td>{r.animale?.tipologia || "-"}</td>
                  <td>{r.animale?.coloreMantello || "-"}</td>
                  <td>{r.animale?.numeroMicrochip || "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RicoveriList;
