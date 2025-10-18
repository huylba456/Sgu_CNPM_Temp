# Sprint 1 – Nền tảng & Đăng nhập

Snapshot này nêu bật phạm vi sprint đầu tiên khi xây dựng FoodFast web app.

## Mục tiêu chính
- Thiết lập dự án Vite + React và cấu hình style cơ bản.
- Khởi tạo `AuthContext` với mock user để đăng nhập/đăng xuất.
- Xây dựng layout chung và hai màn hình chính: `LoginPage` và `HomePage` sau đăng nhập.
- Trình bày thông tin sprint kế tiếp ngay trên giao diện nhằm định hướng phát triển.

## Cấu trúc thư mục nổi bật
```
web/
  src/
    App.jsx               // Router với route đăng nhập và trang chủ (yêu cầu đăng nhập)
    components/Layout.jsx // Header tối giản, chỉ gồm liên kết Trang chủ/Đăng nhập
    context/AuthContext.jsx
    pages/
      HomePage.jsx        // Hero giới thiệu sprint 1 & lời chào người dùng
      LoginPage.jsx       // Form đăng nhập với credential mẫu
```

## Cách chạy
```bash
cd phased_release/gd1/web
npm install
npm run dev
```

Sử dụng một trong ba tài khoản mock sau để đăng nhập:
- `customer@foodfast.io / 123456`
- `admin@foodfast.io / admin`
- `restaurant@foodfast.io / restaurant`
