import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartProvider";
import {useState} from "react";







export default function Detail()
{
  const [count, setCount]= useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);

  const { id } = useParams();
  const { products, addToCart } = useCart();

  // Tìm sản phẩm dựa trên id từ URL
  const product = products.find
  (
    (item) => String(item.id) === String(id)
  );
  
  // Nếu không tìm thấy sản phẩm, hiển thị thông báo lỗi
  if(!product)
  {
    return <main className="container my-4">không tìm thấy sản phẩm</main>
  }

  // Xử lý nút tăng giảm số lượng
  const handleIncrease = () => setCount(count +1);
  const handleDecrease = () => 
  {
    if(count > 1) setCount(count -1);
  };

  // Xử lý nút gửi đánh giá
  const handleReviewSubmit = () =>
  {
    const newReview = { name, rating, comment };
    setReviews([...reviews, newReview]);
    
    setName("");
    setRating(5);
    setComment("");
  }





  







  return (
    <main className="container my-4">
      {/* Back Button */}
      <div>
        <Link to="/make-up" className="btn-nav-link">
          &lt; Quay lại
        </Link>
      </div>

      {/* ========================================================== */}

      {/* Product Overview Section */}
      <section className="product-overview border rounded-4 p-4 mt-4 mb-4">
        <div className="row g-4 align-items-center">
          {/* bên trái: ảnh sản phẩm */}
          <div className="col-lg-5">
            {/* Main Image */}
            <img src={product.image} alt={product.name} className="img-fluid rounded-4" />
          </div>
          {/* bên phải: thông tin + giá + số lượng + thêm giỏ hàng */}
          <div className="col-lg-7 d-flex flex-column gap-2">
            {/* Product Brand */}
            <p>Thương hiệu: {product.brand}</p>
            {/* Product Name */}
            <h1>{product.name}</h1>
            {/* Product Price */}
            <h2>{product.price.toLocaleString()} VND</h2>
            {/* Product Description */}
            <p>{product.description}</p>
            {/* Quantity Selector */}
            <div className="d-flex align-items-center gap-2">
              Số lượng:
              <btn className="btn btn-outline-secondary" onClick={handleDecrease}>-</btn>
                <span>{count}</span>
              <btn className="btn btn-outline-secondary" onClick={handleIncrease}>+</btn>
            </div>
            {/* Add To Cart Button */}
            <button className="btn btn-success px-5 py-2 mt-2 align-self-start rounded-pill" onClick={() => addToCart(product, count)}>
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================== */}

      {/* Product Detail Section */}
      <section className="product-detail border rounded-4 p-4 mt-4 mb-4">
        {/* tabs: mô tả, công dụng, cách dùng... */}
        <div className="d-flex gap-4 border-bottom pb-3 mb-3">
          <button className="text-teal text-decoration-none" onClick={() => setActiveTab("description")}>Mô tả</button>
          <button className="text-teal text-decoration-none" onClick={() => setActiveTab("uses")}>Công dụng</button>
          <button className="text-teal text-decoration-none" onClick={() => setActiveTab("dosage")}>Cách dùng</button>
          <button className="text-teal text-decoration-none" onClick={() => setActiveTab("sideEffects")}>Tác dụng phụ</button>
        </div>
        {/* nội dung mô tả + bảng thông tin */}
        <div>
          {activeTab === "description" && (
            <>
              <h3>Mô tả sản phẩm</h3>
              <p>{product.description}</p>
            </>
          )}
          {activeTab === "uses" && (
            <>
              <h3>Công dụng</h3>
              <p>{product.uses}</p>
            </>
          )}
          {activeTab === "dosage" && (
            <>
              <h3>Cách dùng</h3>
              <p>{product.dosage}</p>
            </>
          )}
          {activeTab === "sideEffects" && (
            <>
              <h3>Tác dụng phụ</h3>
              <p>{product.sideEffects}</p>
            </>
          )}
        </div>
      </section>

      {/* ========================================================== */}

      {/* Review Section */}
      <section className="review-section border rounded-4 p-4 mt-4 mb-4">
        {/* form nhập đánh giá */}
        <h1>Đánh giá sản phẩm</h1>
        <div className="mb-3">
          <label>Họ Và Tên: </label>
          <input className="form-control" placeholder="Nhập họ tên" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="mb-3">
          <label>Chọn số sao: </label>
          <select className="form-control" value={rating} onChange={(e) => setRating(e.target.value)}>
            <option>1 sao</option>
            <option>2 sao</option>
            <option>3 sao</option>
            <option>4 sao</option>
            <option>5 sao</option>
          </select>
        </div>
        
        <div className="mb-3">
          <label>Nội dung: </label>
          <textarea className="form-control" placeholder="Nhập nội dung" rows={3} value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
        </div>

        <button className="btn btn-success" onClick={handleReviewSubmit}>Gửi đánh giá</button>
        {/* lọc đánh giá */}

        {/* danh sách đánh giá */}
        <div className="mt-4">
          <h4>Danh sách đánh giá:</h4>
          {reviews.map((review, index) => 
            (
              <div className="border-top pt-3 mb-3" key={index}>
               
                <h5>{review.name}</h5>

                <p>{review.rating} sao</p>

                <p>{review.comment}</p>
              </div>
            ))
          }
        </div>
      </section>
    </main>
  );
}