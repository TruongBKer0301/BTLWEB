<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// Kết nối cơ sở dữ liệu
require_once '../config/db.php';

$sql = "SELECT o.order_id, o.status, o.total_price, o.quantity, o.created_at,
               u.username, u.phone_number,
               p.name AS product_name
        FROM orders o
        JOIN users u ON o.user_id = u.user_id
        JOIN products p ON o.product_id = p.product_id
        ORDER BY o.created_at DESC";

$result = $conn->query($sql);
$orders = [];

while ($row = $result->fetch_assoc()) {
    $orders[] = $row;
}

echo json_encode($orders);
?>