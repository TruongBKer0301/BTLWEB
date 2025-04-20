import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home/home';
import Contact from './components/Contact/contact';
import Footer from './components/Footer/footer';
import Login from './components/Login/Login';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import './App.css';

function App() {
    return (
        <Router>
            <div className="d-flex flex-column min-vh-100">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div>
                        <Link className="navbar-brand" to="/">
                            <img
                                src="https://iotsolutions.vn/wp-content/uploads/2024/04/logo-ctY1.jpg"
                                alt="IoT Solutions Logo"
                                style={{height: "80px", marginRight: "10px"}}
                            />
                        </Link>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
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
                                <Link className="nav-link" to="/contact">Liên Hệ</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/cart">
                                    🛒 Giỏ Hàng
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>

                <div className="flex-grow-1">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/contact" element={<Contact/>}/>
                        <Route path="/login" element={<Login/>}/>
                    </Routes>
                </div>

                <Footer/>
            </div>
        </Router>
    );
}

export default App;