import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartProvider';

export default function Register() {
  const { registerUser } = useCart();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !username.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('Vui lòng nhập đầy đủ các trường bắt buộc.');
      return;
    }

    if (username.trim().length < 3) {
      setError('Tên đăng nhập phải có ít nhất 3 ký tự.');
      return;
    }

    if (password.trim().length < 3) {
      setError('Mật khẩu phải có ít nhất 3 ký tự.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }

    const res = registerUser({
      username: username.trim(),
      password: password.trim(),
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      address: address.trim(),
    });

    if (res.success) {
      navigate('/', { replace: true });
      return;
    }

    setError(res.message || 'Đăng ký thất bại');
  };

  return (
    <div className="container py-4" style={{ maxWidth: 680 }}>
      <div className="card p-4">
        <h3 className="mb-3">Tạo tài khoản</h3>
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Họ và tên</label>
            <input className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="mb-3">
            <label className="form-label">Tên đăng nhập</label>
            <input className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>

          <div className="row">
            <div className="col mb-3">
              <label className="form-label">Mật khẩu</label>
              <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="col mb-3">
              <label className="form-label">Xác nhận mật khẩu</label>
              <input type="password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
          </div>

          <div className="row">
            <div className="col mb-3">
              <label className="form-label">Số điện thoại</label>
              <input className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="col mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Địa chỉ giao hàng</label>
            <textarea className="form-control" rows={3} value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>

          <div className="d-flex gap-2 mb-2">
            <button className="btn btn-primary" type="submit">Tạo tài khoản</button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => navigate(-1)}>Quay lại</button>
          </div>

          <div className="text-center">
            <small>
              Đã có tài khoản? <a href="/login">Đăng nhập</a>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
}
