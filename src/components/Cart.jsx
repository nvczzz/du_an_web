import { useCart } from "../context/CartProvider";
import { Link } from "react-router-dom";

export default function Cart()
{
  const { cart, removeFromCart } = useCart();
  const total = cart.reduce(
  (sum, item) => sum + item.price * item.quantity,0
  );











  return (
    <main className="container my-4">
      {/* Back Button */}
      <div>
        <Link to="/" className="btn-nav-link">
          &lt; Quay lại
        </Link>
      </div>

      {/* Cart Title */}
      <section className="mb-4">
        <h1>Giỏ hàng</h1>
      </section>

      {/* Cart Table */}
      <section className="cart-table border rounded-4 p-4 mb-4">
        <div className="table-responsive">

          <table className="table table-dark table-bordered align-middle text-center">
          {/* Table Header */}
            <thead>
              <tr>
                <th>STT</th>
                <th>Sản phẩm</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
                <th>Hành động</th>
              </tr>
            </thead>
          
          {/* Table Body */}
            <tbody>
              {cart.length === 0 ? 
              (  <tr>
                  <td colSpan="6">Giỏ hàng trống</td>
                </tr>
              ) : 
              (cart.map((item, index) => 
                (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.price.toLocaleString()}đ</td>
                    <td>{item.quantity}</td>
                    <td>{(item.price * item.quantity).toLocaleString()}đ</td>
                    <td>
                      <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.id)}>Xóa</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Cart Summary */}
      <section className="cart-summary border rounded-4 p-4">
        {/* Total Price */}
        <div className="d-flex justify-content-end">
          <div className="text-end">
            <h3>Tổng tiền: {total.toLocaleString()} VND</h3>

        {/* Checkout Button */}
            <Link to="/checkout" className="btn btn-success rounded-pill px-4 mt-2">Thanh toán</Link>
          </div>
        </div>
      </section>

    </main>
  );
}