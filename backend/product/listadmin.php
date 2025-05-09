<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once "../config/db.php";
require_once "../middlewares/login_required.php";

// Lấy tham số search từ URL
$search = isset($_GET['search']) ? $_GET['search'] : '';

// Tạo câu lệnh SQL với điều kiện tìm kiếm
$sql = "
    SELECT c.id, u.username AS user_name, p.name AS product_name, c.quantity, c.status
    FROM carts c
    JOIN users u ON c.user_id = u.id
    JOIN products p ON c.product_id = p.id
";

// Nếu có từ khóa tìm kiếm, thêm điều kiện LIKE
if ($search) {
    $sql .= " WHERE p.name LIKE '%" . $conn->real_escape_string($search) . "%' OR u.username LIKE '%" . $conn->real_escape_string($search) . "%'";
}

$result = $conn->query($sql);

$carts = [];

while ($row = $result->fetch_assoc()) {
    $carts[] = $row;
}

echo json_encode($carts);
?>
