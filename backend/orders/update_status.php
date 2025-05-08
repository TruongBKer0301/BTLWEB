<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// Kết nối cơ sở dữ liệu
require_once '../config/db.php';

$data = json_decode(file_get_contents("php://input"), true);
$order_id = $conn->real_escape_string($data['order_id']);
$status = $conn->real_escape_string($data['status']);

$sql = "UPDATE orders SET status = '$status', updated_at = NOW() WHERE order_id = $order_id";
if ($conn->query($sql) === TRUE) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['error' => $conn->error]);
}
?>