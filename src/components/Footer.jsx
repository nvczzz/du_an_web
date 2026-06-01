import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="glass-card mt-5 p-5 position-relative overflow-hidden text-start">
      <div className="row g-4 position-relative" style={{ zIndex: 1 }}>
        
        {/* Brand & GPP Cert */}
        <div className="col-lg-4 col-md-6">
          <Link className="navbar-brand d-flex align-items-center gap-2 mb-3" to="/">
            <span className="brand-name fw-800 fs-4 text-teal">MediCare</span>
          </Link>
          <p className="text-muted small lh-lg" style={{ maxWidth: '300px' }}>
            Medicare là hệ thống nhà thuốc chuẩn GPP hàng đầu Việt Nam. Chúng tôi cam kết mang lại sự an tâm tuyệt đối về chất lượng dược phẩm, giá bán bình ổn và tư vấn chuẩn y khoa.
          </p>
          <div className="d-flex align-items-center gap-2 mt-4 bg-light p-2.5 rounded-3 border w-fit" style={{ width: 'fit-content' }}>
            <div>
              <strong className="d-block small text-dark">Nhà Thuốc Đạt Chuẩn GPP</strong>
              <small className="text-muted small" style={{ fontSize: '0.75rem' }}>Cấp bởi Bộ Y Tế Việt Nam</small>
            </div>
          </div>
        </div>

        {/* Sitemap Nav Links */}
        <div className="col-lg-2 col-6">
          <h6 className="fw-bold text-dark mb-3">Medicare</h6>
          <ul className="list-unstyled d-flex flex-column gap-2 small">
            <li><Link to="/" className="text-decoration-none text-muted hover-teal">Trang chủ</Link></li>
            <li><Link to="/make-up" className="text-decoration-none text-muted hover-teal">Tủ thuốc</Link></li>
            <li><Link to="/cart" className="text-decoration-none text-muted hover-teal">Giỏ hàng</Link></li>
            <li><Link to="/profile" className="text-decoration-none text-muted hover-teal">Tài khoản</Link></li>
          </ul>
        </div>

        {/* Customer Policies */}
        <div className="col-lg-3 col-6">
          <h6 className="fw-bold text-dark mb-3">Chính sách mua hàng</h6>
          <ul className="list-unstyled d-flex flex-column gap-2 small">
            <li><a href="#rules" className="text-decoration-none text-muted hover-teal">Quy chế hoạt động</a></li>
            <li><a href="#ship" className="text-decoration-none text-muted hover-teal">Chính sách vận chuyển</a></li>
            <li><a href="#return" className="text-decoration-none text-muted hover-teal">Chính sách đổi trả thuốc</a></li>
            <li><a href="#privacy" className="text-decoration-none text-muted hover-teal">Bảo mật thông tin khách hàng</a></li>
          </ul>
        </div>

        {/* Contacts */}
        <div className="col-lg-3 col-md-6">
          <h6 className="fw-bold text-dark mb-3">Liên hệ Medicare</h6>
          <ul className="list-unstyled d-flex flex-column gap-2 small text-muted">
            <li className="d-flex align-items-start gap-2">
              <span>123 Đường Cách Mạng Tháng 8, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh</span>
            </li>
            <li className="d-flex align-items-center gap-2">
              <span>Hotline miễn cước: <strong>1800 6821</strong></span>
            </li>
            <li className="d-flex align-items-center gap-2">
              <span>cskh@medicare.vn</span>
            </li>
          </ul>
        </div>

      </div>

      <hr className="my-4" />

      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3 text-muted small">
        <span className="small">© 2026 MediCare Pharmacy. Thiết kế bởi Nguyen Van Chung. All rights reserved.</span>
        <div className="d-flex gap-3 small">
          <a href="#fb" className="text-decoration-none text-muted hover-teal">Facebook</a>
          <a href="#yt" className="text-decoration-none text-muted hover-teal">YouTube</a>
          <a href="#tt" className="text-decoration-none text-muted hover-teal">TikTok</a>
        </div>
      </div>
    </footer>
  );
}
