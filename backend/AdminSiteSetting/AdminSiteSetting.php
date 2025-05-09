<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST, GET');
header('Access-Control-Allow-Headers: Content-Type');

$host = "localhost";
$username = "root";
$password = "";
$database = "csdlweb";
$port = 3344;

$conn = new mysqli($host, $username, $password, $database, $port);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Kết nối thất bại: " . $conn->connect_error]);
    exit;
}

$action = $_GET['action'] ?? '';

if ($action === 'get') {
    $result = $conn->query("SELECT setting_key, setting_value FROM site_settings");
    $settings = [];
    while ($row = $result->fetch_assoc()) {
        $settings[$row['setting_key']] = $row['setting_value'];
    }
    echo json_encode($settings);
} elseif ($action === 'update') {
    $data = json_decode(file_get_contents("php://input"), true);
    foreach ($data as $key => $value) {
        $stmt = $conn->prepare("UPDATE site_settings SET setting_value = ? WHERE setting_key = ?");
        $stmt->bind_param("ss", $value, $key);
        $stmt->execute();
        $stmt->close();
    }
    echo json_encode(["message" => "Cập nhật thành công"]);
} else {
    http_response_code(400);
    echo json_encode(["error" => "Hành động không hợp lệ"]);
}

$conn->close();
