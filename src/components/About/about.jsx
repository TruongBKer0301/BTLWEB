// src/components/About/About.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './about.css';

const About = () => (
    <div className="about container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
            <Link to="/">Trang chủ</Link>
            <span className="divider">/</span>
            <span className="current">Giới thiệu</span>
        </nav>

        <div className="intro-section row align-items-stretch mb-5">
            <div className="col-md-6">
                <h1 className="section-title">Giới thiệu chung</h1>
                <p className="intro-text">
                    Thành lập vào năm 2019, <strong>Công ty TNHH IoT Solutions Việt Nam</strong> hoạt động trong lĩnh vực công nghệ,
                    chuyên về Internet of Things (IoT). Chúng tôi nghiên cứu, phát triển và cung cấp các sản phẩm, giải pháp IoT,
                    AI cùng dịch vụ chuyên nghiệp.
                </p>
            </div>
            <div className="col-md-6 p-0">
                <img
                    src="https://iotsolutions.vn/wp-content/uploads/2023/10/Screenshot_13.png"
                    alt="Giới thiệu"
                    className="intro-image"
                />
            </div>
        </div>

        <h2 className="sub-title">1. Thông điệp từ Ban Giám Đốc</h2>
        <div className="message">
            <p>
                Thay mặt ban lãnh đạo và nhân viên IoT Solutions, chúng tôi xin gửi lời chào trân trọng và cảm ơn
                chân thành tới quý khách hàng, quý đối tác đã tin tưởng, hợp tác suốt quá trình phát triển.
            </p>
            <p>
                Đội ngũ của chúng tôi giàu nhiệt huyết, kinh nghiệm và tận tâm. Luôn hết mình với niềm đam mê
                mang đến trải nghiệm dịch vụ tốt nhất trong tư vấn giải pháp IoT, cung cấp sản phẩm, giúp cuộc sống thông minh hơn.
            </p>
            <p>
                Với mục tiêu chiếm lĩnh thị trường IoT Việt Nam trong 5 năm và vươn ra quốc tế,
                chúng tôi đặt chữ “Tâm” làm nền tảng cho mọi dự án và dịch vụ.
            </p>
        </div>

        {/* Hình ảnh minh họa */}
        <div className="image-group">
            <div className="image-item">
                <img
                    src="https://iotsolutions.vn/wp-content/uploads/2023/10/Screenshot_15.png"
                    alt="Minh họa 1"
                />
            </div>
            <div className="image-item">
                <img
                    src="https://iotsolutions.vn/wp-content/uploads/2023/10/Screenshot_16.png"
                    alt="Minh họa 2"
                />
            </div>
        </div>

        <h2 className="sub-title">2. Tầm nhìn – Sứ mệnh – Giá trị cốt lõi</h2>
        <ul className="vision-list">
            <li>
                <strong>TẦM NHÌN:</strong> Trở thành nhà cung cấp giải pháp IoT uy tín hàng đầu tại Việt Nam,
                kiến tạo cuộc sống thông minh.
            </li>
            <li>
                <strong>SỨ MỆNH:</strong> Cung cấp giải pháp IoT tốt nhất cho khách hàng, xây dựng môi trường làm việc công bằng và tạo cơ hội phát triển cho nhân viên.
            </li>
            <li>
                <strong>GIÁ TRỊ CỐT LÕI:</strong>
                <ul>
                    <li><strong>NHÂN:</strong> Tôn trọng và thiện chí trong mọi quan hệ.</li>
                    <li><strong>TÂM:</strong> Làm việc bằng đạo đức nghề nghiệp và tâm huyết.</li>
                    <li><strong>TÍN:</strong> Đặt chữ tín làm nền tảng, luôn thực hiện cam kết.</li>
                </ul>
            </li>
        </ul>

        <div className="org-chart">
            <img
                src="https://iotsolutions.vn/wp-content/uploads/2023/10/Screenshot_17.png"
                alt="Sơ đồ tổ chức"
            />
        </div>
    </div>
);

export default About;
