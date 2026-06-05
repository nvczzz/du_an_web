import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartProvider';

export default function Login() {
  const { loginUser } = useCart();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Vui lòng nhập tên đăng nhập và mật khẩu.');
      return;
    }

    const res = loginUser(username.trim(), password.trim());
    if (res.success) {
      navigate('/', { replace: true });
      return;
    }

    setError(res.message || 'Đăng nhập thất bại');
  };

  return (
    <div className="container py-4" style={{ maxWidth: 680 }}>
      <div className="card p-4">
        <h3 className="mb-3">Đăng nhập</h3>
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Tên đăng nhập</label>
            <input className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>

          <div className="mb-3">
            <label className="form-label">Mật khẩu</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className="d-flex gap-2 mb-3">
            <button className="btn btn-primary" type="submit">Đăng nhập</button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => navigate(-1)}>Quay lại</button>
          </div>

          <div className="text-center">
            <small>
              Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
}
