import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addMember, updateMember } from "../store/thunks/memberThunk";

function MembersModal({ setShow, setShowEdit, editData }) {
  const [name, setName] = useState(editData?.["first-name"] || "");
  const [lname, setLname] = useState(editData?.["last-name"] || "");
  const [age, setAge] = useState(editData?.age || "");
  const [phone, setPhone] = useState(editData?.phone || "");
  const [email, setEmail] = useState(editData?.email || "");
  const id = editData?.id;

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (setShowEdit) {
      dispatch(updateMember({ id, name, lname, age, phone, email }));
      setShowEdit(false);
    } else {
      dispatch(addMember({ name, lname, age, phone, email }));
      setShow(false);
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <div className="modal-content ">
          <p
            className="close-btn"
            onClick={() => {
              setShowEdit && setShowEdit(false);
              setShow && setShow(false);
            }}
          >
            close
          </p>
          <h2>ایجاد تیم</h2>

          <div className="input-field">
            <label dir="rtl" htmlFor="name">
              اسم :
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="اسم تیم را وارد کنید"
            />
          </div>
          <div className="input-field">
            <label dir="rtl" htmlFor="name">
              اسم فامیل:
            </label>
            <input
              type="text"
              id="lname"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              placeholder="اسم تیم را وارد کنید"
            />
          </div>
          <div className="input-field">
            <label dir="rtl" htmlFor="name">
              سن:
            </label>
            <input
              type="text"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="اسم تیم را وارد کنید"
            />
          </div>
          <div className="input-field">
            <label dir="rtl" htmlFor="name">
              شماره تماس:
            </label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="اسم تیم را وارد کنید"
            />
          </div>

          <div className="input-field">
            <label dir="rtl" htmlFor="phone">
              ایمیل:
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="شماره تماس سرگروه تیم را وارد کنید"
            />
          </div>

          <button type="submit">ثبت</button>
        </div>
      </form>
    </div>
  );
}

export default MembersModal;
