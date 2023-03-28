import { Link } from "react-router-dom";
export default function Dfooter() {
  return (
    <div className="bottom-ftr" dir="rtl">
      <p>صفحات مرتبط:</p>
      <Link to="/" target="_blank">
        صفحه اصلی
      </Link>
      <Link to="/simulation" target="_blank">
        شبه سازی
      </Link>
      <Link to="/contact" target="_blank">
        تماس باما
      </Link>
    </div>
  );
}
