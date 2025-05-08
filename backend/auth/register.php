<?php
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

// Đọc dữ liệu từ body request
$data = json_decode(file_get_contents("php://input"), true);

// Log dữ liệu nhận được từ client
file_put_contents("php://stderr", "Received data: " . print_r($data, true) . "\n");

$username = $data['name'] ?? '';  // Nếu không có 'name', dùng giá trị rỗng
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';
$phone_number = $data['phone'] ?? '';  // thêm số điện thoại
$role = $data['role'] ?? 'user'; // user hoặc admin

// Kiểm tra các trường dữ liệu
if ($username && $email && $password && $phone_number) {  // kiểm tra tất cả các trường
    $hash = password_hash($password, PASSWORD_BCRYPT);

    // Cập nhật câu lệnh SQL để thêm số điện thoại vào bảng users
    $stmt = $conn->prepare("INSERT INTO users (username, email, password, phone_number, role) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $username, $email, $hash, $phone_number, $role);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Đăng ký thành công"]);
    } else {
        http_response_code(400);
        echo json_encode(["message" => "Lỗi: Tài khoản hoặc email đã tồn tại"]);
    }
    $stmt->close();
} else {
    // Nếu thiếu thông tin, log ra lỗi
    file_put_contents("php://stderr", "Thiếu thông tin: " . print_r($data, true) . "\n");

    http_response_code(422);
    echo json_encode(["message" => "Thiếu thông tin"]);
}

$conn->close();
?>
