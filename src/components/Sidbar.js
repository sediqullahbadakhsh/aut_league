import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/thunks/userThunk";

export default function Sidbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // logout page
  const handleLogout = (e) => {
    dispatch(logout())
      .then(() => {
        navigate("/");
      })
      .then(() => {
        window.location.reload();
      });
  };

  return (
    <div className="sidebar">
      <div>
        <h2 className="sidebar-heading">منو</h2>
      </div>
      <div className="menu-list">
        <Link to="/dashboard">داشبورد</Link>
        <Link to="/dashboard/league/members">اعضا</Link>
        <Link to="/dashboard/league/teams">تیم ها</Link>
      </div>
      <p style={{ cursor: "pointer", padding: "10px" }} onClick={handleLogout}>
        خروج
      </p>
    </div>
  );
}
