<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
//header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}
/*
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}*/

require_once "../config/db.php";
//require_once "../middlewares/login_required.php";
// Lấy dữ liệu JSON từ client
$data = json_decode(file_get_contents("php://input"), true);
$cart_id = $data['cart_id'];
$status = $data['status'];

$stmt = $conn->prepare("UPDATE carts SET status=? WHERE id=?");
$stmt->bind_param("si", $status, $cart_id);
$stmt->execute();

echo json_encode(["success" => true]);
?>