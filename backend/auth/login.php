<?php
session_start();  // Khởi tạo session

// Cấu hình CORS cho phép yêu cầu từ localhost:3000
header("Access-Control-Allow-Origin: http://localhost:3000");  // Cung cấp origin cụ thể thay vì '*'
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE"); // Các phương thức HTTP được phép
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Các header mà client có thể gửi
header("Access-Control-Allow-Credentials: true");  // Cho phép gửi cookie/session
header("Content-Type: application/json");  // Đảm bảo content type là JSON

// Xử lý yêu cầu CORS "preflight" (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0); // Nếu là preflight request, trả về ngay
}

require_once "../config/db.php";

$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

if ($email && $password) {
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($user = $result->fetch_assoc()) {
        if (password_verify($password, $user['password'])) {
            // Lưu thông tin người dùng vào session
            $_SESSION['user'] = [
                "user_id" => $user['user_id'],
                "username" => $user['username'],
                "email" => $user['email'],
                "role" => $user['role']
            ];
            echo json_encode(["message" => "Đăng nhập thành công", "user" => $_SESSION['user']]);
        } else {
            http_response_code(401);
            echo json_encode(["message" => "Sai mật khẩu"]);
        }
    } else {
        http_response_code(404);
        echo json_encode(["message" => "Email không tồn tại"]);
    }
    $stmt->close();
} else {
    http_response_code(422);
    echo json_encode(["message" => "Thiếu thông tin"]);
}
$conn->close();

?>