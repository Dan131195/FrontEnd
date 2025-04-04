import { useEffect, useState } from "react";
import { fetchWithAuth } from "../Utils/fetchWithAuth";
import { useSelector } from "react-redux";

const VenditeRicerca = () => {
  const [codiciFiscali, setCodiciFiscali] = useState([]);
  const [selectedCF, setSelectedCF] = useState("");
  const [dataVendita, setDataVendita] = useState("");
  const [risultati, setRisultati] = useState([]);
  const [dettagli, setDettagli] = useState({});
  const [errore, setErrore] = useState("");
  const [messaggio, setMessaggio] = useState("");
  const token = useSelector((state) => state.auth.token);

  // Carica i codici fiscali
  useEffect(() => {
    const fetchCodiciFiscali = async () => {
      try {
        const data = await fetchWithAuth(
          "https://localhost:7028/api/animale",
          "GET",
          null,
          token
        );
        const unici = Object.values(
          data.reduce((acc, curr) => {
            if (!acc[curr.codiceFiscaleProprietario]) {
              acc[curr.codiceFiscaleProprietario] = {
                codiceFiscale: curr.codiceFiscaleProprietario,
                nome: curr.nomeProprietario,
                cognome: curr.cognomeProprietario,
              };
            }
            return acc;
          }, {})
        );
        setCodiciFiscali(unici);
      } catch (err) {
        console.error("Errore nel caricamento dei codici fiscali", err);
      }
    };
    fetchCodiciFiscali();
  }, [token]);

  const fetchDettagliExtra = async (vendite) => {
    const nuoveInfo = {};

    await Promise.all(
      vendite.map(async (v) => {
        try {
          const [animale, prodotto] = await Promise.all([
            fetchWithAuth(
              `https://localhost:7028/api/Animale/${v.animaleId}`,
              "GET",
              null,
              token
            ),
            fetchWithAuth(
              `https://localhost:7028/api/farmacia/Prodotto/${v.prodottoId}`,
              "GET",
              null,
              token
            ),
          ]);

          nuoveInfo[v.id] = {
            nomeAnimale: animale.nomeAnimale,
            specie: animale.tipologia,
            nomeProdotto: prodotto.nome,
          };
        } catch (err) {
          console.error("Errore nel recupero dettagli:", err);
        }
      })
    );

    setDettagli(nuoveInfo);
  };

  const cercaPerCodiceFiscale = async () => {
    if (!selectedCF) return;
    try {
      const data = await fetchWithAuth(
        `https://localhost:7028/api/farmacia/Vendita/byCliente/${selectedCF}`,
        "GET",
        null,
        token
      );
      setRisultati(data);
      setErrore("");
      setMessaggio(
        data.length === 0 ? "Nessuna vendita trovata per questo cliente." : ""
      );
      if (data.length > 0) await fetchDettagliExtra(data);
    } catch (err) {
      console.log(err);
      setErrore("Errore durante la ricerca per codice fiscale");
      setRisultati([]);
    }
  };

  const cercaPerData = async () => {
    if (!dataVendita) {
      setMessaggio("❗ Seleziona una data valida.");
      return;
    }

    try {
      const formattedDate = new Date(dataVendita).toISOString().split("T")[0];
      const data = await fetchWithAuth(
        `https://localhost:7028/api/farmacia/Vendita/byDate?date=${formattedDate}`,
        "GET",
        null,
        token
      );
      setRisultati(data);
      setErrore("");
      setMessaggio(
        data.length === 0 ? "Nessuna vendita trovata per questa data." : ""
      );
      if (data.length > 0) await fetchDettagliExtra(data);
    } catch (err) {
      console.log(err);
      setErrore("Errore durante la ricerca per data");
      setRisultati([]);
    }
  };

  return (
    <div className="myContainer p-4">
      <h3 className="mb-3">🔍 Ricerca Vendite</h3>

      {/* Dropdown per codice fiscale */}
      <div className="mb-3">
        <label>Codice Fiscale Cliente</label>
        <div className="d-flex">
          <select
            className="form-select me-2"
            value={selectedCF}
            onChange={(e) => setSelectedCF(e.target.value)}
          >
            <option value="">Seleziona un cliente...</option>
            {codiciFiscali.map((cf) => (
              <option key={cf.codiceFiscale} value={cf.codiceFiscale}>
                {cf.nome} {cf.cognome} ({cf.codiceFiscale})
              </option>
            ))}
          </select>
          <button
            className="btn btn-primary"
            onClick={cercaPerCodiceFiscale}
            disabled={!selectedCF}
          >
            Cerca
          </button>
        </div>
      </div>

      {/* Ricerca per data */}
      <div className="mb-4">
        <label>Data Vendita</label>
        <div className="d-flex">
          <input
            type="date"
            className="form-control me-2"
            value={dataVendita}
            onChange={(e) => setDataVendita(e.target.value)}
          />
          <button className="btn btn-primary" onClick={cercaPerData}>
            Cerca
          </button>
        </div>
      </div>

      {/* Messaggi */}
      {errore && <div className="alert alert-danger">{errore}</div>}
      {messaggio && <div className="alert alert-info">{messaggio}</div>}

      {/* Risultati */}
      {risultati.length > 0 && (
        <div className="table-responsive mt-4">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Data Vendita</th>
                <th>Codice Fiscale Cliente</th>
                <th>Animale</th>
                <th>Prodotto</th>
                <th>Ricetta</th>
              </tr>
            </thead>
            <tbody>
              {risultati.map((v) => (
                <tr key={v.id}>
                  <td>{new Date(v.dataVendita).toLocaleDateString()}</td>
                  <td>{v.codiceFiscaleCliente}</td>
                  <td>
                    {dettagli[v.id]
                      ? `${dettagli[v.id].nomeAnimale} (${
                          dettagli[v.id].specie
                        })`
                      : v.animaleId}
                  </td>
                  <td>{dettagli[v.id]?.nomeProdotto || v.prodottoId}</td>
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

export default VenditeRicerca;
