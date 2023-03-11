import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeam, removeTeam } from "../store/thunks/teamThunk";
import TeamsModal from "./TeamsModal";

function Teams() {
  const teams = useSelector((state) => state.teams.data.teams);
  const [showEdit, setShowEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [editData, setEditData] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTeam());
  }, [show, dispatch, showEdit]);
  const hundelRemove = (id) => {
    dispatch(removeTeam({ id }));
  };

  return (
    <div dir="rtl">
      <h1>تیم ها</h1>
      <button onClick={() => setShow(true)}>ایجاد تیم</button>
      {show && <TeamsModal setShow={setShow} />}
      <div>
        <div className="heading"></div>
        <div className="data"></div>
      </div>
      <table>
        <thead>
          <tr>
            <th>نام</th>
            <th>دسته بندی</th>
            <th>تلفن</th>
            <th>آدرس</th>
            <th>اکشن</th>
          </tr>
        </thead>
        <tbody>
          {teams &&
            teams.map((team) => (
              <tr key={team.id}>
                <td>{team.name}</td>
                {team.category === 1 ? <td>شبه سازی</td> : <td>فزیکی</td>}
                <td>{team.phone}</td>
                <td>{team.address}</td>
                <td style={{ display: "flex", gap: "5px", cursor: "pointer" }}>
                  <p
                    onClick={() => {
                      setShowEdit(true);
                      setEditData(team);
                    }}
                  >
                    edit
                  </p>
                  {showEdit && (
                    <TeamsModal setShowEdit={setShowEdit} editData={editData} />
                  )}
                  <p onClick={() => hundelRemove(team.id)}>remove</p>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Teams;
