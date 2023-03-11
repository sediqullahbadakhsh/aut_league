import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import DashboardContent from "../components/DashboardContent";
import Teams from "../components/Teams";
import Members from "../components/Members";
import Sidbar from "../components/Sidbar";

export default function Dashboard() {
  const [location, setLocation] = useState("/dashboard");
  const { pathname } = useLocation();

  if (location !== pathname) {
    setLocation(pathname);
  }
  return (
    <div dir="rtl" className=" dashboard">
      <Sidbar />
      <div className="dashboard-content">
        {location === "/dashboard" ? (
          <DashboardContent />
        ) : (
          <Routes>
            <Route path="/dashboard" element={<DashboardContent />} />
            <Route path="league/teams" element={<Teams />} />
            <Route path="league/members" element={<Members />} />
          </Routes>
        )}
      </div>
    </div>
  );
}
