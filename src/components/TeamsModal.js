import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTeam, updateTeam } from "../store/thunks/teamThunk";

export default function TeamsModal({ setShow, setShowEdit, editData }) {
  const [name, setName] = useState(editData?.name || "");
  const [category, setCategory] = useState(editData?.category || "");
  const [phone, setPhone] = useState(editData?.phone || "");
  const [address, setAddress] = useState(editData?.address || "");
  const id = editData?.id;

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (setShowEdit) {
      dispatch(updateTeam({ id, name, category, phone, address }));
      setShowEdit(false);
    } else {
      dispatch(addTeam({ name, category, phone, address }));
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
              اسم تیم:
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
            <label dir="rtl" htmlFor="category">
              دسته بندی:
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">کتگوری را انتخاب کنید</option>
              <option value={1}>شبه سازی</option>
              <option value={2}>فزیکی</option>
            </select>
          </div>
          <div className="input-field">
            <label dir="rtl" htmlFor="phone">
              شماره تماس :
            </label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="شماره تماس سرگروه تیم را وارد کنید"
            />
          </div>
          <div className="input-field">
            <label dir="rtl" htmlFor="address">
              آدرس:
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="آدرس تیم را وارد کنید"
            />
          </div>
          <button type="submit">ثبت</button>
        </div>
      </form>
    </div>
  );
}
