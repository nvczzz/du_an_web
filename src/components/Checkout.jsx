import { Link } from "react-router-dom";
import { useCart } from "../context/CartProvider";

export default function Checkout() {
  const { cart, clearCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,0
  );

  const handleConfirmOrder = () => 
  {
    if (cart.length === 0) {
    alert("Giỏ hàng đang trống!");
    return;
    }

    alert("Đặt hàng thành công!");
    clearCart();
  };



















  return (
    <main className="container my-4">

      {/* Back Button */}
      <div className="mb-4">
        <Link to="/cart" className="btn-nav-link">
          &lt; Quay lại
        </Link>
      </div>

      <h1 className="mb-4">Thanh toán</h1>

      <div className="row g-4">

        {/* Thông tin khách hàng */}
        <div className="col-lg-7">
          <section className="border rounded-4 p-4">
            <h3 className="mb-4">Thông tin nhận hàng</h3>
            <div className="mb-3">
              <label className="form-label">Họ và tên</label>
              <input type="text" className="form-control" placeholder="Nhập họ và tên"/>
            </div>

            <div className="mb-3">
              <label className="form-label">Số điện thoại</label>
              <input type="text" className="form-control" placeholder="Nhập số điện thoại"/>
            </div>

            <div className="mb-3">
              <label className="form-label">Địa chỉ nhận hàng</label>
              <textarea className="form-control" rows="4" placeholder="Nhập địa chỉ"/>
            </div>

            <div>
              <label className="form-label">Ghi chú</label>
              <textarea className="form-control" rows="3" placeholder="Ghi chú đơn hàng"/>
            </div>
          </section>
        </div>

        {/* Tổng đơn hàng */}
        <div className="col-lg-5">
          <section className="border rounded-4 p-4">
            <h3 className="mb-4">Đơn hàng</h3>
          
          {cart.map((item) => (
            <div key={item.id} className="d-flex justify-content-between mb-2">
              <span>{item.name} x {item.quantity}</span>
              <span>{(item.price * item.quantity).toLocaleString()}đ</span>
            </div>
          ))}

            <hr />

            <div className="d-flex justify-content-between">
              <span>Tạm tính</span>
              <span>{total.toLocaleString()}đ</span>
            </div>

            <hr />

            <div className="d-flex justify-content-between fw-bold fs-4">
              <span>Tổng tiền</span>
              <span>{total.toLocaleString()}đ</span>
            </div>

            <button className="btn btn-success w-100 mt-4 rounded-pill" onClick={handleConfirmOrder}>
              Xác nhận đặt hàng
            </button>
          </section>
        </div>
      </div>
    </main>
  );
}