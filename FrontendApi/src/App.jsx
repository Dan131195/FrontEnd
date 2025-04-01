import "./App.css";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  return (
    <>
      <MyNavbar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<PagError />} />
        </Routes>
      </Container>
      <MyFooter />
    </>
  );
}

export default App;
