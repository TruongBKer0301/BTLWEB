import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home/home';
import Contact from './components/Contact/contact';
import Footer from './components/Footer/footer';
import Login from './components/Login/Login';
import Logout from './components/Login/Logout';

import About from './components/About/about';
import Faq from './components/Faq/faq'
//import UserProfile from "./components/UserProfile/UserProfile";
//import AdminHome from './components/Admin/AdminHome/AdminHome';
import AdminLayout from './components/Admin/AdminHome/AdminLayout';
import AdminContact from './components/Admin/AdminContact/AdminContact';
import AdminFaq from "./components/Admin/AdminFaq/AdminFaq";
//import AdminUser from "./components/Admin/AdminUser/AdminUser";
import AdminSiteSetting from './components/Admin/AdminSiteSetting/AdminSiteSetting';
import ProductList from './components/product/ProductList';
import ProductManager from './components/Admin/AdminDashboard/AdminDashboard';
import AdminOrderManager from './components/Admin/OrderList/OrderList';
import AdminUserManager from './components/Admin/AdminUser/AdminUserManager';

import './App.css';

function App() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <Router>
            <div className="d-flex flex-column min-vh-100">
                <Routes>
                    {/* Admin Routes */}
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route path="contact" element={<AdminContact />} />
                        <Route path="sitesetting" element={<AdminSiteSetting />} />
                        <Route path="faq" element={<AdminFaq />} />
                        <Route path="user" element={<AdminUserManager />} />
                        <Route path="product" element={<ProductManager />} />
                        <Route path="cart" element={<AdminOrderManager />} />
                    </Route>

                    {/* Non-Admin Routes */}
                    <Route
                        path="*"
                        element={
                            <>
                                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                                    <div>
                                        <Link className="navbar-brand" to="/">
                                            <img
                                                src="https://iotsolutions.vn/wp-content/uploads/2024/04/logo-ctY1.jpg"
                                                alt="IoT Solutions Logo"
                                                style={{ height: '80px', marginRight: '10px' }}
                                            />
                                        </Link>
                                    </div>
                                    <button
                                        className="navbar-toggler"
                                        onClick={() => setMenuOpen(!menuOpen)}
                                    >
                                        ☰
                                    </button>
                                    <ul className={`navbar-nav ${menuOpen ? 'show' : ''}`}>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/">Trang Chủ</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/about">Giới Thiệu</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/products">Sản Phẩm</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/solutions">Giải Pháp</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/news">Tin Tức</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/faq">FaQ</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/contact">Liên Hệ</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/logout">🛒 Giỏ Hàng</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/profile">Hồ sơ</Link>
                                        </li>
                                    </ul>
                                </nav>
                                <div className="flex-grow-1">
                                    <Routes>
                                        <Route path="/" element={<Home />} />
                                        <Route path="/contact" element={<Contact />} />
                                        <Route path="/login" element={<Login />} />
                                        <Route path="/about" element={<About />} />
                                        <Route path="/faq" element={<Faq />} />
                                        <Route path="/products" element={<ProductList />} />
                                        <Route path="/logout" element={<Logout />} />
                                    </Routes>
                                </div>
                                <Footer />
                            </>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

// bỏ: <Route path="/profile" element={<UserProfile />} /> để test