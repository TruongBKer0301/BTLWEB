<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$mysqli = new mysqli('localhost', 'root', '', 'iot_web');
if ($mysqli->connect_errno) {
    http_response_code(500);
    echo json_encode(['error' => 'DB connection failed']);
    exit;
}

$page   = isset($_GET['page'])  ? max(1, (int)$_GET['page'])   : 1;
$limit  = isset($_GET['limit']) ? max(1, (int)$_GET['limit'])  : 5;
$offset = ($page - 1) * $limit;

$resTotal = $mysqli->query("SELECT COUNT(*) AS cnt FROM faq");
$total    = (int)$resTotal->fetch_assoc()['cnt'];
$totalPages = (int)ceil($total / $limit);

$stmt = $mysqli->prepare("
    SELECT id, question, answer, created_at
    FROM faq
    ORDER BY created_at DESC
    LIMIT ?, ?
");
$stmt->bind_param('ii', $offset, $limit);
$stmt->execute();
$result = $stmt->get_result();
$data = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode([
    'data'       => $data,
    'page'       => $page,
    'limit'      => $limit,
    'totalPages' => $totalPages,
    'total'      => $total
]);
