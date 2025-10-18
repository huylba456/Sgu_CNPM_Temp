# Sprint 4 – Vận hành & Quản trị

Sprint cuối cùng bật toàn bộ module vận hành nội bộ, tạo nên phiên bản hoàn chỉnh như thư mục `web/` gốc.

## Mục tiêu chính
- Kế thừa luồng đặt hàng của sprint 3.
- Bổ sung layout riêng cho admin và nhà hàng.
- Tạo dashboard quản trị (thống kê, CRUD sản phẩm, người dùng, đơn hàng, đội drone).
- Cung cấp trung tâm nhà hàng để quản lý menu, cập nhật trạng thái & ghi chú đơn.
- Mở rộng dữ liệu mock: người dùng, món ăn, đơn hàng, drone, route bay.

## Cấu trúc thư mục nổi bật
```
web/
  src/
    App.jsx                       // Bao gồm route /admin và /restaurant được bảo vệ theo role
    components/AdminLayout.jsx
    components/RestaurantLayout.jsx
    components/DataTable.jsx, Modal.jsx, StatsCard.jsx
    pages/admin/*, pages/restaurant/*
```

## Cách chạy
```bash
cd phased_release/gd4/web
npm install
npm run dev
```

Sử dụng các tài khoản mock đã liệt kê trong README gốc để kiểm thử các vai trò khác nhau.
