# Sprint 3 – Trải nghiệm đặt hàng

Sprint 3 hoàn thiện hành trình đặt món và theo dõi đơn dành cho khách hàng.

## Mục tiêu chính
- Giữ toàn bộ tính năng duyệt menu ở sprint 2.
- Tích hợp `CartContext` & hook `useCart` để thêm/xóa/cập nhật số lượng món.
- Xây dựng các trang `CartPage`, `CheckoutPage`, `OrdersPage` với trạng thái đơn, thống kê nhanh.
- Bổ sung mô phỏng `DroneTracker` hiển thị tiến trình giao hàng real-time.
- Giới hạn scope trong phía khách hàng, chưa bật module admin/restaurant.

## Cấu trúc thư mục nổi bật
```
web/
  src/
    App.jsx                 // Thêm route bảo vệ cho cart, checkout, orders
    components/Layout.jsx   // Header có giỏ hàng, aside hiển thị DroneTracker
    context/CartContext.jsx
    hooks/useCart.js
    pages/
      CartPage.jsx
      CheckoutPage.jsx
      OrdersPage.jsx
```

## Cách chạy
```bash
cd phased_release/gd3/web
npm install
npm run dev
```

Đăng nhập bằng bất kỳ tài khoản mock để sử dụng đầy đủ flow đặt hàng.
