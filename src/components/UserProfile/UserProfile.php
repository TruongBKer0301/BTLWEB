<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$host     = "localhost";
$username = "root";
$password = "";
$database = "iot_web";

$conn = new mysqli($host, $username, $password, $database);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Connection failed"]);
    exit;
}

// Lấy id user từ query string, mặc định = 1
$id = isset($_GET['id']) ? intval($_GET['id']) : 1;

$stmt = $conn->prepare("SELECT user_id, name, email, avatar, phone_number FROM users WHERE user_id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    $row['avatar_url'] =
        "http://localhost/btlweb/BTLWEB/public/"
        . $row['avatar'];
    unset($row['avatar']);
    echo json_encode($row);
} else {
    http_response_code(404);
    echo json_encode(["error" => "User not found"]);
}

$stmt->close();
$conn->close();
?>
