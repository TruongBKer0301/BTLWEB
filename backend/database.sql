-- Create Database
CREATE DATABASE IF NOT EXISTS company_website;

-- Use the created database
USE company_website;

-- Table: users
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone_number VARCHAR(20),
    avatar VARCHAR(255),
    role ENUM('user', 'admin') DEFAULT 'user',
    status ENUM('active', 'locked') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: products
CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(100),
    image VARCHAR(255),
    stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: orders
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    product_id INT,
    quantity INT DEFAULT 1,
    status ENUM('pending', 'processing', 'completed', 'canceled') DEFAULT 'pending',
    total_price DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);


-- Table: carts
CREATE TABLE carts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    product_id INT,
    quantity INT DEFAULT 1,
    status ENUM('active', 'spending') DEFAULT 'spending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE faq (
    id INT PRIMARY KEY AUTO_INCREMENT,
    question TEXT NOT NULL,
    answer TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contact (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    status ENUM('Chưa đọc', 'Đã đọc', 'Đã phản hồi') DEFAULT 'Chưa đọc',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE site_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Thêm dữ liệu mẫu
INSERT INTO site_settings (setting_key, setting_value) VALUES
('site_name', 'Công ty TNHH ABC'),
('phone', '+84 123 456 789'),
('email', 'info@abc.com'),
('address', '123 Đường Lê Lợi, TP Huế'),
('about_us', 'Công ty TNHH ABC chuyên cung cấp các sản phẩm sạch và chất lượng.'),
('logo', 'images/logo.png'),
('banner_image', 'images/banner.jpg');

-- Sample products
INSERT INTO products (name, description, price, category, image, stock) VALUES
('Cảm biến nhiệt độ DHT11', 'Cảm biến nhiệt độ và độ ẩm cho các dự án IoT cơ bản.', 65000, 'Cảm biến', 'https://iotsolutions.vn/wp-content/uploads/2023/07/dht11.jpg', 120),
('ESP8266 NodeMCU', 'Vi điều khiển tích hợp WiFi, lý tưởng cho các ứng dụng IoT.', 95000, 'Vi điều khiển', 'https://iotsolutions.vn/wp-content/uploads/2023/07/esp8266.jpg', 80),
('Relay 1 kênh 5V', 'Module relay điều khiển thiết bị điện thông qua vi điều khiển.', 25000, 'Module', 'https://iotsolutions.vn/wp-content/uploads/2023/07/relay-5v.jpg', 150),
('Cảm biến ánh sáng BH1750', 'Dùng để đo độ sáng môi trường, giao tiếp I2C.', 40000, 'Cảm biến', 'https://iotsolutions.vn/wp-content/uploads/2023/07/bh1750.jpg', 60),
('Màn hình OLED 0.96 inch I2C', 'Hiển thị dữ liệu với màn hình OLED đơn sắc.', 75000, 'Hiển thị', 'https://iotsolutions.vn/wp-content/uploads/2023/07/oled.jpg', 90);
