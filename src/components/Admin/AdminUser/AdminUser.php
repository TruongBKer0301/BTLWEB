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
    $limit = max(1, intval($_GET['limit'] ?? 10));
    $offset = ($page - 1) * $limit;

    $res = $mysqli->query("SELECT COUNT(*) AS cnt FROM users");
    $total = $res ? intval($res->fetch_assoc()['cnt']) : 0;

    $sql = "SELECT 
                user_id AS id,
                username,
                email,
                phone_number,
                avatar,
                role,
                status,
                created_at,
                updated_at
            FROM users
            ORDER BY user_id DESC
            LIMIT ? OFFSET ?";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param('ii', $limit, $offset);
    $stmt->execute();
    $result = $stmt->get_result();

    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode([
        'data'  => $data,
        'total' => $total,
        'page'  => $page
    ]);
    exit;
}

if (in_array($action, ['reset','lock','unlock'])) {
    $id = intval($_POST['id'] ?? 0);
    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid user ID']);
        exit;
    }

    if ($action === 'reset') {
        $newHash = password_hash('12345678', PASSWORD_DEFAULT);
        $stmt = $mysqli->prepare("UPDATE users SET password = ? WHERE user_id = ?");
        $stmt->bind_param('si', $newHash, $id);
    } else {
        $newStatus = ($action === 'lock') ? 'locked' : 'active';
        $stmt = $mysqli->prepare("UPDATE users SET status = ? WHERE user_id = ?");
        $stmt->bind_param('si', $newStatus, $id);
    }

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Update failed: '.$stmt->error]);
    }
    exit;
}

http_response_code(400);
echo json_encode(['error' => 'Unknown action']);
