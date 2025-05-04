import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

const Login = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [formData, setFormData] = useState({
<<<<<<< HEAD
=======
        name: "",
        phone: "",
>>>>>>> de5e4bb (tailen)
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
<<<<<<< HEAD
        if (isRegistering) {
            if (formData.password !== formData.confirmPassword) {
                alert("Mật khẩu xác nhận không khớp!");
                return;
            }
=======

        // Validation for name
        if (isRegistering && !/^[a-zA-Z\s]+$/.test(formData.name)) {
            alert("Tên chỉ được chứa chữ cái và khoảng trắng!");
            return;
        }

        // Validation for email
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            alert("Email không hợp lệ!");
            return;
        }

        // Validation for phone number
        if (isRegistering && !/^\d{10}$/.test(formData.phone)) {
            alert("Số điện thoại phải chứa 10 chữ số!");
            return;
        }

        // Validation for password
        if (formData.password.length < 8) {
            alert("Mật khẩu phải có ít nhất 8 ký tự!");
            return;
        }

        // Validation for confirm password
        if (isRegistering && formData.password !== formData.confirmPassword) {
            alert("Mật khẩu xác nhận không khớp!");
            return;
        }

        if (isRegistering) {
>>>>>>> de5e4bb (tailen)
            console.log("Đăng ký với:", formData);
        } else {
            console.log("Đăng nhập với:", formData);
        }
    };

    return (
        <div className="auth-container d-flex justify-content-center align-items-center vh-100">
            <div className="auth-box p-4 rounded shadow bg-white">
                <h2 className="text-center mb-4">{isRegistering ? "Đăng ký" : "Đăng nhập"}</h2>
                <form onSubmit={handleSubmit}>
<<<<<<< HEAD
=======
                    {isRegistering && (
                        <>
                            <div className="mb-3">
                                <label className="form-label">Tên:</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Số điện thoại:</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    className="form-control"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </>
                    )}
>>>>>>> de5e4bb (tailen)
                    <div className="mb-3">
                        <label className="form-label">Email:</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Mật khẩu:</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {isRegistering && (
                        <div className="mb-3">
                            <label className="form-label">Xác nhận mật khẩu:</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                className="form-control"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}
                    <button type="submit" className="btn btn-primary w-100">
                        {isRegistering ? "Đăng ký" : "Đăng nhập"}
                    </button>
                </form>
                <div className="text-center mt-3">
                    <p>
                        {isRegistering ? "Đã có tài khoản?" : "Chưa có tài khoản?"}{" "}
                        <span
                            className="text-primary toggle-auth"
                            onClick={() => setIsRegistering(!isRegistering)}
                            style={{ cursor: "pointer" }}
                        >
<<<<<<< HEAD
              {isRegistering ? "Đăng nhập" : "Đăng ký"}
            </span>
=======
                            {isRegistering ? "Đăng nhập" : "Đăng ký"}
                        </span>
>>>>>>> de5e4bb (tailen)
                    </p>
                </div>
            </div>
        </div>
    );
};

<<<<<<< HEAD
export default Login;
=======
export default Login;
>>>>>>> de5e4bb (tailen)
