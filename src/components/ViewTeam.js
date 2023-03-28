import React, { useState } from "react";
import { GrClose } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  useAddTeamMemberMutation,
  useRemoveTeamMemberMutation,
} from "../store/slices/teamMeberApi";
import { useFetchTeamsQuery } from "../store/slices/teamApi";
import { useFetchMembersQuery } from "../store/slices/memberApi";

export default function ViewTeam({ setViewTeam, viewData }) {
  const [memberrId, setMemberId] = useState("");
  const teamId = viewData.id;
  const [addTeamMember] = useAddTeamMemberMutation();
  const [removeTeamMember] = useRemoveTeamMemberMutation();
  const { data: teams, refetch } = useFetchTeamsQuery();
  const { data: members } = useFetchMembersQuery();

  const teamMember = teams.filter((team) => team.id === viewData.id);
  console.log(teamMember);
  console.log(teamMember[0]?.members);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const memberId = parseInt(memberrId);
      await addTeamMember({ teamId, memberId }).unwrap();
      refetch();
    } catch (err) {
      console.error("Error adding team member:", err);
    }
  };

  const handleRemove = async (id) => {
    try {
      const memberId = parseInt(id, 10);
      await removeTeamMember({ teamId, memberId: memberId }).unwrap();
      refetch();
    } catch (err) {
      console.error("Error removing team member:", err);
    }
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
                value={memberrId}
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
            {teamMember[0]?.members.map((member) => {
              return (
                <div className="members-row" key={member.id}>
                  <p>{member["first-name"]}</p>
                  <p>{member["last-name"]}</p>
                  <p>{member.phone}</p>
                  <span
                    className="delete-btn"
                    onClick={() => handleRemove(member.id)}
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
