import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom"; // Sử dụng react-router-dom để điều hướng
import "./Login.css";

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate(); // Hook để xử lý điều hướng

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setFormErrors({
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  
    let isValid = true;
    const errors = {};
  
    // VALIDATION
    if (isRegistering && !/^[a-zA-Z\s]+$/.test(formData.name)) {
      isValid = false;
      errors.name = "Tên chỉ được chứa chữ cái và khoảng trắng!";
    }
  
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      isValid = false;
      errors.email = "Email không hợp lệ!";
    }
  
    if (isRegistering && !/^\d{10}$/.test(formData.phone)) {
      isValid = false;
      errors.phone = "Số điện thoại phải chứa 10 chữ số!";
    }
  
    if (formData.password.length < 8) {
      isValid = false;
      errors.password = "Mật khẩu phải có ít nhất 8 ký tự!";
    }
  
    if (isRegistering && formData.password !== formData.confirmPassword) {
      isValid = false;
      errors.confirmPassword = "Mật khẩu xác nhận không khớp!";
    }
  
    if (!isValid) {
      setFormErrors(errors);
      return;
    }
  
    try {
      const url = isRegistering
        ? "http://localhost/sever/auth/register.php"
        : "http://localhost/sever/auth/login.php";
  
      const payload = isRegistering
        ? {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            password: formData.password,
            role: "user"
          }
        : {
            email: formData.email,
            password: formData.password,
          };
  
      const response = await axios.post(url, payload, {
        withCredentials: true,
      });
  
      alert(response.data.message || (isRegistering ? "Đăng ký thành công" : "Đăng nhập thành công"));
  
      if (!isRegistering && response.data.user) {
        // ✅ Lưu thông tin người dùng vào localStorage
        localStorage.setItem("user", JSON.stringify(response.data.user));
  
        // ✅ Điều hướng sau khi đăng nhập thành công
        navigate("/");
      }
    } catch (err) {
      console.error("Lỗi từ server:", err.response?.data || err);
      const errorMessage = err.response?.data?.message || "Đã xảy ra lỗi!";
      alert(errorMessage);
    }
  };
  

  return (
    <div className="auth-container d-flex justify-content-center align-items-center vh-100">
      <div className="auth-box p-4 rounded shadow bg-white">
        <h2 className="text-center mb-4">{isRegistering ? "Đăng ký" : "Đăng nhập"}</h2>
        <form onSubmit={handleSubmit}>
          {isRegistering && (
            <>
              <div className="mb-3">
                <label className="form-label">Tên:</label>
                <input
                  type="text"
                  name="name"
                  className={`form-control ${formErrors.name ? "is-invalid" : ""}`}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                {formErrors.name && <div className="invalid-feedback">{formErrors.name}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Số điện thoại:</label>
                <input
                  type="tel"
                  name="phone"
                  className={`form-control ${formErrors.phone ? "is-invalid" : ""}`}
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                {formErrors.phone && <div className="invalid-feedback">{formErrors.phone}</div>}
              </div>
            </>
          )}
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="email"
              name="email"
              className={`form-control ${formErrors.email ? "is-invalid" : ""}`}
              value={formData.email}
              onChange={handleChange}
              required
            />
            {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Mật khẩu:</label>
            <input
              type="password"
              name="password"
              className={`form-control ${formErrors.password ? "is-invalid" : ""}`}
              value={formData.password}
              onChange={handleChange}
              required
            />
            {formErrors.password && <div className="invalid-feedback">{formErrors.password}</div>}
          </div>
          {isRegistering && (
            <div className="mb-3">
              <label className="form-label">Xác nhận mật khẩu:</label>
              <input
                type="password"
                name="confirmPassword"
                className={`form-control ${formErrors.confirmPassword ? "is-invalid" : ""}`}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              {formErrors.confirmPassword && <div className="invalid-feedback">{formErrors.confirmPassword}</div>}
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
