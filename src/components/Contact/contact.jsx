import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './contact.css';

const Contact = () => {
    const [errors, setErrors] = useState({});

    const validateForm = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value.trim();
        const phone = form.phone.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();

        const newErrors = {};

        if (!name) {
            newErrors.name = "Họ và tên không được để trống.";
        }

        if (!phone) {
            newErrors.phone = "Số điện thoại không được để trống.";
        } else if (!/^\d{10,11}$/.test(phone)) {
            newErrors.phone = "Số điện thoại phải có 10-11 chữ số.";
        }

        if (!email) {
            newErrors.email = "Email không được để trống.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Email không hợp lệ.";
        }

        if (!message) {
            newErrors.message = "Nội dung liên hệ không được để trống.";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            form.submit();
        }
    };

    return (
        <div className="container mt-5">
            <div className="row">
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
                <div className="col-md-6">
                    <h4 className="text-primary">GỬI LIÊN HỆ VỚI CHÚNG TÔI</h4>
                    <form onSubmit={validateForm}>
                        <div className="mb-3">
                            <input type="text" name="name" className="form-control" placeholder="Họ và tên"/>
                            {errors.name && <small className="text-danger">{errors.name}</small>}
                        </div>
                        <div className="mb-3">
                            <input type="tel" name="phone" className="form-control" placeholder="Số điện thoại"/>
                            {errors.phone && <small className="text-danger">{errors.phone}</small>}
                        </div>
                        <div className="mb-3">
                            <input type="email" name="email" className="form-control" placeholder="Địa chỉ Email"/>
                            {errors.email && <small className="text-danger">{errors.email}</small>}
                        </div>
                        <div className="mb-3">
                            <textarea name="message" className="form-control" rows="4"
                                      placeholder="Nhập nội dung liên hệ"></textarea>
                            {errors.message && <small className="text-danger">{errors.message}</small>}
                        </div>
                        <button type="submit" className="btn btn-primary w-100">GỬI LIÊN HỆ</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;