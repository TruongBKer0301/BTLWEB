<?php
// src/components/Admin/AdminUser/adminUser.php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// cấu hình kết nối MySQL
$mysqli = new mysqli('localhost', 'root', '', 'iot_web');
if ($mysqli->connect_errno) {
    http_response_code(500);
    echo json_encode(['error' => $mysqli->connect_error]);
    exit;
}

$action = $_REQUEST['action'] ?? '';

switch ($action) {
    case 'list':
        $res = $mysqli->query("SELECT id, username, email, role, status, created_at FROM users ORDER BY created_at DESC");
        $out = [];
        while ($row = $res->fetch_assoc()) {
            $out[] = $row;
        }
        echo json_encode($out);
        break;

    case 'create':
        $u = $mysqli->real_escape_string($_POST['username']);
        $p = $_POST['password'];
        $h = password_hash($p, PASSWORD_DEFAULT);
        $e = $mysqli->real_escape_string($_POST['email']);
        $r = $mysqli->real_escape_string($_POST['role']);
        $s = $mysqli->real_escape_string($_POST['status']);
        $mysqli->query("INSERT INTO users (username, hashed_password, email, role, status) VALUES ('$u', '$h', '$e', '$r', '$s')");
        echo json_encode(['success' => true, 'id' => $mysqli->insert_id]);
        break;

    case 'update':
        $id = (int)$_POST['id'];
        $u  = $mysqli->real_escape_string($_POST['username']);
        $e  = $mysqli->real_escape_string($_POST['email']);
        $r  = $mysqli->real_escape_string($_POST['role']);
        $s  = $mysqli->real_escape_string($_POST['status']);
        $set = "username='$u', email='$e', role='$r', status='$s'";
        if (!empty($_POST['password'])) {
            $h = password_hash($_POST['password'], PASSWORD_DEFAULT);
            $set .= ", hashed_password='$h'";
        }
        $mysqli->query("UPDATE users SET $set WHERE id=$id");
        echo json_encode(['success' => true]);
        break;

    case 'delete':
        $id = (int)$_POST['id'];
        $mysqli->query("DELETE FROM users WHERE id=$id");
        echo json_encode(['success' => true]);
        break;

    default:
        http_response_code(400);
        echo json_encode(['error' => 'Invalid action']);
}

$mysqli->close();
