<?php
header("Access-Control-Allow-Origin: *");
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

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

$action = $_REQUEST['action'] ?? '';

switch ($action) {
    case 'list':
        $page   = isset($_GET['page'])  ? max(1, (int)$_GET['page'])   : 1;
        $limit  = isset($_GET['limit']) ? max(1, (int)$_GET['limit'])  : 10;
        $offset = ($page - 1) * $limit;

        $resTotal = $mysqli->query("SELECT COUNT(*) AS cnt FROM faq");
        $total    = (int)$resTotal->fetch_assoc()['cnt'];

        $res = $mysqli->query("
            SELECT id, question, answer, created_at
            FROM faq
            ORDER BY created_at DESC
            LIMIT $offset, $limit
        ");
        $data = $res->fetch_all(MYSQLI_ASSOC);

        echo json_encode([
            'data'  => $data,
            'total' => $total,
            'page'  => $page,
            'limit' => $limit
        ]);
        break;

    case 'create':
        $q = $mysqli->real_escape_string($_POST['question'] ?? '');
        $a = $mysqli->real_escape_string($_POST['answer']   ?? '');
        if ($q === '' || $a === '') {
            http_response_code(400);
            echo json_encode(['error' => 'Question and answer are required.']);
            exit;
        }
        $stmt = $mysqli->prepare("INSERT INTO faq (question, answer) VALUES (?, ?)");
        $stmt->bind_param('ss', $q, $a);
        $ok = $stmt->execute();
        echo json_encode(['success' => (bool)$ok, 'id' => $stmt->insert_id]);
        break;

    case 'update':
        $id = (int)($_POST['id'] ?? 0);
        $q  = $mysqli->real_escape_string($_POST['question'] ?? '');
        $a  = $mysqli->real_escape_string($_POST['answer']   ?? '');
        if ($id < 1 || $q === '' || $a === '') {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid data.']);
            exit;
        }
        $stmt = $mysqli->prepare("UPDATE faq SET question = ?, answer = ? WHERE id = ?");
        $stmt->bind_param('ssi', $q, $a, $id);
        $ok = $stmt->execute();
        echo json_encode(['success' => (bool)$ok]);
        break;

    case 'delete':
        $id = (int)($_POST['id'] ?? 0);
        if ($id < 1) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid ID.']);
            exit;
        }
        $stmt = $mysqli->prepare("DELETE FROM faq WHERE id = ?");
        $stmt->bind_param('i', $id);
        $ok = $stmt->execute();
        echo json_encode(['success' => (bool)$ok]);
        break;

    default:
        http_response_code(400);
        echo json_encode(['error' => 'Invalid action.']);
}
