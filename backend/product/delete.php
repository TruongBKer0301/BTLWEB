<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

require_once '../config/db.php';
//require_once "../middlewares/login_required.php";

// Xử lý preflight (CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$data = json_decode(file_get_contents("php://input"));
$id = $data->product_id;

$stmt = $conn->prepare("DELETE FROM products WHERE product_id=?");
$stmt->bind_param("i", $id);
$stmt->execute();

echo json_encode(['success' => true]);
?>
