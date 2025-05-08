import React from "react";
import {Carousel} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./home.css";

const Home = () => {
    return (
        <div className="home">
            <div id="caro" className="d-flex justify-content-center align-items-center vh-100">
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="home-image"
                            src="https://vjst.vn/Images/editor/images/2024/Thang%207/Th%E1%BB%8Bnh_congnghemaytinh_1.jpg"
                            alt="Los Angeles"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="home-image"
                            src="https://giaiphaptinhhoa.com/wp-content/uploads/2024/09/cong-nghe.png"
                            alt="Chicago"
                        />
                    </Carousel.Item>
                </Carousel>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <p className="text-justify"><strong>Công Ty TNHH IoT Solutions Việt Nam</strong> là đơn vị hàng đầu
                        trong lĩnh vực cung cấp thiết bị thông
                        minh ứng dụng IoT tại Việt Nam. Với đội ngũ chuyên gia giàu kinh nghiệm và sự cam kết vững chắc
                        về chất lượng, chúng tôi tự hào mang đến cho khách hàng những sản phẩm và giải pháp an toàn,
                        hiệu quả nhất.
                    </p>

                    <p className="text-justify"><strong>IoT Solutions Việt Nam</strong> không chỉ cung cấp các sản phẩm
                        chất lượng cao như bộ điều khiển trung
                        tâm thông minh; thiết bị định vị, giám sát hành trình cho oto, xe máy,… mà còn đặc biệt chú
                        trọng vào việc tư vấn và thiết kế các giải pháp IoT, đáp ứng mọi nhu cầu và yêu cầu của khách
                        hàng. Với phương châm: ” Đổi mới Công nghệ – Hướng tới tương lai”. Chúng tôi cam kết đồng hành
                        cùng với người dùng, với doanh nghiệp, tổ chức và cộng đồng, giúp cuộc sống của con người trở
                        nên thông minh, tiện lợi hơn với những ứng dụng IoT hiện hữu.</p>
                </div>
                <div className="col-sm-6">
                    <div className="row">
                        <div className="col-6">
                            <img className="img-fluid grid-image"
                                 src="https://iotsolutions.vn/wp-content/uploads/2023/10/Screenshot_4-2.png" alt="anh"/>
                            <div className="overlay-text">VỀ CHÚNG TÔI</div>
                        </div>
                        <div className="col-6">
                            <img className="img-fluid grid-image"
                                 src="https://iotsolutions.vn/wp-content/uploads/2023/10/Screenshot_5-1.png" alt="anh"/>
                            <div className="overlay-text">CƠ CẤU TỔ CHỨC</div>
                        </div>
                        <div className="col-6">
                            <img className="img-fluid grid-image"
                                 src="https://iotsolutions.vn/wp-content/uploads/2023/09/modern-luxury-meets-old-fashioned-elegance-inside-apartment-generated-by-ai-2.jpg"
                                 alt="anh"/>
                            <div className="overlay-text">GIẢI PHÁP</div>
                        </div>
                        <div className="col-6">
                            <img className="img-fluid grid-image"
                                 src="https://iotsolutions.vn/wp-content/uploads/2023/10/Screenshot_6-1.png" alt="anh"/>
                            <div className="overlay-text">THÔNG ĐIỆP BAN GIÁM ĐỐC</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="partners-section text-center">
                <h3 className="text-white">ĐỐI TÁC CỦA CHÚNG TÔI</h3>
                <div className="d-flex justify-content-center align-items-center flex-wrap">
                    <div className="partner-item">
                        <img src="https://iotsolutions.vn/wp-content/uploads/2024/04/logo6.jpg" alt="Viettel IDC"/>
                    </div>
                    <div className="partner-item">
                        <img src="https://iotsolutions.vn/wp-content/uploads/2024/04/logo7.jpg"
                             alt="Viettel Construction"/>
                    </div>
                    <div className="partner-item">
                        <img
                            src="https://iotsolutions.vn/wp-content/uploads/2024/04/z5395706123976_9604cb0c12ccaa5b717866d1212dfd2e.jpg"
                            alt="Viettel Solutions"/>
                    </div>
                    <div className="partner-item">
                        <img
                            src="https://iotsolutions.vn/wp-content/uploads/2024/04/z5395724841115_ea626dd77689048ed67ba778cc8a5287.jpg"
                            alt="Viettel Telecom"/>
                    </div>
                    <div className="partner-item">
                        <img src="https://iotsolutions.vn/wp-content/uploads/2024/05/logo-8.png" alt="FPT"/>
                    </div>
                    <div className="partner-item">
                        <img
                            src="https://iotsolutions.vn/wp-content/uploads/2024/04/z5395684912786_ee1ff5abb5387a45c85b11c37effe76a.jpg"
                            alt="GoTrack"/>
                    </div>
                </div>
            </div>
            <div className="news-container">
                <h2>TIN TỨC MỚI NHẤT</h2>

                <div className="news-layout">
                    <div className="main-news">
                        <a href="https://iotsolutions.vn/chia-se-bien-dong-so-du" className="news-card" target="_blank"
                           rel="noopener noreferrer">
                            <img src="https://iotsolutions.vn/wp-content/uploads/2024/09/anh-cut-1200x628-20-1.png"
                                 alt="Chia sẻ biến động số dư"
                                 className="news-image"/>
                            <div className="news-content">
                                <h3>CHIA SẺ BIẾN ĐỘNG SỐ DƯ LÀ GÌ?</h3>
                                <p>Chia sẻ biến động số dư là cách nhanh nhất và đảm bảo nhất trong ...</p>
                            </div>
                        </a>
                    </div>

                    <div className="side-news">
                        <a href="https://iotsolutions.vn/thiet-bi-giam-sat-hanh-trinh" className="news-card"
                           target="_blank" rel="noopener noreferrer">
                            <img src="https://iotsolutions.vn/wp-content/uploads/2024/04/anh-nen-itrack.png"
                                 alt="Thiết bị giám sát" className="news-image"/>
                            <div className="news-content">
                                <p>SỰ CẦN THIẾT CỦA THIẾT BỊ GIÁM SÁT HÀNH TRÌNH</p>
                                <p>Liệu có cần sử dụng thiết bị giám sát hành trình trong cuộc sống không? ...</p>
                            </div>
                        </a>

                        <a href="https://iotsolutions.vn/iot-la-gi" className="news-card" target="_blank"
                           rel="noopener noreferrer">
                            <img
                                src="https://iotsolutions.vn/wp-content/uploads/2024/05/z5420425218263_efbd6d3f8f40a4e34c6e0f9c931d61bd.jpg"
                                alt="IoT là gì?" className="news-image"/>
                            <div className="news-content">
                                <p>IOT (INTERNET OF THINGS) LÀ GÌ?</p>
                                <p>1. Internet vạn vật (IoT) là gì? Thuật ngữ IoT hay Internet vạn vật đề ...</p>
                            </div>
                        </a>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Home;
