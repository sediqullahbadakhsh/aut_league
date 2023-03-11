import { Link } from "react-router-dom";

export default function Sidbar({ setComponent }) {
  return (
    <div className="sidebar">
      <ul>
        {/* <li onClick={() => setComponent("dashboard")}>داشبورد</li>
        <li onClick={() => setComponent("members")}>اعضا</li>
        <li onClick={() => setComponent("teams")}>تیم ها</li> */}
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
