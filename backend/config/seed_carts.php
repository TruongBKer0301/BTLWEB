<?php
require_once "../config/db.php";

function getUserId($username, $conn) {
    $stmt = $conn->prepare("SELECT user_id FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->bind_result($id);
    $stmt->fetch();
    $stmt->close();
    return $id;
}

$carts = [
    ["user" => "user1", "product_id" => 1, "quantity" => 2, "status" => "active"],
    ["user" => "user1", "product_id" => 2, "quantity" => 1, "status" => "spending"],
    ["user" => "user2", "product_id" => 3, "quantity" => 4, "status" => "active"],
    ["user" => "user2", "product_id" => 4, "quantity" => 1, "status" => "spending"],
];

foreach ($carts as $c) {
    $uid = getUserId($c["user"], $conn);
    $stmt = $conn->prepare("INSERT INTO carts (user_id, product_id, quantity, status) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("iiis", $uid, $c["product_id"], $c["quantity"], $c["status"]);
    $stmt->execute();
    $stmt->close();
}

$conn->close();
?>
