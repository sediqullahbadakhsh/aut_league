import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/thunks/userThunk";

export default function Login({ setDisappear }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  const hideModal = () => {
    setShowModal(false);
    setModalMessage("");
  };

  const handleSubmit = async (e) => {
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
    }

    if (emailError || passwordError) {
      setEmailError(emailError);
      setPasswordError(passwordError);
      setShowModal(true);
      setModalMessage("Validation error");
    } else {
      try {
        await dispatch(login({ email, password })).unwrap();
        setDisappear(localStorage.getItem("token"));
        navigate("/dashboard");
      } catch (error) {
        setShowModal(true);
        setModalMessage("رمز یا ایمیل اشتباه است!");
      }
    }
  };
  useEffect(() => {
    if (showModal) {
      const timeoutId = setTimeout(hideModal, 3000); // hide the modal after 3 seconds
      return () => clearTimeout(timeoutId);
    }
  }, [showModal]);
  return (
    <div className="container">
      {showModal && (
        <div className="warning">
          <h2>{modalMessage}</h2>
        </div>
      )}{" "}
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
              {emailError && (
                <span dir="rtl" className="error">
                  {emailError}
                </span>
              )}
            </div>
            <div className="input-field">
              <label dir="rtl">لطفا پسورد خود را وارد کنید!</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              {passwordError && (
                <span dir="rtl" className="error">
                  {passwordError}
                </span>
              )}
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
