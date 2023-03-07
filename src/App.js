import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Simulation from "./pages/Simulation";
import "./assets/App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/simulation" element={<Simulation />} />
      </Routes>
    </div>
  );
}

export default App;
