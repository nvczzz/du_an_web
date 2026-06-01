import React, { useMemo, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartProvider';
import LoginModal from './Login';

const normalizeText = (value = "") =>
  String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export default function Menu() {
  const { cart, currentUser, logoutUser, products } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  // Hàm kiểm tra nút nào đang active dựa theo đường dẫn hiện tại
  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const searchSuggestions = useMemo(() => {
    const keyword = normalizeText(searchTerm.trim());
    if (!keyword || !Array.isArray(products)) return [];

    return products
      .filter((product) => {
        const searchableText = [
          product.name,
          product.category,
          product.brand,
          product.uses,
          product.description
        ].map(normalizeText).join(" ");

        return searchableText.includes(keyword);
      })
      .slice(0, 6);
  }, [products, searchTerm]);

  const runSearch = (term = searchTerm) => {
    const cleanTerm = term.trim();
    if (!cleanTerm) return;

    navigate(`/make-up?search=${encodeURIComponent(cleanTerm)}`);
    setSearchTerm("");
    setShowSuggestions(false);
    setIsNavCollapsed(true);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    runSearch();
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (product) => {
    runSearch(product.name);
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const renderSearchSuggestions = () => {
    if (!showSuggestions || !searchTerm.trim()) return null;

    return (
      <div className="search-suggestions-panel">
        {searchSuggestions.length > 0 ? (
          searchSuggestions.map((product) => (
            <button
              type="button"
              key={product.id}
              className="search-suggestion-item"
              onMouseDown={(e) => {
                e.preventDefault();
                handleSuggestionClick(product);
              }}
            >
              <span className="search-suggestion-content">
                <span className="search-suggestion-name">{product.name}</span>
                <span className="search-suggestion-meta">
                  {product.category} · {product.brand}
                </span>
              </span>
              <span className="search-suggestion-price">
                {Number(product.price || 0).toLocaleString()}đ
              </span>
            </button>
          ))
        ) : (
          <div className="search-suggestion-empty">Không có gợi ý phù hợp</div>
        )}
      </div>
    );
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-glass py-3 px-3 mb-4 sticky-top">
        <div className="container-fluid gap-2">
          {/* Logo brand */}
          <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
            <span className="brand-name fw-800 fs-4 text-teal">MediCare</span>
          </Link>

          {/* Search bar form */}
          <form onSubmit={handleSearchSubmit} className="d-none d-lg-flex mx-auto position-relative align-items-center" style={{ width: '40%' }}>
            <input 
              type="text" 
              className="form-control form-glass rounded-pill py-2.5 ps-4 pe-5 border" 
              placeholder="Tìm kiếm thuốc, dược phẩm, triệu chứng..."
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setShowSuggestions(false)}
              style={{ fontSize: '0.9rem' }}
            />
            <button 
              type="submit" 
              className="btn btn-link text-teal border-0 position-absolute end-0 me-3 p-0 search-text-button"
            >
              Tìm
            </button>
            {renderSearchSuggestions()}
          </form>

          {/* Hamburger toggle for mobile */}
          <button 
            className="navbar-toggler border-0" 
            type="button" 
            onClick={() => setIsNavCollapsed(!isNavCollapsed)}
            aria-controls="navbarNav" 
            aria-expanded={!isNavCollapsed} 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Nav links collapsable */}
          <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse justify-content-end`} id="navbarNav">
            <ul className="navbar-nav align-items-lg-center gap-3 mt-3 mt-lg-0 text-start">
              <li className="nav-item">
                <Link
                  className={`btn-nav-link d-inline-flex align-items-center gap-1 text-decoration-none ${isActive('/') ? 'active-nav' : ''}`}
                  to="/"
                  onClick={() => setIsNavCollapsed(true)}
                >
                  Trang chủ
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`btn-nav-link d-inline-flex align-items-center gap-1 text-decoration-none ${isActive('/make-up') ? 'active-nav' : ''}`}
                  to="/make-up"
                  onClick={() => setIsNavCollapsed(true)}
                >
                  Danh sách thuốc
                </Link>
              </li>
              
              {/* Dynamic search inside mobile collapse */}
              <li className="nav-item d-block d-lg-none mt-2">
                <form onSubmit={handleSearchSubmit} className="position-relative d-flex align-items-center">
                  <input 
                    type="text" 
                    className="form-control form-glass rounded-pill py-2 ps-3 pe-5 w-100" 
                    placeholder="Tìm tên thuốc..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setShowSuggestions(false)}
                    style={{ fontSize: '0.85rem' }}
                  />
                  <button type="submit" className="btn btn-link text-teal position-absolute end-0 me-2 p-0 border-0 search-text-button">Tìm</button>
                  {renderSearchSuggestions()}
                </form>
              </li>

              {/* Cart badge link — pill xanh nổi bật riêng */}
              <li className="nav-item">
                <Link className="btn-cart-nav d-inline-flex align-items-center gap-1 text-decoration-none" to="/cart" onClick={() => setIsNavCollapsed(true)}>
                  Giỏ hàng
                  {cartItemsCount > 0 && (
                    <span className="cart-badge-count">
                      {cartItemsCount}
                    </span>
                  )}
                </Link>
              </li>

              {/* User accounts options */}
              {currentUser ? (
                <li className="nav-item">
                  <div className="d-flex align-items-center gap-2">
                    {/* Nút hồ sơ — outline xanh teal tinh tế */}
                    <Link
                      to="/profile"
                      className="btn-premium-outline d-inline-flex align-items-center gap-1 text-decoration-none rounded-pill px-3 py-2"
                      style={{ fontSize: '0.85rem' }}
                      onClick={() => setIsNavCollapsed(true)}
                    >
                      Hi, {currentUser.name.split(' ').pop()}
                    </Link>
                    {/* Nút đăng xuất — đỏ nổi bật cảnh báo */}
                    <button
                      onClick={() => { handleLogout(); setIsNavCollapsed(true); }}
                      className="btn-danger-solid rounded-pill"
                      style={{ fontSize: '0.85rem' }}
                    >
                      Đăng xuất
                    </button>
                  </div>
                </li>
              ) : (
                <li className="nav-item">
                  <button 
                    onClick={() => { setShowLogin(true); setIsNavCollapsed(true); }} 
                    className="btn btn-premium rounded-pill px-4 py-2"
                  >
                    Đăng Nhập
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Account Slide drawer */}
      <LoginModal show={showLogin} handleClose={() => setShowLogin(false)} />
    </>
  );
}
