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

// Tiếp tục xử lý logic như bạn đã viết
$data = json_decode(file_get_contents("php://input"), true);
$order_id = $data['order_id'];
$status = $data['status'];

$stmt = $conn->prepare("UPDATE orders SET status=? WHERE order_id=?");
$stmt->bind_param("si", $status, $order_id);
$stmt->execute();

echo json_encode(["success" => true]);
?>
