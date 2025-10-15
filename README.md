# FoodFast Drone Delivery Frontend Suite

Bộ đôi ứng dụng web React và mobile React Native (Expo Router) sử dụng dữ liệu mock để mô phỏng trải nghiệm giao đồ ăn bằng drone FoodFast.

## Thư mục

- `web/`: Ứng dụng web dùng Vite + React.
- `mobile/`: Ứng dụng mobile React Native (Expo Router) với cùng luồng chức năng.

## Tính năng nổi bật

### Ứng dụng web (`web/`)
- Đăng nhập/đăng xuất với mock user (customer, admin, restaurant).
- Trang đặt món: tìm kiếm, lọc theo danh mục, sắp xếp, xem chi tiết sản phẩm.
- Giỏ hàng, thanh toán, xem lịch sử đơn hàng.
- Drone tracker hiển thị tiến trình giao real-time (mô phỏng).
- Admin dashboard: thống kê + CRUD sản phẩm, người dùng, đơn hàng.
- Trung tâm nhà hàng: dashboard doanh thu, CRUD menu nhà hàng, chỉnh trạng thái & ghi chú đơn hàng.

### Ứng dụng mobile (`mobile/`)
- Giao diện tối ưu di động, chia sẻ mock data với web.
- Các màn hình: Home, Catalog/Detail, Cart, Checkout, Orders.
- Đăng nhập, dashboard Admin, quản trị sản phẩm/user/order; module nhà hàng quản lý menu & đơn hàng.

## Chạy ứng dụng

### Web
```bash
cd web
npm install
npm run dev
```

### Mobile (Expo)
```bash
cd mobile
npm install
npx expo start
```

> Các ứng dụng đều dùng dữ liệu mock, không cần backend.

## Tài khoản mẫu
- Customer: `customer@foodfast.io / 123456`
- Admin: `admin@foodfast.io / admin`
- Restaurant: `restaurant@foodfast.io / restaurant`
