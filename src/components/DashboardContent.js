import { useEffect } from "react";
import { fetchTeam } from "../store/thunks/teamThunk";
import { fetchMember } from "../store/thunks/memberThunk";
import { useThunk } from "../hooks/use-thunk";
import { event_date } from "../store/baseURL";
import { useSelector } from "react-redux";

export default function DashboardContent() {
  const teams = useSelector((state) => state.teams.data.teams);
  const members = useSelector((state) => state.members.data.members);
  const [doFetchTeam, isLoadingTeam, loadingTeamError] = useThunk(fetchTeam);
  const [doFetchMember, isLoadingMember, loadingMemberError] =
    useThunk(fetchMember);
  useEffect(() => {
    doFetchTeam();
    doFetchMember();
  }, [doFetchTeam, doFetchMember]);

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
