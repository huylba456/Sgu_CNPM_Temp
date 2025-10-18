# Sprint 2 – Khám phá menu

Snapshot cho sprint 2 bổ sung toàn bộ trải nghiệm duyệt món.

## Mục tiêu chính
- Giữ nguyên nền tảng và auth của sprint 1.
- Thêm trang chủ với khả năng lọc, tìm kiếm sản phẩm nổi bật.
- Tạo trang `ProductsPage` với phân trang, filter theo danh mục & nhà hàng, sort theo nhiều tiêu chí.
- Bổ sung trang `ProductDetailPage` hiển thị thông tin chi tiết từng món.
- Chuẩn bị UI nút đặt món (disabled) để báo hiệu tính năng sẽ mở ở sprint 3.

## Cấu trúc thư mục nổi bật
```
web/
  src/
    App.jsx                   // Route Trang chủ, Products list, Product detail, Login
    components/
      Layout.jsx              // Header có thêm liên kết đến Products
      ProductCard.jsx         // Hiển thị món ăn, nút Thêm vào giỏ bị disable
      CategoryFilter.jsx, SearchBar.jsx, SortMenu.jsx
    pages/
      HomePage.jsx            // Hero Sprint 2 + grid sản phẩm nổi bật
      ProductsPage.jsx
      ProductDetailPage.jsx
```

## Cách chạy
```bash
cd phased_release/gd2/web
npm install
npm run dev
```

Đăng nhập bằng mock account để trải nghiệm đầy đủ copywriting; khách chưa đăng nhập vẫn có thể duyệt menu.
