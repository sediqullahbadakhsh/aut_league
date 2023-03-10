import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../store/thunks/userThunk";

export default function Signup() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");

  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();

    let emailError = "";
    let passwordError = "";
    let nameError = "";

    if (!name) {
      nameError = "نام الزامی است!";
    } else if (name.length < 4) {
      nameError = "نام باید حداقل 4 کاراکتر باشد!";
    }
    if (!email) {
      emailError = "ایمیل الزامی است!";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      emailError = "لطفا یک ایمیل معتبر وارد کنید!";
    }
    if (!password) {
      passwordError = "رمز عبور الزامی است!";
    } else if (password.length < 8) {
      passwordError = "رمز عبور باید حداقل 8 کاراکتر باشد!";
    }
    if (emailError || passwordError || nameError) {
      setEmailError(emailError);
      setPasswordError(passwordError);
      setNameError(nameError);
    } else {
      await dispatch(addUser({ email, password, name }));
      navigate("/signin");
    }
  }

  return (
    <div className="container">
      <div className="form-container">
        <h1>ثبت نام</h1>
        <form onSubmit={handleSubmit}>
          <div className="user-form">
            <div className="input-field">
              <label dir="rtl">لطفا نام خود را وارد کنید!</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. John Doe"
              />
              {nameError && (
                <span dir="rtl" className="error">
                  {nameError}
                </span>
              )}
            </div>
            <div className="input-field">
              <label dir="rtl">لطفا ایمیل خود را وارد کنید!</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="someting@domain.com"
              />
              {emailError && (
                <span dir="rtl" className="error">
                  {emailError}
                </span>
              )}
            </div>
            <div className="input-field">
              <label dir="rtl">لطفا رمز عبور خود را وارد کنید!</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="پسورد خود را وارد کنید"
              />
              {passwordError && (
                <span dir="rtl" className="error">
                  {passwordError}
                </span>
              )}
            </div>
            <button className="login-btn" type="submit">
              ثبت
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
