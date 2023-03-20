import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addMember, updateMember } from "../store/thunks/memberThunk";
import { GrClose } from "react-icons/gr";

function MembersModal({
  setShow,
  setShowEdit,
  editData,
  setMessage,
  setShowSuccess,
}) {
  const [name, setName] = useState(editData?.["first-name"] || "");
  const [nameError, setNameError] = useState("");
  const [lname, setLname] = useState(editData?.["last-name"] || "");
  const [lnameError, setLnameError] = useState("");
  const [age, setAge] = useState(editData?.age || "");
  const [ageError, setAgeError] = useState("");
  const [phone, setPhone] = useState(editData?.phone || "");
  const [phoneError, setPhoneError] = useState("");
  const [email, setEmail] = useState(editData?.email || "");
  const [emailError, setEmailError] = useState("");
  const id = editData?.id;

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    let nameError = "";
    let lnameError = "";
    let ageError = "";
    let phoneError = "";
    let emailError = "";
    if (!name) {
      nameError = "اسم را وارد کنید";
    } else if (name.length < 4) {
      nameError = "اسم باید بیشتر از 4 کاراکتر باشد";
    }
    if (!lname) {
      lnameError = "اسم فامیل را وارد کنید";
    } else if (lname.length < 4) {
      lnameError = "اسم فامیل باید بیشتر از 4 کاراکتر باشد";
    }
    if (!age) {
      ageError = "سن را وارد کنید";
    }
    if (!phone) {
      phoneError = "شماره تماس را وارد کنید";
    }
    if (!email) {
      emailError = "ایمیل را وارد کنید";
    }
    if (nameError || lnameError || ageError || phoneError || emailError) {
      setNameError(nameError);
      setLnameError(lnameError);
      setAgeError(ageError);
      setPhoneError(phoneError);
      setEmailError(emailError);
    } else {
      if (setShowEdit) {
        setMessage("اطلاعات با موفقیت ویرایش شد");
        setShowSuccess(true);
        dispatch(updateMember({ id, name, lname, age, phone, email }));
        setShowEdit(false);
      } else {
        setMessage("اطلاعات با موفقیت ثبت شد");
        setShowSuccess(true);
        dispatch(addMember({ name, lname, age, phone, email }));
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
              اسم :
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
            <label className="error">{lnameError}</label>
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
            <label className="error">{ageError}</label>
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
            <label className="error">{phoneError}</label>
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
            <label className="error">{emailError}</label>
          </div>

          <button type="submit">ثبت</button>
        </div>
      </form>
    </div>
  );
}

export default MembersModal;
