<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

require_once '../config/db.php';
require_once "../middlewares/login_required.php";

$data = json_decode(file_get_contents("php://input"), true);
$user_id = $data["user_id"];
$status = $data["status"]; // 'active' hoặc 'locked'

if (!in_array($status, ['active', 'locked'])) {
    http_response_code(400);
    echo json_encode(["error" => "Trạng thái không hợp lệ"]);
    exit;
}

$sql = "UPDATE users SET status = ? WHERE user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $status, $user_id);

if ($stmt->execute()) {
    echo json_encode(["message" => "Cập nhật trạng thái thành công"]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Lỗi khi cập nhật trạng thái"]);
}
?>
