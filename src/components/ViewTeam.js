import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTeamMember,
  removeTeamMember,
} from "../store/thunks/teamMemberThunk";
import { fetchMember } from "../store/thunks/memberThunk";

export default function ViewTeam({ setViewTeam, viewData }) {
  const members = useSelector((state) => state.members.data.members);
  const [memberId, setMemberId] = useState();
  const [rmemberId, setRmemberId] = useState();
  const teamId = viewData.id;

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTeamMember({ teamId, memberId }));
  };
  useEffect(() => {
    dispatch(fetchMember());
  }, [dispatch, memberId]);

  const hundelRemove = (e) => {
    // e.preventDefault();
    dispatch(removeTeamMember({ teamId, rmemberId }));
  };
  const getMemberId = (id) => {
    console.log(id);
    setRmemberId(id);
    hundelRemove();
  };

  return (
    <div className="modal view-team">
      <div className="modal-content ">
        <p
          className="close-btn"
          onClick={() => {
            setViewTeam(false);
          }}
        >
          close
        </p>
        <div dir="rtl" className="team-info">
          <h2>اسم تیم:{viewData.name}</h2>
          <h2>
            {" "}
            دسته بندی:
            {viewData.category === 1 ? <p>شبه سازی</p> : <p>فزیکی</p>}
          </h2>
          <h2>شماره تماس:{viewData.phone}</h2>
          <h2>آدرس:{viewData.address}</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <label dir="rtl" htmlFor="member">
              انتخاب عضو
            </label>
            <select
              id="teamMember"
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
            >
              <option value="" disabled>
                انتخاب عضو
              </option>
              {members &&
                members.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member["first-name"]}
                  </option>
                ))}
            </select>
          </div>
          <button type="submit" className="btn">
            اضافه کردن
          </button>
        </form>
        <div>
          {viewData.members.map((member) => {
            return (
              <div style={{ display: "flex", gap: "10px" }} key={member.id}>
                <h2>{member["first-name"]}</h2>
                <button onClick={() => getMemberId(member.id)}>حذف</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
