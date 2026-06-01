import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartProvider';

export default function Home() {
  const { addToCart, products, loading } = useCart();
  const navigate = useNavigate();

  // Get first 4 products for Featured Section once loaded
  const featuredProducts = products ? products.slice(0, 4) : [];

  const categories = [
    { name: "Giảm đau - Hạ sốt", count: "2 sản phẩm" },
    { name: "Hô hấp - Trị ho", count: "2 sản phẩm" },
    { name: "Tiêu hóa - Dạ dày", count: "2 sản phẩm" },
    { name: "Vitamin & Khoáng chất", count: "2 sản phẩm" },
    { name: "Dược mỹ phẩm", count: "2 sản phẩm" }
  ];

  const handleCategoryClick = (catName) => {
    navigate(`/make-up?category=${encodeURIComponent(catName)}`);
  };

  return (
    <div className="container mt-4 animate-fade-in">
      {/* 1. HERO SECTION */}
      <section className="hero-section glass-card p-5 mb-5 overflow-hidden position-relative">
        <div className="row align-items-center position-relative" style={{ zIndex: 1 }}>
          <div className="col-lg-7 text-start">
            <span className="badge bg-teal-light text-teal px-3 py-2 rounded-pill fw-bold mb-3 small" style={{ background: 'rgba(13, 148, 136, 0.1)' }}>
              Hệ Thống Đạt Chuẩn GPP Quốc Tế
            </span>
            <h1 className="hero-title mb-3">
              Chăm Sóc Sức Khỏe <br />
              <span className="text-teal">Toàn Diện</span> Cho Gia Đình Bạn
            </h1>
            <p className="hero-subtitle mb-4">
              Medicare cung cấp thuốc kê đơn, thực phẩm bảo vệ sức khỏe, vitamin và các sản phẩm chăm sóc sắc đẹp từ những thương hiệu hàng đầu thế giới với sự tư vấn tận tâm của đội ngũ dược sĩ chuyên nghiệp.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <Link to="/make-up" className="btn-premium py-3 px-4">
                Mua Thuốc Ngay
              </Link>
              <button 
                onClick={() => handleCategoryClick("Dược mỹ phẩm")} 
                className="btn btn-light rounded-3 py-3 px-4 fw-bold border" 
                style={{ background: '#ffffff', color: '#1e293b' }}
              >
                Dược Mỹ Phẩm
              </button>
            </div>
            {/* Quick trust metrics */}
            <div className="row mt-4 pt-3 border-top g-3">
              <div className="col-4">
                <h5 className="fw-800 text-teal mb-0">100%</h5>
                <small className="text-muted">Chính hãng</small>
              </div>
              <div className="col-4">
                <h5 className="fw-800 text-teal mb-0">1.800+</h5>
                <small className="text-muted">Dược sĩ giỏi</small>
              </div>
              <div className="col-4">
                <h5 className="fw-800 text-teal mb-0">Miễn Phí</h5>
                <small className="text-muted">Giao hàng &gt;300k</small>
              </div>
            </div>
          </div>
          {/* Hero Image */}
          <div className="col-lg-5 d-none d-lg-block">
            <img 
              src="https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=600&auto=format&fit=crop&q=60" 
              alt="Medicare Pharmacy Staff" 
              className="img-fluid rounded-4 shadow-lg"
              style={{ objectFit: 'cover', height: '380px', width: '100%', border: '4px solid rgba(255,255,255,0.7)' }}
            />
          </div>
        </div>
      </section>

      {/* 2. CATEGORIES SECTION */}
      <section className="mb-5">
        <div className="d-flex flex-column align-items-center mb-4 text-center">
          <span className="text-teal fw-bold text-uppercase tracking-wider small">Danh Mục Thuốc</span>
          <h2 className="fw-bold mt-1">Tìm Kiếm Theo Danh Mục</h2>
          <div className="bg-teal rounded-pill mt-2" style={{ width: '60px', height: '4px' }} />
        </div>
        <div className="row g-3 justify-content-center">
          {categories.map((cat, idx) => (
            <div key={idx} className="col-6 col-md-4 col-lg-2">
              <div className="category-bubble" onClick={() => handleCategoryClick(cat.name)}>
                <span className="category-name text-center text-truncate w-100">{cat.name}</span>
                <small className="text-muted small mt-1">{cat.count}</small>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS */}
      <section className="mb-5">
        <div className="d-flex justify-content-between align-items-end mb-4">
          <div className="text-start">
            <span className="text-teal fw-bold text-uppercase tracking-wider small">Sản Phẩm Đang Hot</span>
            <h2 className="fw-bold mt-1 mb-0">Sản Phẩm Bán Chạy Nhất</h2>
          </div>
          <Link to="/make-up" className="btn btn-premium-outline rounded-pill">
            Xem Tất Cả
          </Link>
        </div>

        {loading ? (
          /* Loading skeletons for high-end feel */
          <div className="row g-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="col-12 col-sm-6 col-lg-3">
                <div className="glass-card product-card p-4 d-flex flex-column gap-3" style={{ height: '380px' }}>
                  <div className="bg-light rounded-4 w-100 placeholder-glow" style={{ height: '180px', animation: 'pulse 1.5s infinite' }} />
                  <div className="bg-light rounded w-50" style={{ height: '14px', animation: 'pulse 1.5s infinite' }} />
                  <div className="bg-light rounded w-100" style={{ height: '24px', animation: 'pulse 1.5s infinite' }} />
                  <div className="bg-light rounded w-75" style={{ height: '16px', animation: 'pulse 1.5s infinite' }} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="row g-4">
            {featuredProducts.map((prod) => (
              <div key={prod.id} className="col-12 col-sm-6 col-lg-3">
                <div className="glass-card product-card">
                  <div className="product-img-wrapper">
                    <span className="product-badge-category">{prod.category}</span>
                    <span className="product-badge-brand">{prod.brand}</span>
                    <img src={prod.image} alt={prod.name} className="product-img" />
                  </div>
                  
                  <div className="p-4 d-flex flex-column flex-grow-1 text-start">
                    <div className="d-flex align-items-center gap-1 mb-2">
                      <span className="fw-bold small text-dark">Đánh giá: {prod.rating}</span>
                      <span className="text-muted small">({prod.reviews ? prod.reviews.length : 0} đánh giá)</span>
                    </div>
                    <h6 className="fw-bold mb-2 text-dark text-truncate-2" style={{ height: '40px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                      {prod.name}
                    </h6>
                    <p className="text-muted small text-truncate mb-3">{prod.description}</p>
                    
                    <div className="mt-auto pt-3 border-top d-flex justify-content-between align-items-center">
                      <div className="product-price mb-0">{prod.price.toLocaleString()}đ</div>
                      <div className="d-flex gap-2">
                        {/* Nút phụ — xám nhạt */}
                        <Link to={`/detail/${prod.id}`} className="btn-secondary-soft rounded-3 text-decoration-none" style={{ fontSize: '0.8rem' }}>
                          Chi tiết
                        </Link>
                        {/* Nút chính — xanh premium */}
                        <button
                          onClick={() => addToCart(prod, 1)}
                          className="btn-premium rounded-3 d-flex align-items-center gap-1"
                          style={{ fontSize: '0.8rem' }}
                        >
                          Thêm
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. HEALTH CORNER / wellness info */}
      <section className="mb-5">
        <div className="d-flex flex-column align-items-center mb-4 text-center">
          <span className="text-teal fw-bold text-uppercase tracking-wider small">Góc Sức Khỏe</span>
          <h2 className="fw-bold mt-1">Cẩm Nang Sức Khỏe Gia Đình</h2>
          <div className="bg-teal rounded-pill mt-2" style={{ width: '60px', height: '4px' }} />
        </div>
        <div className="row g-4">
          <div className="col-12 col-md-6">
            <div className="glass-card d-flex flex-column flex-sm-row overflow-hidden text-start">
              <div className="col-sm-5" style={{ height: '200px' }}>
                <img 
                  src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&auto=format&fit=crop&q=60" 
                  alt="Yoga & Breathing" 
                  className="w-100 h-100" 
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="col-sm-7 p-4 d-flex flex-column justify-content-between">
                <div>
                  <span className="badge bg-teal-light text-teal mb-2" style={{ fontSize: '0.7rem' }}>Sống Khỏe</span>
                  <h6 className="fw-bold mb-2">5 Bài tập thở giúp thông thoáng phổi và giảm stress tại nhà</h6>
                  <p className="text-muted small text-truncate-2 mb-0">Các bài tập thở cơ bản từ thiền định yoga giúp tăng dung tích phổi và điều hòa huyết áp trong mùa nắng nóng...</p>
                </div>
                <small className="text-muted mt-3">Đăng 2 ngày trước • 4 phút đọc</small>
              </div>
            </div>
          </div>
          
          <div className="col-12 col-md-6">
            <div className="glass-card d-flex flex-column flex-sm-row overflow-hidden text-start">
              <div className="col-sm-5" style={{ height: '200px' }}>
                <img 
                  src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&auto=format&fit=crop&q=60" 
                  alt="Healthy Diet" 
                  className="w-100 h-100" 
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="col-sm-7 p-4 d-flex flex-column justify-content-between">
                <div>
                  <span className="badge bg-warning-light text-warning mb-2" style={{ fontSize: '0.7rem', background: 'rgba(245,158,11,0.1)', color: '#f59e0b' }}>Dinh Dưỡng</span>
                  <h6 className="fw-bold mb-2">Những thực phẩm bổ sung Vitamin C tự nhiên tốt nhất cho trẻ nhỏ</h6>
                  <p className="text-muted small text-truncate-2 mb-0">Bên cạnh cam quýt, các nguồn quả mọng và rau xanh đậm chứa hàm lượng vitamin C cực lớn hỗ trợ đắc lực hệ miễn dịch của trẻ nhỏ...</p>
                </div>
                <small className="text-muted mt-3">Đăng 5 ngày trước • 6 phút đọc</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section className="mb-4">
        <div className="glass-card bg-teal p-5 text-white position-relative overflow-hidden">
          <div className="row g-4 justify-content-center text-center">
            <div className="col-lg-8">
              <p className="lead fw-500 mb-4 fs-5 italic lh-lg">
                "Tôi đã mua thuốc ở Medicare hơn 1 năm nay. Giá cả ở đây luôn rõ ràng, ổn định, dược sĩ tư vấn cực kỳ chi tiết qua điện thoại. Khi chọn chuyển khoản, tôi quét mã VietQR là nhận thanh toán tức thì, nhân viên giao hàng rất lịch sự."
              </p>
              <h6 className="fw-bold mb-1">Bà Đỗ Thị Lan Anh</h6>
              <small className="opacity-75">Cựu giáo viên, Quận 3, TP.HCM</small>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
