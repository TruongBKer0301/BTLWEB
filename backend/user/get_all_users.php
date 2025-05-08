<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

require_once '../config/db.php';
require_once "../middlewares/login_required.php";

$sql = "SELECT user_id, username, email, avatar, role, status, created_at, updated_at FROM users";
$result = $conn->query($sql);

$users = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
}

// Trả về dữ liệu dưới dạng JSON, luôn có key "users"
echo json_encode(["users" => $users]);
?>
