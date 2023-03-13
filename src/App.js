import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
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

function App() {
  const [isLogin, setIsLogin] = useState();
  const [Disappear, setDisappear] = useState(false);
  useEffect(() => {
    setIsLogin(localStorage.getItem("token"));
  }, []);
  const isSignedIn = isLogin;
  console.log(Disappear);
  return (
    <div className="App">
      {isLogin || Disappear ? null : <Navbar />}
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
