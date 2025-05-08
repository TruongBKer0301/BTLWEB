<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

require_once '../config/db.php';
require_once "../middlewares/login_required.php";

$data = json_decode(file_get_contents("php://input"), true);
$user_id = $data["user_id"];

$defaultPassword = password_hash("123456", PASSWORD_DEFAULT);

$sql = "UPDATE users SET password = ? WHERE user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $defaultPassword, $user_id);

if ($stmt->execute()) {
    echo json_encode(["message" => "Reset mật khẩu thành công"]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Lỗi khi reset mật khẩu"]);
}
?>
