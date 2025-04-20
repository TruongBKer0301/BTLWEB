import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {FaPhoneAlt} from 'react-icons/fa';
import './footer.css';
import zalo from '../../images/zaloicon.png'

const Footer = () => {
    return (
        <footer className="bg-white mt-auto">
            <div className="contact-icon">
                <div>
                    <a href="tel:xxx" title="Hotline" className="phone">
                        <FaPhoneAlt size={32}/>
                    </a>
                </div>
                <div>
                    <a href="tel:xxx" title="Hotline" className="zalo">
                        <img src={zalo} alt="zaloicon"></img>
                    </a></div>
            </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 text-center">
                            <h5 className="footer-title">CÔNG TY TNHH</h5>
                            <h5 className="footer-title">IOT SOLUTIONS VIỆT NAM</h5>
                            <img src="https://iotsolutions.vn/wp-content/uploads/2024/04/logo-ctY1.jpg" alt="Logo"
                                 className="footer-logo mb-2"/>
                            <div className="d-flex justify-content-center">
                                <a href="https://facebook.com" className="footer-social mx-2">
                                    <i className="fab fa-facebook" style={{fontSize: "20px", color: "#1877F2"}}></i>
                                </a>
                                <a href="#" className="footer-social mx-2">
                                    <i className="fab fa-youtube" style={{fontSize: "20px", color: "#FF0000"}}></i>
                                </a>
                                <a href="#" className="footer-social mx-2">
                                    <img
                                        src="https://iotsolutions.vn/wp-content/uploads/2019/09/z5387237371482_2690643d6dbfd29549382b35823a3f5d-400x400.jpg"
                                        alt="zalo" width="20" height="20" style={{objectFit: "contain"}}/>
                                </a>
                            </div>


                        </div>
                        <div className="col-md-3">
                            <h5 className="footer-title">GIỚI THIỆU</h5>
                            <ul className="footer-list">
                                <li><a href="#">Giới thiệu công ty</a></li>
                                <li><img src="https://iotsolutions.vn/wp-content/uploads/2023/10/image-36.jpg"
                                         alt="Bộ Công Thương" className="footer-image"/></li>
                            </ul>
                        </div>

                        <div className="col-md-3">
                            <h5 className="footer-title">GIẢI PHÁP</h5>
                            <ul className="footer-list">
                                <li><a href="#">Loa iSound đọc kết quả thanh toán</a></li>
                                <li><a href="#">Khóa thông minh SIMUS</a></li>
                                <li><a href="#">Bộ điều khiển trung tâm</a></li>
                                <li><a href="#">Quản lý khách sạn</a></li>
                            </ul>
                        </div>
                        <div className="col-md-3">
                            <h5 className="footer-title">LIÊN HỆ VỚI CHÚNG TÔI</h5>
                            <p>📞 Hotline: 0982 777 807</p>
                            <p>📍 Địa chỉ: Số 29B ngõ 30 Phú Mỹ, Mỹ Đình 2, Hà Nội</p>
                            <p>✉️ Email: info@iotsolutions.vn</p>
                        </div>
                    </div>
                </div>
            <div className="bg-primary text-dark py-4">
                <div className="container text-center">
                    <p>© Copyright by IOT SOLUTIONS 2024. All Rights Reserved</p>
                    <div className="d-flex justify-content-center mt-2">
                        <a href="/" className="text-dark mx-2 text-decoration-none">TRANG CHỦ</a>
                        <a href="#" className="text-dark mx-2 text-decoration-none">GIỚI THIỆU</a>
                        <a href="#" className="text-dark mx-2 text-decoration-none">SẢN PHẨM</a>
                        <a href="#" className="text-dark mx-2 text-decoration-none">GIẢI PHÁP</a>
                        <a href="#" className="text-dark mx-2 text-decoration-none">TIN TỨC</a>
                        <a href="/contact" className="text-dark mx-2 text-decoration-none">LIÊN HỆ</a>
                        <a href="#" className="text-dark mx-2 text-decoration-none">0 SP - 0 VNĐ</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
