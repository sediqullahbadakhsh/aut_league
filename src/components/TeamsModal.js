import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTeam, updateTeam } from "../store/thunks/teamThunk";
import { GrClose } from "react-icons/gr";

export default function TeamsModal({
  setShow,
  setShowEdit,
  editData,
  setMessage,
  setShowSuccess,
}) {
  const [name, setName] = useState(editData?.name || "");
  const [nameError, setNameError] = useState("");
  const [category, setCategory] = useState(editData?.category || "");
  const [categoryError, setCategoryError] = useState("");
  const [phone, setPhone] = useState(editData?.phone || "");
  const [phoneError, setPhoneError] = useState("");
  const [address, setAddress] = useState(editData?.address || "");
  const [addressError, setAddressError] = useState("");
  const id = editData?.id;

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    let nameError = "";
    let categoryError = "";
    let phoneError = "";
    let addressError = "";

    if (!name) {
      nameError = "اسم تیم را وارد کنید";
    } else if (name.length < 4) {
      nameError = "اسم تیم باید بیشتر از 4 کاراکتر باشد";
    }
    if (!category) {
      categoryError = "دسته بندی را انتخاب کنید";
    }
    if (!phone) {
      phoneError = "شماره تماس را وارد کنید";
    } else if (phone.length < 10) {
      phoneError = "شماره تماس باید 10 رقم باشد";
    }
    if (!address) {
      addressError = "آدرس را وارد کنید";
    }
    if (nameError || categoryError || phoneError || addressError) {
      setNameError(nameError);
      setCategoryError(categoryError);
      setPhoneError(phoneError);
      setAddressError(addressError);
    } else {
      if (setShowEdit) {
        setMessage("تیم با موفقیت ویرایش شد");
        setShowSuccess(true);
        dispatch(updateTeam({ id, name, category, phone, address }));
        setShowEdit(false);
      } else {
        setMessage("تیم با موفقیت ایجاد شد");
        dispatch(addTeam({ name, category, phone, address }));
        setShow(false);
      }
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
            <GrClose />
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
            <label className="error">{nameError}</label>
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
            <label className="error">{categoryError}</label>
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
            <label className="error">{phoneError}</label>
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
            <label className="error">{addressError}</label>
          </div>
          <button type="submit">ثبت</button>
        </div>
      </form>
    </div>
  );
}
