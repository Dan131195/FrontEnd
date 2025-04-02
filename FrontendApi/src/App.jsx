import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarComponent from "./Components/NavbarComponent";
import AnimaleList from "./Components/AnimaleList";
import AnimaleForm from "./Components/AnimaleForm";
import VisitaForm from "./Components/VisitaForm";
import VenditaForm from "./Components/VenditaForm";
import VenditaList from "./Components/VenditaList";
import RicoveriList from "./Components/RicoveriList";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const App = () => {
  return (
    <Router>
      <NavbarComponent />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<AnimaleList />} />
          <Route path="/animali/nuovo" element={<AnimaleForm />} />
          <Route path="/visite/nuova" element={<VisitaForm />} />
          <Route path="/vendite/nuova" element={<VenditaForm />} />
          <Route path="/vendite" element={<VenditaList />} />
          <Route path="/ricoveri" element={<RicoveriList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
