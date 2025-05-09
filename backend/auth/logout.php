<?php
header("Access-Control-Allow-Origin: http://localhost:3000"); // Cho phép truy cập từ ứng dụng React
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); // Cho phép các phương thức bạn sử dụng
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Cho phép các header
header("Access-Control-Allow-Credentials: true"); // Cho phép gửi cookies trong yêu cầu
// Tiếp tục xử lý chức năng đăng xuất...
session_start();
session_unset();
session_destroy();
echo json_encode(["message" => "Logout successful"]);
?>