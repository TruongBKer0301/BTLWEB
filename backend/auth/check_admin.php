<?php
header('Access-Control-Allow-Origin: http://localhost:3000'); // Cho phép gọi từ React
header('Access-Control-Allow-Credentials: true'); // Cho phép gửi cookie (session)
header('Content-Type: application/json');

require_once '../config/db.php';


if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

if (!isset($_SESSION['user']) || $_SESSION['user']['role'] !== 'admin') {
    http_response_code(403);
    echo json_encode(["message" => "Bạn không có quyền truy cập"]);
    exit;
}

echo json_encode(["message" => "authorized"]);

?>