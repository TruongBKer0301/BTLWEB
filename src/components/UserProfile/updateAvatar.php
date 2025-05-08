<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, OPTIONS");
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

$userId = intval($_POST['id'] ?? 0);
if (!$userId || !isset($_FILES['avatar'])) {
    http_response_code(400);
    echo json_encode(["error" => "Dữ liệu không hợp lệ"]);
    exit;
}

$file = $_FILES['avatar'];
$ext = pathinfo($file['name'], PATHINFO_EXTENSION);
$allowed = ['jpg','jpeg','png','gif'];
if (!in_array(strtolower($ext), $allowed)) {
    http_response_code(400);
    echo json_encode(["error" => "Chỉ hỗ trợ JPG/PNG/GIF"]);
    exit;
}

$newName = 'avatar_'.uniqid().'.'.$ext;
$uploadDir = __DIR__ . '/../../../public/';
if (!move_uploaded_file($file['tmp_name'], $uploadDir.$newName)) {
    http_response_code(500);
    echo json_encode(["error" => "Upload thất bại"]);
    exit;
}

$stmt = $conn->prepare("UPDATE users SET avatar = ? WHERE user_id = ?");
$stmt->bind_param("si", $newName, $userId);
if (!$stmt->execute()) {
    http_response_code(500);
    echo json_encode(["error" => "Không thể cập nhật avatar"]);
    exit;
}
$stmt->close();
$conn->close();

$avatarUrl = "http://localhost/btlweb/BTLWEB/public/".$newName;
echo json_encode([
    "success"     => true,
    "avatar_url"  => $avatarUrl
]);
