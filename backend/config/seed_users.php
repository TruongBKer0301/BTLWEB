<?php
require_once "../config/db.php";

// Dữ liệu người dùng mẫu
$users = [
    [
        "username" => "admin",
        "password" => "admin123",
        "email" => "admin@example.com",
        "phone" => "0909000000",
        "role" => "admin"
    ],
    [
        "username" => "user1",
        "password" => "user1234",
        "email" => "user1@example.com",
        "phone" => "0909000001",
        "role" => "user"
    ],
    [
        "username" => "user2",
        "password" => "user1234",
        "email" => "user2@example.com",
        "phone" => "0909000002",
        "role" => "user"
    ]
];

foreach ($users as $u) {
    $hash = password_hash($u['password'], PASSWORD_BCRYPT);
    $stmt = $conn->prepare("INSERT INTO users (username, password, email, phone_number, role) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $u['username'], $hash, $u['email'], $u['phone'], $u['role']);
    if ($stmt->execute()) {
        echo "Thêm {$u['username']} thành công\n";
    } else {
        echo "Lỗi khi thêm {$u['username']}: " . $stmt->error . "\n";
    }
    $stmt->close();
}

$conn->close();
?>
