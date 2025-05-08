<?php
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

$sql    = "SELECT id, question, answer FROM faq ORDER BY created_at DESC";
$result = $mysqli->query($sql);
$faqs   = [];

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $faqs[] = $row;
    }
} else {
    http_response_code(500);
    echo json_encode(['error' => $mysqli->error]);
    exit;
}

$mysqli->close();
echo json_encode($faqs);
