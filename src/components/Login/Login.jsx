import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

const Login = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isRegistering) {
            if (formData.password !== formData.confirmPassword) {
                alert("Mật khẩu xác nhận không khớp!");
                return;
            }
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
              {isRegistering ? "Đăng nhập" : "Đăng ký"}
            </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
