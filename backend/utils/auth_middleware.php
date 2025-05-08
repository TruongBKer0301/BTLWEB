<?php
session_start();

function is_logged_in() {
    return isset($_SESSION['user']);
}

function is_admin() {
    return isset($_SESSION['user']) && $_SESSION['user']['role'] === 'admin';
}

function require_login() {
    if (!is_logged_in()) {
        http_response_code(401);
        echo json_encode(["error" => "Unauthorized. Please log in."]);
        exit;
    }
}

function require_admin() {
    if (!is_admin()) {
        http_response_code(403);
        echo json_encode(["error" => "Forbidden. Admins only."]);
        exit;
    }
}
?>
