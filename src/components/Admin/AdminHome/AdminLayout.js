import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { Navbar, Nav, Container, Spinner } from 'react-bootstrap';
import BASE_URL from '../../../config/config'; // Đường dẫn tới file chứa BASE_URL
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const AdminLayout = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const response = await fetch(`${BASE_URL}auth/check_admin.php`, {
                    credentials: 'include', // cần thiết để gửi cookie session
                });

                if (response.status === 200) {
                    setAuthorized(true);
                } else {
                    setAuthorized(false);
                    navigate('/login'); // hoặc trang báo lỗi
                }
            } catch (err) {
                console.error('Lỗi xác thực quyền:', err);
                navigate('/login');
            } finally {
                setIsLoading(false);
            }
        };

        checkAdmin();
    }, [navigate]);

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <Spinner animation="border" />
                <span className="ms-2">Đang kiểm tra quyền truy cập...</span>
            </div>
        );
    }

    if (!authorized) {
        return null; // hoặc hiển thị thông báo "Không có quyền"
    }

    return (
        <div>
            {/* Header Section */}
            <div className="bg-primary text-white p-3">
                <div className="d-flex justify-content-between align-items-center">
                    <h1>Quản lý Hệ thống</h1>
                    <div className="dropdown">
                        <a
                            href="#"
                            id="topbarUserDropdown"
                            className="user-dropdown d-flex align-items-center dropend dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <div className="avatar avatar-md2 me-2">
                                <img src="./../../../images/default-avatar.jpg" alt="Avatar" />
                            </div>
                            <h6 className="user-dropdown-name mb-0 text-white">Admin</h6>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end shadow-lg">
                            <li><a className="dropdown-item" href="#">My Account</a></li>
                            <li><a className="dropdown-item" href="#">Settings</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><a className="dropdown-item" href="auth-login.html">Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Navbar Section */}
            <Navbar bg="secondary" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="#">Dashboard</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            {/* Các Nav.Link giống như bạn đã có */}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Main Content */}
            <div className="container mt-4">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;
