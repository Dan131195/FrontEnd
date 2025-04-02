import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const AnimaleList = () => {
  const [animali, setAnimali] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAnimali();
  }, []);

  const fetchAnimali = async () => {
    try {
      const res = await fetch("https://localhost:7028/api/animale");
      if (!res.ok) throw new Error("Errore nel recupero degli animali");
      const data = await res.json();
      setAnimali(data);
    } catch (err) {
      console.error("Errore nel recupero degli animali:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Sei sicuro di voler eliminare questo animale?"))
      return;

    try {
      const res = await fetch(`https://localhost:7028/api/animale/${id}`, {
        method: "DELETE",
      });
      console.log(id);
      if (!res.ok) throw new Error("Errore nella cancellazione");
      setAnimali(animali.filter((a) => a.id !== id));
      fetchAnimali();
    } catch (err) {
      console.error("Errore durante la cancellazione:", err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/animali/modifica/${id}`);
  };

  return (
    <div className="card p-4">
      <h2 className="mb-3 text-center">Elenco Animali Registrati</h2>

      <Link className="btn btn-primary mb-4 w-25 m-auto" to="/animali/nuovo">
        Registra Animale
      </Link>

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
                <th>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {animali.map((a) => (
                <tr key={a.id}>
                  {console.log(a.animaleId)}
                  <td>{a.nomeAnimale}</td>
                  <td>{a.tipologia}</td>
                  <td>{a.coloreMantello}</td>
                  <td>{new Date(a.dataNascita).toLocaleDateString()}</td>
                  <td>{a.microchipPresente ? a.numeroMicrochip : "No"}</td>
                  <td>{a.codiceFiscaleProprietario}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(a.animaleId)}
                    >
                      Modifica
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(a.animaleId)}
                    >
                      Elimina
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

export default AnimaleList;
