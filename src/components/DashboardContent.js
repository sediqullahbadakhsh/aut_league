import { event_date } from "../store/baseURL";
import { useFetchTeamsQuery } from "../store/slices/teamApi";
import { useFetchMembersQuery } from "../store/slices/memberApi";

export default function DashboardContent() {
  const { data: teams } = useFetchTeamsQuery();
  const { data: members } = useFetchMembersQuery();

  return (
    <div className="dash-container" dir="rtl">
      <div className="card">
        <span>تعداد تیم ها</span>
        <span>{teams?.length}</span>
      </div>
      <div className="card">
        <span>مجموع اشتراک کننده گان</span>
        <span>{members?.length}</span>
      </div>
      <div className="card">
        <span>تاریخ برگزاری</span>
        <span>{event_date}</span>
      </div>
    </div>
  );
}
