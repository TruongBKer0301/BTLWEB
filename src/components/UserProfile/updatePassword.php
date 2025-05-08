<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST ,OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$host = "localhost";
$username = "root";
$password = "";
$database = "iot_web";

$conn = new mysqli($host, $username, $password, $database);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Connection failed"]);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$userId = intval($data['id'] ?? 0);
$currentPwd = $data['current_password'] ?? '';
$newPwd = $data['new_password'] ?? '';
$confirmNewPwd = $data['confirm_password'] ?? '';

if (!$userId || !$currentPwd || !$newPwd || $newPwd !== $confirmNewPwd) {
    http_response_code(400);
    echo json_encode(["error" => "Dữ liệu không hợp lệ"]);
    exit;
}

// Lấy hash mật khẩu hiện tại
$stmt = $conn->prepare("SELECT password FROM users WHERE user_id = ?");
$stmt->bind_param("i", $userId);
$stmt->execute();
$res = $stmt->get_result();
if (!$row = $res->fetch_assoc()) {
    http_response_code(404);
    echo json_encode(["error" => "Người dùng không tồn tại"]);
    exit;
}
$stmt->close();

if (!password_verify($currentPwd, $row['password'])) {
    http_response_code(401);
    echo json_encode(["error" => "Mật khẩu hiện tại không đúng"]);
    exit;
}

// Cập nhật mật khẩu mới
$newHash = password_hash($newPwd, PASSWORD_DEFAULT);
$stmt = $conn->prepare("UPDATE users SET password = ? WHERE user_id = ?");
$stmt->bind_param("si", $newHash, $userId);
if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Không thể cập nhật mật khẩu"]);
}
$stmt->close();
$conn->close();
