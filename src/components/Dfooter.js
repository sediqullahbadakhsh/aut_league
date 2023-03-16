import { Link } from "react-router-dom";
export default function Dfooter() {
  return (
    <div className="bottom-ftr" dir="rtl">
      <p>صفحات مرتبط:</p>
      <Link to="/">صفحه اصلی</Link>
      <Link to="/simulation">شبه سازی</Link>
      <Link to="/contact">تماس باما</Link>
    </div>
  );
}
