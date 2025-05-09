<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

require_once "../config/db.php";
//require_once "../middlewares/login_required.php";

// Xử lý request OPTIONS (preflight CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$name = $_POST['name'];
$description = $_POST['description'];
$price = $_POST['price'];
$category = $_POST['category'];
$stock = $_POST['stock'];

$imageName = '';
if (!empty($_FILES['image']['name'])) {
  $imageName = uniqid() . '_' . basename($_FILES['image']['name']);
  move_uploaded_file($_FILES['image']['tmp_name'], '../uploads/' . $imageName);
}

$sql = "INSERT INTO products (name, description, price, category, image, stock) VALUES (?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssdssi", $name, $description, $price, $category, $imageName, $stock);
$stmt->execute();

echo json_encode(['success' => true]);
?>
