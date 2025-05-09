<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

require_once '../config/db.php';
//require_once "../middlewares/login_required.php";

$data = json_decode(file_get_contents("php://input"), true);
$user_id = $data['user_id'];

$sql = "UPDATE users SET status = IF(status = 'active', 'locked', 'active') WHERE user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $user_id);
$stmt->execute();

echo json_encode(["success" => $stmt->affected_rows > 0]);
?>
