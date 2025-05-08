<?php
session_start();
session_unset();
session_destroy();

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, OPTIONS");
echo json_encode(["message" => "Đã đăng xuất"]);

?>