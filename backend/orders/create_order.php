<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// Kết nối cơ sở dữ liệu
require_once '../config/db.php';

$data = json_decode(file_get_contents("php://input"), true);

$user_id = (int)$data['user_id'];
$product_id = (int)$data['product_id'];
$quantity = (int)$data['quantity'];

// Lấy giá sản phẩm từ bảng products
$product_sql = "SELECT price FROM products WHERE product_id = $product_id";
$product_result = $conn->query($product_sql);

if ($product_result->num_rows === 0) {
    echo json_encode(['error' => 'Sản phẩm không tồn tại']);
    exit;
}

$product = $product_result->fetch_assoc();
$price = (float)$product['price'];
$total_price = $price * $quantity;

// Thêm đơn hàng
$insert_sql = "INSERT INTO orders (user_id, product_id, quantity, total_price) 
               VALUES ($user_id, $product_id, $quantity, $total_price)";

if ($conn->query($insert_sql) === TRUE) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['error' => $conn->error]);
}
?>