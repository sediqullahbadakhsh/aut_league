import React from "react";
import { Link } from "react-router-dom";
import "../assets/navbar.css";

function Navbar() {
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
          <li className="navbar-item">
            <Link to="/contact">تماس باما</Link>
          </li>
        </ul>
      </nav>
      <div>
        {" "}
        <Link to="/signin">ثبت نام/ورود</Link>
      </div>
    </div>
  );
}

export default Navbar;
