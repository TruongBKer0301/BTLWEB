<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

if (isset($_SESSION['user'])) {
    echo json_encode($_SESSION['user']);
} else {
    http_response_code(401);
    echo json_encode(["message" => "Chưa đăng nhập"]);
}
?>