<?php
require_once "../config/db.php";

// Lấy user_id từ username
function getUserId($username, $conn) {
    $stmt = $conn->prepare("SELECT user_id FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->bind_result($id);
    $stmt->fetch();
    $stmt->close();
    return $id;
}

$orders = [
    ["user" => "user1", "status" => "processing", "total" => 155000],
    ["user" => "user2", "status" => "completed", "total" => 250000],
    ["user" => "user1", "status" => "pending", "total" => 95000],
];

foreach ($orders as $o) {
    $uid = getUserId($o["user"], $conn);
    $stmt = $conn->prepare("INSERT INTO orders (user_id, status, total_price) VALUES (?, ?, ?)");
    $stmt->bind_param("isd", $uid, $o["status"], $o["total"]);
    $stmt->execute();
    $stmt->close();
}

$conn->close();
?>
