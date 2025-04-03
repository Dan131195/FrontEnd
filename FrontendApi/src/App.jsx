import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarComponent from "./Components/NavbarComponent";
import AnimaleList from "./Components/AnimaleList";
import AnimaleForm from "./Components/AnimaleForm";
import VisitaForm from "./Components/VisitaForm";
import VisiteList from "./Components/VisiteListe";
import VenditaForm from "./Components/VenditaForm";
import VenditaList from "./Components/VenditaList";
import RicoveriAttiviList from "./Components/RicoveriAttiviList";
import RicoveriList from "./Components/RicoveriList.jsx";
import HomePage from "./Components/HomePage";
import AnimaleEditForm from "./Components/AnimaleEditForm";
import RicoveroEditForm from "./Components/RicoveroEditForm";
import PrivateRoute from "./Components/PrivateRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import AnimaleDettaglio from "./Components/AnimaleDettaglio";
import RicoveroDettaglio from "./Components/RicoveroDettaglio.jsx";
import LoginForm from "./Components/LoginForm";
import RegistrationForm from "./Components/RegistrationForm";
import ProdottoEditForm from "./Components/ProdottoEditForm.jsx";
import ProdottoDettaglio from "./Components/ProdottoDettaglio.jsx";
import ProdottoForm from "./Components/ProdottoForm.jsx";
import ProdottoList from "./Components/ProdottoList.jsx";
import RicoveroForm from "./Components/RicoveroForm.jsx";
import VenditaInternaForm from "./Components/VenditaInternaForm";
import VenditeInterneList from "./Components/VenditeInterneList.jsx";
import RicercaMicrochip from "./Components/RicercaMicrochip.jsx";
import FooterComponent from "./Components/FooterComponent.jsx";

const App = () => {
  return (
    <Router>
      <div className="page-wrapper d-flex flex-column min-vh-100">
        <NavbarComponent />

        <main className="flex-grow-1 mt-4 mainContainer">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/registrati" element={<RegistrationForm />} />

            <Route path="/animali/list" element={<AnimaleList />} />
            <Route path="/animali/nuovo" element={<AnimaleForm />} />
            <Route path="/animali/modifica/:id" element={<AnimaleEditForm />} />
            <Route
              path="/animali/dettaglio/:id"
              element={<AnimaleDettaglio />}
            />

            <Route path="/visite/nuova" element={<VisitaForm />} />
            <Route path="/visite" element={<VisiteList />} />

            <Route path="/ricoveri" element={<RicoveriList />} />
            <Route path="/ricoveri/attivi" element={<RicoveriAttiviList />} />
            <Route path="/ricovero/nuovo" element={<RicoveroForm />} />
            <Route
              path="/ricovero/modifica/:id"
              element={<RicoveroEditForm />}
            />
            <Route
              path="/ricovero/dettaglio/:id"
              element={<RicoveroDettaglio />}
            />
            <Route path="/ricerca/microchip" element={<RicercaMicrochip />} />

            <Route
              path="/prodotto/modifica/:id"
              element={<ProdottoEditForm />}
            />
            <Route
              path="/prodotto/dettaglio/:id"
              element={<ProdottoDettaglio />}
            />
            <Route path="/prodotto/nuovo" element={<ProdottoForm />} />
            <Route path="/prodotti" element={<ProdottoList />} />

            <Route path="/vendite-interne" element={<VenditeInterneList />} />
            <Route path="/vendite/nuova" element={<VenditaForm />} />
            <Route path="/vendite" element={<VenditaList />} />
            <Route
              path="/vendite-interne/nuova"
              element={<VenditaInternaForm />}
            />
          </Routes>
        </main>

        <FooterComponent />
      </div>
    </Router>
  );
};

export default App;
