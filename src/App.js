import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import MainPage from "./pages/MainPage";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Simulation from "./pages/Simulation";
import "./assets/App.css";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NoPage from "./pages/NoPage";
import { useEffect, useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import { useDispatch } from "react-redux";

function App() {
  const location = useLocation();
  const [Disappear, setDisappear] = useState();
  const [hidNav, setHidNav] = useState(false);

  const isSignedIn = Disappear;
  useEffect(() => {
    const hiddenRoutes = [
      "/signin",
      "/signup",
      "/dashboard",
      "/dashboard/league/teams",
      "/dashboard/league/members",
    ];
    setHidNav(hiddenRoutes.includes(location.pathname));
  }, [location.pathname, Disappear]);

  return (
    <div className="App">
      {hidNav ? null : <Navbar />}
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute isSignedIn={isSignedIn}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/simulation" element={<Simulation />} />
        <Route path="/signin" element={<Login setDisappear={setDisappear} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </div>
  );
}

export default App;
