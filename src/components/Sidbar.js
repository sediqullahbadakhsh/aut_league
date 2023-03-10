export default function Sidbar({ setComponent }) {
  return (
    <div className="sidebar">
      <ul>
        <li onClick={() => setComponent("dashboard")}>داشبورد</li>
        <li onClick={() => setComponent("members")}>اعضا</li>
        <li onClick={() => setComponent("teams")}>تیم ها</li>
      </ul>
    </div>
  );
}
