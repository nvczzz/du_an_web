import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCart } from "../context/CartProvider";

export default function Product() {
  const {products, loading } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter & Search states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [maxPrice, setMaxPrice] = useState(500000);
  const [sortBy, setSortBy] = useState("default");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Extract unique categories and brands dynamically from fetched products
  const categoriesList = products ? ["All", ...new Set(products.map(p => p.category))] : ["All"];
  const brandsList = products ? ["All", ...new Set(products.map(p => p.brand))] : ["All"];

  // Sync state with Search Params if navigated from other pages
  useEffect(() => {
    const searchVal = searchParams.get("search");
    const categoryVal = searchParams.get("category");

    if (searchVal) {
      setSearchTerm(searchVal);
    }
    if (categoryVal) {
      setSelectedCategory(categoryVal);
    }
  }, [searchParams]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedBrand, maxPrice, sortBy]);

  // Lọc sản phẩm
  const filteredProducts = products ? products.filter(prod => {
    const matchesSearch = 
      prod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.uses.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || prod.category === selectedCategory;
    const matchesBrand = selectedBrand === "All" || prod.brand === selectedBrand;
    const matchesPrice = prod.price <= maxPrice;

    return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
  }) : [];

  // Sắp xếp sản phẩm
const sortedProducts = [...filteredProducts].sort((a, b) => {
  if (sortBy === "nameAsc") {
    return a.name.localeCompare(b.name, "vi");
  }

  if (sortBy === "nameDesc") {
    return b.name.localeCompare(a.name, "vi");
  }

  if (sortBy === "priceAsc") {
    return a.price - b.price;
  }

  if (sortBy === "priceDesc") {
    return b.price - a.price;
  }

  // if (sortBy === "ratingDesc") {
  //   return (b.rating || 0) - (a.rating || 0);
  // }

  return 0;
});

  // Phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedBrand("All");
    setMaxPrice(500000);
    setSortBy("default");
    setSearchParams({});
  };
return (
  <div className="container-fluid medicine-list-page animate-fade-in">
    <div className="row g-4">
      <aside className="col-md-3">
        <div className="filter-sidebar">
          <h5>Bộ lọc nâng cao</h5>

          <label>Tìm kiếm</label>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Nhập tên thuốc"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <label>Loại sản phẩm</label>
          <select
            className="form-select mb-3"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categoriesList.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat === "All" ? "Tất cả" : cat}
              </option>
            ))}
          </select>

          <label>Thương hiệu</label>
          <select
            className="form-select mb-3"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            {brandsList.map((brand, idx) => (
              <option key={idx} value={brand}>
                {brand === "All" ? "Tất cả" : brand}
              </option>
            ))}
          </select>

          <label>Giá tối đa: {maxPrice.toLocaleString()}đ</label>
          <input
            type="range"
            className="form-range mb-3"
            min="50000"
            max="500000"
            step="50000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />

          <button
            onClick={handleClearFilters}
            className="btn btn-primary w-100"
          >
            Xóa lọc
          </button>
        </div>
      </aside>

      <main className="col-md-9">
        <div className="product-top">
          <h3 className="medicine-list-title">Danh Sách Thuốc</h3>

          <div className="sort-wrapper">
            <span className="sort-label">Sắp xếp theo:</span>

            <select
              className="medicine-filter-control sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Mặc định</option>
              <option value="nameAsc">Tên A → Z</option>
              <option value="nameDesc">Tên Z → A</option>
              <option value="priceAsc">Giá thấp</option>
              <option value="priceDesc">Giá cao</option>
              {/* <option value="ratingDesc">Bán chạy</option> */}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="medicine-grid">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="medicine-card medicine-card-loading">
                <div className="medicine-image-skeleton" />
                <div className="medicine-line-skeleton w-75" />
                <div className="medicine-line-skeleton" />
                <div className="medicine-line-skeleton" />
                <div className="medicine-line-skeleton w-50" />
              </div>
            ))}
          </div>
        ) : currentItems.length > 0 ? (
          <div className="medicine-grid">
            {currentItems.map((prod) => (
              <div key={prod.id} className="medicine-card">
                <Link to={`/detail/${prod.id}`} className="medicine-cover-link">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="medicine-cover"
                  />
                </Link>

                <div className="medicine-info-row medicine-name-row">
                  <Link to={`/detail/${prod.id}`} className="medicine-name">
                    {prod.name}
                  </Link>
                </div>

                <div className="medicine-info-row">
                  <span>Hãng:</span> {prod.brand}
                </div>
                <div className="medicine-info-row">
                  <span>Danh mục:</span> {prod.category}
                </div>
                <div className="medicine-info-row">
                  <span>Đánh giá:</span> {prod.rating}
                </div>
                <div className="medicine-info-row">
                  <span>Giá:</span> {prod.price.toLocaleString()}đ
                </div>

                <div className="medicine-card-actions">
                  <Link
                    to={`/detail/${prod.id}`}
                    className="medicine-detail-button"
                  >
                    Chi tiết
                  </Link>
                  {/* <button
                    type="button"
                    onClick={() => addToCart(prod, 1)}
                    className="medicine-borrow-button"
                  >
                    Thêm
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="medicine-empty-state">
            <h4>Không tìm thấy sản phẩm thuốc phù hợp</h4>
            <p>Thử đổi từ khóa tìm kiếm hoặc chọn lại bộ lọc.</p>
            <button
              onClick={handleClearFilters}
              className="medicine-action-button"
            >
              Làm mới bộ lọc
            </button>
          </div>
        )}

        {!loading && totalPages > 1 && (
          <nav className="mt-4 d-flex justify-content-center">
            <ul className="pagination pagination-custom shadow-sm bg-white rounded-pill p-2">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Trước
                </button>
              </li>

              {[...Array(totalPages)].map((_, i) => (
                <li
                  key={i}
                  className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}

              <li
                className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Sau
                </button>
              </li>
            </ul>
          </nav>
        )}
      </main>
    </div>
  </div>
);
}