<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

require_once '../config/db.php';
//require_once "../middlewares/login_required.php";


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$id = $_POST['product_id'];
$name = $_POST['name'];
$description = $_POST['description'];
$price = $_POST['price'];
$category = $_POST['category'];
$stock = $_POST['stock'];

$imageName = '';
if (!empty($_FILES['image']['name'])) {
  $imageName = uniqid() . '_' . basename($_FILES['image']['name']);
  move_uploaded_file($_FILES['image']['tmp_name'], '../uploads/' . $imageName);
  $sql = "UPDATE products SET name=?, description=?, price=?, category=?, image=?, stock=? WHERE product_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("ssdssii", $name, $description, $price, $category, $imageName, $stock, $id);
} else {
  $sql = "UPDATE products SET name=?, description=?, price=?, category=?, stock=? WHERE product_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("ssdiii", $name, $description, $price, $category, $stock, $id);
}

$stmt->execute();
echo json_encode(['success' => true]);
?>
