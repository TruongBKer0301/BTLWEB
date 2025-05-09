<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

require_once '../config/db.php';
//require_once "../middlewares/login_required.php";

$search = $_GET['search'] ?? '';

$sql = "SELECT user_id, username, email, phone_number, avatar, role, status FROM users 
        WHERE role != 'admin' AND (username LIKE ? OR email LIKE ?)";

$stmt = $conn->prepare($sql);
$param = "%$search%";
$stmt->bind_param('ss', $param, $param);
$stmt->execute();

$result = $stmt->get_result();
$users = [];

while ($row = $result->fetch_assoc()) {
    $users[] = $row;
}

echo json_encode($users);
?>
