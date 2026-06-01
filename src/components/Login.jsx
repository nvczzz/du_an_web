import React, { useState } from 'react';
import { useCart } from '../context/CartProvider';

export default function LoginModal({ show, handleClose }) {
  const { loginUser, registerUser } = useCart();
  const [isLoginView, setIsLoginView] = useState(true);

  const [loginUserVal, setLoginUserVal] = useState("");
  const [loginPassVal, setLoginPassVal] = useState("");
  const [loginErr, setLoginErr] = useState("");

  const [regName, setRegName] = useState("");
  const [regUser, setRegUser] = useState("");
  const [regPass, setRegPass] = useState("");
  const [regConfirmPass, setRegConfirmPass] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regAddress, setRegAddress] = useState("");
  const [regErr, setRegErr] = useState("");

  if (!show) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginErr("");

    if (!loginUserVal.trim() || !loginPassVal.trim()) {
      setLoginErr("Vui lòng nhập tên đăng nhập và mật khẩu.");
      return;
    }

    const res = loginUser(loginUserVal.trim(), loginPassVal.trim());
    if (res.success) {
      setLoginUserVal("");
      setLoginPassVal("");
      handleClose();
      return;
    }

    setLoginErr(res.message);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setRegErr("");

    if (!regName.trim() || !regUser.trim() || !regPass.trim() || !regConfirmPass.trim()) {
      setRegErr("Vui lòng nhập đầy đủ các trường bắt buộc.");
      return;
    }

    if (regUser.trim().length < 3) {
      setRegErr("Tên đăng nhập phải có ít nhất 3 ký tự.");
      return;
    }

    if (regPass.trim().length < 3) {
      setRegErr("Mật khẩu phải có ít nhất 3 ký tự.");
      return;
    }

    if (regPass !== regConfirmPass) {
      setRegErr("Mật khẩu xác nhận không khớp.");
      return;
    }

    const res = registerUser({
      username: regUser.trim(),
      password: regPass.trim(),
      name: regName.trim(),
      phone: regPhone.trim(),
      email: regEmail.trim(),
      address: regAddress.trim()
    });

    if (res.success) {
      setRegName("");
      setRegUser("");
      setRegPass("");
      setRegConfirmPass("");
      setRegPhone("");
      setRegEmail("");
      setRegAddress("");
      handleClose();
      return;
    }

    setRegErr(res.message);
  };

  const switchView = (nextIsLoginView) => {
    setIsLoginView(nextIsLoginView);
    setLoginErr("");
    setRegErr("");
  };

  return (
    <div className="auth-modal-backdrop" onMouseDown={handleClose}>
      <section
        className="auth-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <header className="auth-modal-header">
          <div>
            <p className="auth-modal-kicker">Tài khoản MediCare</p>
            <h3 id="auth-modal-title">
              {isLoginView ? "Đăng nhập" : "Tạo tài khoản"}
            </h3>
          </div>
          <button
            type="button"
            className="auth-close-button"
            onClick={handleClose}
            aria-label="Đóng"
          >
            X
          </button>
        </header>

        <div className="auth-tabs" role="tablist" aria-label="Chọn biểu mẫu tài khoản">
          <button
            type="button"
            className={`auth-tab ${isLoginView ? "active" : ""}`}
            onClick={() => switchView(true)}
          >
            Đăng nhập
          </button>
          <button
            type="button"
            className={`auth-tab ${!isLoginView ? "active" : ""}`}
            onClick={() => switchView(false)}
          >
            Đăng ký
          </button>
        </div>

        {isLoginView ? (
          <form onSubmit={handleLoginSubmit} className="auth-form">
            {loginErr && <div className="auth-alert">{loginErr}</div>}

            <label className="auth-field">
              <span>Tên đăng nhập</span>
              <input
                type="text"
                value={loginUserVal}
                onChange={(e) => setLoginUserVal(e.target.value)}
                autoComplete="username"
                placeholder="Nhập tên đăng nhập"
              />
            </label>

            <label className="auth-field">
              <span>Mật khẩu</span>
              <input
                type="password"
                value={loginPassVal}
                onChange={(e) => setLoginPassVal(e.target.value)}
                autoComplete="current-password"
                placeholder="Nhập mật khẩu"
              />
            </label>

            <button type="submit" className="auth-submit-button">
              Đăng nhập
            </button>

            <div className="auth-demo-note">
              <span>Tài khoản demo</span>
              <strong>user / 123</strong>
            </div>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="auth-form">
            {regErr && <div className="auth-alert">{regErr}</div>}

            <label className="auth-field">
              <span>Họ và tên</span>
              <input
                type="text"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                autoComplete="name"
                placeholder="Nhập họ và tên"
              />
            </label>

            <label className="auth-field">
              <span>Tên đăng nhập</span>
              <input
                type="text"
                value={regUser}
                onChange={(e) => setRegUser(e.target.value)}
                autoComplete="username"
                placeholder="Tối thiểu 3 ký tự"
              />
            </label>

            <div className="auth-field-grid">
              <label className="auth-field">
                <span>Mật khẩu</span>
                <input
                  type="password"
                  value={regPass}
                  onChange={(e) => setRegPass(e.target.value)}
                  autoComplete="new-password"
                  placeholder="Mật khẩu"
                />
              </label>

              <label className="auth-field">
                <span>Xác nhận mật khẩu</span>
                <input
                  type="password"
                  value={regConfirmPass}
                  onChange={(e) => setRegConfirmPass(e.target.value)}
                  autoComplete="new-password"
                  placeholder="Nhập lại mật khẩu"
                />
              </label>
            </div>

            <div className="auth-field-grid">
              <label className="auth-field">
                <span>Số điện thoại</span>
                <input
                  type="tel"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  autoComplete="tel"
                  placeholder="Số điện thoại"
                />
              </label>

              <label className="auth-field">
                <span>Email</span>
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  autoComplete="email"
                  placeholder="Email"
                />
              </label>
            </div>

            <label className="auth-field">
              <span>Địa chỉ giao hàng</span>
              <textarea
                rows="3"
                value={regAddress}
                onChange={(e) => setRegAddress(e.target.value)}
                autoComplete="street-address"
                placeholder="Số nhà, tên đường, quận/huyện"
              />
            </label>

            <button type="submit" className="auth-submit-button">
              Tạo tài khoản
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
