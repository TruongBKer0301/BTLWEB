<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

if (!isset($_SESSION['user'])) {
    http_response_code(401);
    echo json_encode(["message" => "Bạn chưa đăng nhập"]);
    exit;
}
?>
