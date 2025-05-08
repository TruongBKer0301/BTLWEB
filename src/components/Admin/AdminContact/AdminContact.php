<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$host = "localhost";
$username = "root";
$password = "";
$database = "csdlweb";
$port = 3344;

$conn = new mysqli($host, $username, $password, $database, $port);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // Fetch all contacts
    $result = $conn->query("SELECT * FROM contact");
    $contacts = [];
    while ($row = $result->fetch_assoc()) {
        $contacts[] = $row;
    }
    echo json_encode($contacts);
} elseif ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Handle actions
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $conn->real_escape_string($data["id"]);
    $action = $data["action"];

    if ($action === "Đã đọc") {
        $conn->query("UPDATE contact SET status='Đã đọc' WHERE id='$id'");
    } elseif ($action === "Chưa đọc") {
        $conn->query("UPDATE contact SET status='Chưa đọc' WHERE id='$id'");
    } elseif ($action === "Đã phản hồi") {
        $conn->query("UPDATE contact SET status='Đã phản hồi' WHERE id='$id'");
    } elseif ($action === "Xóa") {
        $conn->query("DELETE FROM contact WHERE id='$id'");
    }
    echo json_encode(["success" => true]);
}

$conn->close();
?>