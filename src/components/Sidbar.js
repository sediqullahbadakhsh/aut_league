import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/thunks/userThunk";

export default function Sidbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // logout page
  const handleLogout = (e) => {
    dispatch(logout());
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="sidebar">
      <div>
        <p style={{ cursor: "pointer" }} onClick={handleLogout}>
          خروج
        </p>
      </div>
      <ul>
        <li>
          <Link style={{ color: "black" }} to="/dashboard">
            داشبورد
          </Link>
        </li>
        <li>
          <Link style={{ color: "black" }} to="/dashboard/league/members">
            اعضا
          </Link>
        </li>
        <li>
          <Link style={{ color: "black" }} to="/dashboard/league/teams">
            تیم ها
          </Link>
        </li>
      </ul>
    </div>
  );
}
