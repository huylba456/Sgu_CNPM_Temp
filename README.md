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

## Lộ trình triển khai theo Sprint

Để dễ dàng quản lý phạm vi công việc theo Scrum, dự án được tách thành bốn giai đoạn tương ứng bốn
sprint. Mỗi sprint đều có snapshot mã nguồn riêng trong thư mục `phased_release/` để bạn có thể chạy
ứng dụng tương ứng hoặc kết hợp tuần tự để tạo nên phiên bản hoàn chỉnh.

| Sprint | Phạm vi chính | Thư mục | Mô tả nhanh |
| --- | --- | --- | --- |
| Sprint 1 – Nền tảng &amp; Đăng nhập | Thiết lập Vite + React, AuthContext, màn hình đăng nhập và trang chủ cơ bản sau đăng nhập. | `phased_release/gd1` | Tập trung vào skeleton ứng dụng, mock user và luồng đăng nhập/đăng xuất. |
| Sprint 2 – Khám phá menu | Danh mục sản phẩm, tìm kiếm, lọc, sắp xếp và trang chi tiết món. | `phased_release/gd2` | Khách hàng có thể duyệt menu chi tiết, chuẩn bị cho việc đặt món. |
| Sprint 3 – Trải nghiệm đặt hàng | Giỏ hàng, thanh toán, lịch sử đơn cùng drone tracker mô phỏng. | `phased_release/gd3` | Hoàn thiện toàn bộ customer journey từ chọn món đến theo dõi giao hàng. |
| Sprint 4 – Vận hành &amp; Quản trị | Dashboard admin, trung tâm nhà hàng, quản lý người dùng/sản phẩm/đơn hàng. | `phased_release/gd4` | Toàn bộ tính năng vận hành nội bộ &amp; quản trị được kích hoạt. |

Trong từng thư mục sprint có tệp `README.md` mô tả chi tiết chức năng, dữ liệu mock sử dụng và cách
chạy nhanh ứng dụng tương ứng.

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
