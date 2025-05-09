import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './contact.css';

//import BASE_URL from '../../../config/config';
//const API_URL = `${BASE_URL}Contact/`;

const Contact = () => {
    return (
        <div className="container mt-5">
            <div className="row">
                {/* Thông tin liên hệ */}
                <div className="col-md-6">
                    <h4 className="text-primary">LIÊN HỆ VỚI CHÚNG TÔI</h4>
                    <p><i className="bi bi-geo-alt-fill"></i> Trụ sở chính: Số 29B, ngõ 30 đường Phú Mỹ, Phường Mỹ Đình
                        2, Quận Nam Từ Liêm, Thành phố Hà Nội, Việt Nam</p>
                    <p><i className="bi bi-telephone-fill"></i> Hotline: 0904 110 111</p>
                    <p><i className="bi bi-envelope-fill"></i> Email: <a
                        href="mailto:iotsolutions@gmail.com">iotsolutions@gmail.com</a></p>
                    <p><i className="bi bi-globe"></i> Website: <a href="https://iotsolutions.vn" target="_blank"
                                                                   rel="noopener noreferrer">https://iotsolutions.vn</a>
                    </p>
                    <div className="container mt-4">
                        <h3 className="text-center">Bản đồ vị trí</h3>
                        <div className="ratio ratio-16x9">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1554.6114167352712!2d106.8049829!3d10.8803986!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d8a5568c997f%3A0xdeac05f17a166e0c!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBCw6FjaCBraG9hIC0gxJBIUUcgVFAuSENN!5e1!3m2!1svi!2s!4v1742782591053!5m2!1svi!2s"
                                width="600" height="450" allowFullScreen="" loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade">
                            </iframe>
                        </div>
                    </div>
                </div>
                {/* Form gửi liên hệ */}
                <div className="col-md-6">
                    <h4 className="text-primary">GỬI LIÊN HỆ VỚI CHÚNG TÔI</h4>
                    <form action="http://localhost:8888/btlweb/src/components/Contact/contact.php" method="POST">
                        <div className="mb-3">
                            <input type="text" name="name" className="form-control" placeholder="Họ và tên" required />
                        </div>
                        <div className="mb-3">
                            <input type="tel" name="phone" className="form-control" placeholder="Số điện thoại" required />
                        </div>
                        <div className="mb-3">
                            <input type="email" name="email" className="form-control" placeholder="Địa chỉ Email" required />
                        </div>
                        <div className="mb-3">
                            <textarea name="message" className="form-control" rows="4" placeholder="Nhập nội dung liên hệ" required></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">GỬI LIÊN HỆ</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;