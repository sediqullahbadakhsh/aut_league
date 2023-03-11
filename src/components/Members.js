import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMember, removeMember } from "../store/thunks/memberThunk";
import MembersModal from "./MembersModal";

function Members() {
  const members = useSelector((state) => state.members.data.members);
  const [showEdit, setShowEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [editData, setEditData] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMember());
  }, [show, dispatch, showEdit]);
  const hundelRemove = (id) => {
    dispatch(removeMember({ id }));
  };

  return (
    <div dir="rtl">
      <h1>اعضا</h1>
      <button onClick={() => setShow(true)}>افزودن عضو</button>
      {show && <MembersModal setShow={setShow} />}
      <div>
        <div className="heading"></div>
        <div className="data"></div>
      </div>
      <table>
        <thead>
          <tr>
            <th>نام</th>
            <th>نام فامیلی</th>
            <th>سن</th>
            <th>شماره تماس</th>
            <th>ایمیل</th>
            <th>اکشن</th>
          </tr>
        </thead>
        <tbody>
          {members &&
            members.map((member) => (
              <tr key={member.id}>
                <td>{member["first-name"]}</td>
                <td>{member["last-name"]}</td>
                <td>{member.age}</td>
                <td>{member.phone}</td>
                <td>{member.email}</td>
                <td style={{ display: "flex", gap: "5px", cursor: "pointer" }}>
                  <p
                    onClick={() => {
                      setShowEdit(true);
                      setEditData(member);
                    }}
                  >
                    edit
                  </p>
                  {showEdit && (
                    <MembersModal
                      setShowEdit={setShowEdit}
                      editData={editData}
                    />
                  )}
                  <p onClick={() => hundelRemove(member.id)}>remove</p>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Members;
