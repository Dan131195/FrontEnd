import { useEffect, useState } from "react";

const AnimaleList = () => {
  const [animali, setAnimali] = useState([]);

  useEffect(() => {
    const fetchAnimali = async () => {
      try {
        const res = await fetch("https://localhost:7028/api/Animale");
        if (!res.ok) throw new Error("Errore nel recupero degli animali");
        const data = await res.json();
        setAnimali(data);
      } catch (err) {
        console.error("Errore nel recupero degli animali:", err);
      }
    };

    fetchAnimali();
  }, []);

  return (
    <div className="card p-4">
      <h3 className="mb-3">Elenco Animali Registrati</h3>
      {animali.length === 0 ? (
        <p>Nessun animale registrato.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Nome</th>
                <th>Tipologia</th>
                <th>Colore</th>
                <th>Data Nascita</th>
                <th>Microchip</th>
                <th>Cod. Fiscale Proprietario</th>
              </tr>
            </thead>
            <tbody>
              {animali.map((a) => (
                <tr key={a.id}>
                  <td>{a.nomeAnimale}</td>
                  <td>{a.tipologia}</td>
                  <td>{a.coloreMantello}</td>
                  <td>{new Date(a.dataNascita).toLocaleDateString()}</td>
                  <td>{a.microchipPresente ? a.numeroMicrochip : "No"}</td>
                  <td>{a.codiceFiscaleProprietario}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AnimaleList;
