<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// Kết nối cơ sở dữ liệu
require_once '../config/db.php';

$search = isset($_GET['search']) ? '%' . $_GET['search'] . '%' : '%';

$stmt = $conn->prepare("SELECT * FROM products WHERE name LIKE ? ORDER BY updated_at DESC");
$stmt->bind_param("s", $search);
$stmt->execute();

$result = $stmt->get_result();
$products = [];

while ($row = $result->fetch_assoc()) {
  $products[] = $row;
}

header('Content-Type: application/json');
echo json_encode($products);

?>

