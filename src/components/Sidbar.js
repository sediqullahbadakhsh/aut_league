import { Link } from "react-router-dom";

export default function Sidbar({ setComponent }) {
  return (
    <div className="sidebar">
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
