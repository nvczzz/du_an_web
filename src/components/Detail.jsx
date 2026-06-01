import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCart } from "../context/CartProvider";

const formatPrice = (price = 0) => Number(price || 0).toLocaleString();

export default function Detail() {
  const { id } = useParams();
  const { products, loading, addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = useMemo(
    () => products.find((item) => String(item.id) === String(id)),
    [products, id]
  );

  const relatedProducts = useMemo(() => {
    if (!product) return [];

    return products
      .filter((item) => item.id !== product.id && item.category === product.category)
      .slice(0, 4);
  }, [products, product]);

  if (loading) {
    return (
      <main className="container my-5">
        <div className="glass-card p-4 p-lg-5">
          <div className="row g-4">
            <div className="col-lg-5">
              <div className="bg-light rounded-4 placeholder-glow" style={{ height: 420 }} />
            </div>
            <div className="col-lg-7 d-flex flex-column gap-3">
              <div className="bg-light rounded placeholder-glow w-25" style={{ height: 18 }} />
              <div className="bg-light rounded placeholder-glow w-75" style={{ height: 42 }} />
              <div className="bg-light rounded placeholder-glow w-50" style={{ height: 28 }} />
              <div className="bg-light rounded placeholder-glow w-100" style={{ height: 90 }} />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="container my-5">
        <div className="glass-card p-5 text-center">
          <h3 className="fw-bold mb-3">Khong tim thay san pham</h3>
          <p className="text-muted mb-4">San pham nay khong ton tai hoac da bi xoa.</p>
          <Link to="/make-up" className="btn-premium text-decoration-none px-4 py-2">
            Quay lai danh sach thuoc
          </Link>
        </div>
      </main>
    );
  }

  const stock = Number(product.stock || 0);
  const reviewCount = Array.isArray(product.reviews)
    ? product.reviews.length
    : Number(product.reviews || product.sold || 0);
  const hasDiscount = Number(product.discount || 0) > 0;
  const finalPrice = hasDiscount
    ? product.price - (product.price * product.discount) / 100
    : product.price;
  const maxQuantity = stock > 0 ? stock : 99;

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const increaseQuantity = () => {
    setQuantity((current) => Math.min(maxQuantity, current + 1));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  const detailRows = [
    ['Danh muc', product.category],
    ['Thuong hieu', product.brand],
    ['Nha san xuat', product.manufacturer],
    ['Nuoc san xuat', product.originCountry],
    ['Ton kho', stock ? `${stock} san pham` : 'Dang cap nhat'],
    ['Da ban', product.sold ? `${product.sold} san pham` : 'Dang cap nhat']
  ].filter(([, value]) => value);

  return (
    <main className="container my-4 my-lg-5 animate-fade-in">
      <div className="mb-3">
        <Link to="/make-up" className="text-teal fw-bold text-decoration-none">
          &lt; Quay lai danh sach thuoc
        </Link>
      </div>

      <section className="glass-card p-4 p-lg-5">
        <div className="row g-4 g-lg-5">
          <div className="col-lg-5">
            <div className="position-relative bg-white rounded-4 border overflow-hidden">
              {hasDiscount && (
                <span className="product-badge-category">
                  Giam {product.discount}%
                </span>
              )}
              <img
                src={product.image}
                alt={product.name}
                className="w-100"
                style={{ height: 430, objectFit: 'cover' }}
              />
            </div>
          </div>

          <div className="col-lg-7 text-start">
            <div className="d-flex flex-wrap gap-2 mb-3">
              <span className="product-badge-brand position-static">{product.brand}</span>
              <span className="product-badge-category position-static">{product.category}</span>
            </div>

            <h1 className="fw-bold mb-3" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.7rem)' }}>
              {product.name}
            </h1>

            <div className="d-flex flex-wrap align-items-center gap-3 mb-3 text-muted">
              <span className="fw-bold text-dark">Danh gia: {product.rating || 'Dang cap nhat'}</span>
              <span>{reviewCount} luot quan tam</span>
              {stock > 0 && <span>Con hang</span>}
            </div>

            <div className="d-flex flex-wrap align-items-end gap-3 mb-4">
              <div className="product-price" style={{ fontSize: '2rem' }}>
                {formatPrice(finalPrice)}d
              </div>
              {hasDiscount && (
                <div className="text-muted text-decoration-line-through fs-5">
                  {formatPrice(product.price)}d
                </div>
              )}
            </div>

            <p className="text-muted fs-6 lh-lg mb-4">
              {product.description || 'Thong tin mo ta san pham dang duoc cap nhat.'}
            </p>

            <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
              <span className="fw-bold">So luong</span>
              <div className="d-inline-flex align-items-center border rounded-pill overflow-hidden bg-white">
                <button
                  type="button"
                  onClick={decreaseQuantity}
                  className="btn btn-light border-0 rounded-0"
                  style={{ width: 44, height: 40 }}
                  aria-label="Giam so luong"
                >
                  -
                </button>
                <span className="px-4 fw-bold">{quantity}</span>
                <button
                  type="button"
                  onClick={increaseQuantity}
                  className="btn btn-light border-0 rounded-0"
                  style={{ width: 44, height: 40 }}
                  aria-label="Tang so luong"
                >
                  +
                </button>
              </div>
            </div>

            <div className="d-flex flex-wrap gap-3 mb-4">
              <button
                type="button"
                onClick={handleAddToCart}
                className="btn-premium px-4 py-3"
                disabled={stock === 0}
              >
                Them vao gio hang
              </button>
              <Link to="/cart" className="btn-premium-outline text-decoration-none px-4 py-3">
                Xem gio hang
              </Link>
            </div>

            {added && (
              <div className="alert alert-success rounded-4 border-0">
                Da them san pham vao gio hang.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="row g-4 mt-2">
        <div className="col-lg-7">
          <div className="glass-card p-4 h-100 text-start">
            <h3 className="fw-bold mb-3">Thong tin chi tiet</h3>
            <div className="d-flex flex-column gap-3">
              {detailRows.map(([label, value]) => (
                <div key={label} className="d-flex justify-content-between gap-3 border-bottom pb-3">
                  <span className="text-muted">{label}</span>
                  <strong className="text-end">{value}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="glass-card p-4 h-100 text-start">
            <h3 className="fw-bold mb-3">Cong dung va cach dung</h3>
            <div className="mb-3">
              <h6 className="fw-bold text-teal">Cong dung</h6>
              <p className="text-muted mb-0 lh-lg">
                {product.uses || 'Thong tin cong dung dang duoc cap nhat.'}
              </p>
            </div>
            <div>
              <h6 className="fw-bold text-teal">Lieu dung</h6>
              <p className="text-muted mb-0 lh-lg">
                {product.dosage || 'Dung theo huong dan tren bao bi hoac theo tu van cua duoc si.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {Array.isArray(product.tags) && product.tags.length > 0 && (
        <section className="glass-card p-4 mt-4 text-start">
          <h3 className="fw-bold mb-3">Tu khoa san pham</h3>
          <div className="d-flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span key={tag} className="badge rounded-pill bg-light text-dark border px-3 py-2">
                {tag}
              </span>
            ))}
          </div>
        </section>
      )}

      {relatedProducts.length > 0 && (
        <section className="mt-5">
          <div className="d-flex justify-content-between align-items-end mb-4">
            <h3 className="fw-bold mb-0">San pham cung danh muc</h3>
            <Link to="/make-up" className="btn-premium-outline text-decoration-none px-3 py-2">
              Xem tat ca
            </Link>
          </div>

          <div className="row g-4">
            {relatedProducts.map((item) => (
              <div key={item.id} className="col-12 col-sm-6 col-lg-3">
                <div className="glass-card product-card">
                  <div className="product-img-wrapper">
                    <span className="product-badge-brand">{item.brand}</span>
                    <img src={item.image} alt={item.name} className="product-img" />
                  </div>
                  <div className="p-4 text-start">
                    <h6 className="fw-bold text-truncate-2" style={{ minHeight: 42 }}>
                      {item.name}
                    </h6>
                    <div className="product-price mb-3">{formatPrice(item.price)}d</div>
                    <Link
                      to={`/detail/${item.id}`}
                      className="medicine-detail-button text-decoration-none d-inline-block"
                    >
                      Chi tiet
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
