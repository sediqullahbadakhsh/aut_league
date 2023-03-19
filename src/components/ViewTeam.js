import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GrClose } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";

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
    <div className="modal ">
      <div className="modal-content view-team">
        <div
          className="close-btn"
          onClick={() => {
            setViewTeam(false);
          }}
        >
          <GrClose />
        </div>
        <div dir="rtl" className="team-info">
          <div className="row">
            <div>
              <span style={{ fontWeight: "bold" }}>اسم تیم:</span>
              <span>{viewData.name}</span>
            </div>
            <div>
              <span style={{ fontWeight: "bold" }}>شماره تماس:</span>
              <span>{viewData.phone}</span>
            </div>
          </div>
          <div className="row">
            <div>
              <span style={{ fontWeight: "bold" }}>دسته بندی:</span>

              {viewData.category === 1 ? (
                <span>شبه سازی</span>
              ) : (
                <span>فزیکی</span>
              )}
            </div>
            <div>
              <span style={{ fontWeight: "bold" }}>آدرس:</span>
              <span>{viewData.address}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="add-member">
            <p dir="rtl" htmlFor="member">
              عضو را انتخاب کنید:
            </p>
            <div className="input-field">
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
                      {member["first-name"] + " " + member["last-name"]}
                    </option>
                  ))}
              </select>

              <button type="submit" className="btn">
                اضافه کردن
              </button>
            </div>
          </div>
        </form>
        <div className="members-list">
          <div className="members-heading">
            <p>نام عضو</p>
            <p>نام فامیلی</p>
            <p>شماره تماس</p>
            <p>اکشن</p>
          </div>
          <div className="members-content">
            {viewData.members.map((member) => {
              return (
                <div className="members-row" key={member.id}>
                  <p>{member["first-name"]}</p>
                  <p>{member["last-name"]}</p>
                  <p>{member.phone}</p>
                  <span
                    className="delete-btn"
                    onClick={() => getMemberId(member.id)}
                  >
                    <RiDeleteBin6Line />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
