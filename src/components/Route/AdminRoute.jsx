import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import AdminLayout from "../Admin/AdminHome/AdminLayout";  // Đảm bảo đường dẫn đúng

const AdminRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  console.log("User data: ", user); // Kiểm tra dữ liệu

  // Nếu không có user (chưa login)
  if (!user) {
    console.log("User not found, redirecting to login...");
    return <Navigate to="/login" replace />;
  }

  // Nếu user không phải admin
  if (user.role !== "admin") {
    console.log("User is not an admin, redirecting to home...");
    return <Navigate to="/" replace />;
  }

  // Nếu user hợp lệ và là admin, render Outlet (các route con)
  return (
    <AdminLayout>
      <Outlet /> {/* Các route con sẽ được render tại đây */}
    </AdminLayout>
  );
};

export default AdminRoute;
