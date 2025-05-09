<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
//header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

/*if (session_status() === PHP_SESSION_NONE) {
    session_start();
}*/

require_once "../config/db.php";

$data = json_decode(file_get_contents("php://input"), true);
$user_id = $data['user_id'];
$items = $data['items'];

$total_price = 0;
foreach ($items as $item) {
    $product_id = $item['product_id'];
    $quantity = $item['quantity'];
    $priceRes = $conn->query("SELECT price FROM products WHERE id=$product_id");
    $price = $priceRes->fetch_assoc()['price'];
    $total_price += $price * $quantity;
}

$stmt = $conn->prepare("INSERT INTO orders (user_id, total_price, status) VALUES (?, ?, 'completed')");
$stmt->bind_param("id", $user_id, $total_price);
$stmt->execute();
$order_id = $conn->insert_id;

foreach ($items as $item) {
    $stmt = $conn->prepare("INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?)");
    $stmt->bind_param("iii", $order_id, $item['product_id'], $item['quantity']);
    $stmt->execute();
}

echo json_encode(["success" => true, "order_id" => $order_id]);
?>