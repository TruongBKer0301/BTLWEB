<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$host     = 'localhost';
$user     = 'root';
$password = '';
$database = 'iot_web';

$mysqli = new mysqli($host, $user, $password, $database);
if ($mysqli->connect_errno) {
    http_response_code(500);
    echo json_encode(['error' => $mysqli->connect_error]);
    exit;
}

$action = $_REQUEST['action'] ?? '';

switch ($action) {
    case 'list':
        $res = $mysqli->query("SELECT * FROM faq ORDER BY created_at DESC");
        $out = [];
        while ($row = $res->fetch_assoc()) {
            $out[] = $row;
        }
        echo json_encode($out);
        break;
    case 'create':
        $q = $mysqli->real_escape_string($_POST['question']);
        $a = $mysqli->real_escape_string($_POST['answer']);
        $mysqli->query("INSERT INTO faq (question, answer) VALUES ('$q', '$a')");
        echo json_encode(['success' => true, 'id' => $mysqli->insert_id]);
        break;
    case 'update':
        $id = (int)$_POST['id'];
        $q  = $mysqli->real_escape_string($_POST['question']);
        $a  = $mysqli->real_escape_string($_POST['answer']);
        $mysqli->query("UPDATE faq SET question='$q', answer='$a' WHERE id=$id");
        echo json_encode(['success' => true]);
        break;
    case 'delete':
        $id = (int)$_POST['id'];
        $mysqli->query("DELETE FROM faq WHERE id=$id");
        echo json_encode(['success' => true]);
        break;
    default:
        http_response_code(400);
        echo json_encode(['error' => 'Invalid action']);
}

$mysqli->close();
