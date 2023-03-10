import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/thunks/userThunk";
export default function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    let emailError = "";
    let passwordError = "";

    // Validate email
    if (!email) {
      emailError = "ایمیل الزامی است!";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      emailError = "لطفا یک ایمیل معتبر وارد کنید!";
    }

    // Validate password
    if (!password) {
      passwordError = "رمز عبور الزامی است!";
    } else if (password.length < 6) {
      passwordError = "رمز عبور باید حداقل ۶ کاراکتر باشد!";
    }

    if (emailError || passwordError) {
      setEmailError(emailError);
      setPasswordError(passwordError);
    } else {
      await dispatch(login({ email, password }));
      navigate("/dashboard");
    }
  }

  return (
    <div className="container">
      {" "}
      <div className="form-container">
        <h1>ورود</h1>
        <form onSubmit={handleSubmit}>
          <div className="user-form">
            <div className="input-field">
              <label dir="rtl">لطفا ایمیل خود را وارد کنید!</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="someting@domain.com"
              />
              {emailError && <span className="error">{emailError}</span>}
            </div>
            <div className="input-field">
              <label dir="rtl">لطفا پسورد خود را وارد کنید!</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              {passwordError && <span className="error">{passwordError}</span>}
            </div>

            <button className="login-btn" type="submit">
              ورود
            </button>
          </div>
        </form>
        <Link style={{ color: "#000" }} to="/signup">
          <button className="login-btn">ثبت نام</button>
        </Link>
      </div>
    </div>
  );
}
