<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$mysqli = new mysqli('localhost', 'root', '', 'iot_web');
if ($mysqli->connect_error) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

$action = $_REQUEST['action'] ?? '';

if ($action === 'list') {
    $page  = max(1, intval($_GET['page'] ?? 1));
    $limit = max(1, intval($_GET['limit'] ?? 20));
    $offset = ($page - 1) * $limit;

    $totalRes = $mysqli->query("SELECT COUNT(*) AS cnt FROM users");
    $total = $totalRes->fetch_assoc()['cnt'];

    $stmt = $mysqli->prepare("SELECT id, username, email, role, status, created_at 
                              FROM users 
                              ORDER BY id DESC 
                              LIMIT ? OFFSET ?");
    $stmt->bind_param('ii', $limit, $offset);
    $stmt->execute();
    $result = $stmt->get_result();

    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode([
        'data'  => $data,
        'total' => intval($total),
        'page'  => $page
    ]);
    exit;
}

if ($action === 'reset' || $action === 'lock' || $action === 'unlock') {
    $id = intval($_POST['id'] ?? 0);
    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid user ID']);
        exit;
    }

    if ($action === 'reset') {
        // mật khẩu mặc định là '123456'
        $newHash = password_hash('123456', PASSWORD_DEFAULT);
        $stmt = $mysqli->prepare("UPDATE users SET hashed_password = ? WHERE id = ?");
        $stmt->bind_param('si', $newHash, $id);
    } else {
        $newStatus = ($action === 'lock') ? 'locked' : 'active';
        $stmt = $mysqli->prepare("UPDATE users SET status = ? WHERE id = ?");
        $stmt->bind_param('si', $newStatus, $id);
    }
    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Update failed']);
    }
    exit;
}

http_response_code(400);
echo json_encode(['error' => 'Unknown action']);
