<?php
//include '../AdminUser/session.php';
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

//checkLogin();

$mysqli = new mysqli('localhost', 'root', '', 'iot_web');
if ($mysqli->connect_error) {
    http_response_code(500);
    echo json_encode(['error' => 'DB connect failed']);
    exit;
}

$action = $_REQUEST['action'] ?? '';

if ($action === 'get') {
    $uid = $_SESSION['user']['id'];
    $stmt = $mysqli->prepare(
        "SELECT username, email, phone_number, avatar 
       FROM users WHERE user_id = ?"
    );
    $stmt->bind_param('i', $uid);
    $stmt->execute();
    $result = $stmt->get_result()->fetch_assoc();
    echo json_encode($result);
    exit;
}

if ($action === 'update') {
    $uid      = $_SESSION['user']['id'];
    $username = $_POST['username']   ?? '';
    $email    = $_POST['email']      ?? '';
    $phone    = $_POST['phone']      ?? '';

    // bắt đầu build SQL động nếu có upload avatar
    $fields = "username = ?, email = ?, phone_number = ?";
    $types  = "ssi";
    $params = [$username, $email, $phone];

    // xử lý upload avatar nếu có
    if (isset($_FILES['avatar_file']) && $_FILES['avatar_file']['error'] === UPLOAD_ERR_OK) {
        $uploaddir = __DIR__ . '/uploads/';
        if (!is_dir($uploaddir)) mkdir($uploaddir, 0755, true);
        $ext = pathinfo($_FILES['avatar_file']['name'], PATHINFO_EXTENSION);
        $filename = uniqid('avatar_') . '.' . $ext;
        $target = $uploaddir . $filename;
        if (move_uploaded_file($_FILES['avatar_file']['tmp_name'], $target)) {
            $avatarUrl = "/btlweb/BTLWEB/src/components/UserProfile/uploads/{$filename}";
            $fields .= ", avatar = ?";
            $types  .= "s";
            $params[] = $avatarUrl;
        }
    }

    // thêm điều kiện WHERE
    $sql = "UPDATE users SET {$fields} WHERE user_id = ?";
    $types .= "i";
    $params[] = $uid;

    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param($types, ...$params);
    if ($stmt->execute()) {
        $resp = ['success' => true];
        if (!empty($avatarUrl)) {
            $resp['avatar'] = $avatarUrl;
        }
        echo json_encode($resp);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Update failed']);
    }
    exit;
}

if ($action === 'change_password') {
    $uid    = $_SESSION['user']['id'];
    $newHash= password_hash($_POST['password'], PASSWORD_DEFAULT);
    $stmt   = $mysqli->prepare("UPDATE users SET password = ? WHERE user_id = ?");
    $stmt->bind_param('si', $newHash, $uid);
    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Password change failed']);
    }
    exit;
}

http_response_code(400);
echo json_encode(['error' => 'Unknown action']);
