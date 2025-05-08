<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Require database connection
require_once "../config/db.php";

// Kiểm tra kết nối cơ sở dữ liệu
if (!$conn) {
    http_response_code(500);  // Lỗi server
    echo json_encode(["error" => "Không thể kết nối đến cơ sở dữ liệu"]);
    exit();
}

// Truy vấn dữ liệu giỏ hàng
$cartsQuery = "SELECT c.id, u.username, p.name, c.quantity, c.created_at, c.status
               FROM carts c
               JOIN users u ON c.user_id = u.user_id
               JOIN products p ON c.product_id = p.id";
$cartsResult = $conn->query($cartsQuery);

// Kiểm tra kết quả truy vấn giỏ hàng
if ($cartsResult && $cartsResult->num_rows > 0) {
    $carts = $cartsResult->fetch_all(MYSQLI_ASSOC);
} else {
    $carts = []; // Nếu không có giỏ hàng, trả về mảng rỗng
}

// Truy vấn dữ liệu đơn hàng
$ordersQuery = "SELECT o.order_id, u.username, u.phone_number, o.total_price, o.created_at, o.status
                FROM orders o
                JOIN users u ON o.user_id = u.user_id";
$ordersResult = $conn->query($ordersQuery);

// Kiểm tra kết quả truy vấn đơn hàng
if ($ordersResult && $ordersResult->num_rows > 0) {
    $orders = $ordersResult->fetch_all(MYSQLI_ASSOC);
} else {
    $orders = []; // Nếu không có đơn hàng, trả về mảng rỗng
}

// Trả về dữ liệu dưới dạng JSON
echo json_encode([
    'carts' => $carts,
    'orders' => $orders
]);
?>

