import { Link } from "react-router-dom";
import "../assets/navbar.css";
function Navbar() {
  return (
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
              <a href="#">فزیکی</a>
            </li>
          </ul>
        </li>
        <li className="navbar-item">
          <Link to="/dashboard">دشبورد</Link>
        </li>
        <li className="navbar-item">
          <Link to="/contact">تماس باما</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
