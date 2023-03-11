import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/thunks/userThunk";
import "../assets/navbar.css";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [token, setToken] = useState();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    return setToken(storedToken);
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setToken(null);
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="header">
      <div>
        <p>Logo</p>
      </div>
      <nav dir="RTL">
        <ul className="navbar">
          <li className="navbar-item">
            <Link to="/">صفحه اصلی</Link>
          </li>
          <li className="navbar-item">
            <a href="#"></a>
          </li>
          <li className="navbar-item">
            <a href="#">لیگ ها</a>
            <ul className="navbar-dropdown">
              <li className="navbar-dropdown-item">
                <Link to="/simulation">شبه سازی</Link>
              </li>
              <li className="navbar-dropdown-item">
                <a href="#" disabled>
                  فزیکی
                </a>
              </li>
            </ul>
          </li>
          {token && (
            <li className="navbar-item">
              <Link to="/dashboard">دشبورد</Link>
            </li>
          )}
          <li className="navbar-item">
            <Link to="/contact">تماس باما</Link>
          </li>
        </ul>
      </nav>
      <div>
        {token ? (
          <p style={{ cursor: "pointer" }} onClick={handleLogout}>
            خروج
          </p>
        ) : (
          <Link to="/signin">ثبت نام/ورود</Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
