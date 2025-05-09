import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, InputGroup } from 'react-bootstrap';
import BASE_URL from '../../../config/config';

const API_URL = `${BASE_URL}user/`;

export default function AdminUserManager() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}get_users.php?search=${encodeURIComponent(search)}`);
      setUsers(res.data);
    } catch (error) {
      console.error('Lỗi khi tải danh sách người dùng:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search]);

  const toggleStatus = async (id) => {
    try {
      await axios.post(`${API_URL}toggle_user_status.php`, { user_id: id });
      fetchUsers();
    } catch (error) {
      console.error('Lỗi khi đổi trạng thái người dùng:', error);
    }
  };

  const resetPassword = async (id) => {
    try {
      await axios.post(`${API_URL}reset_password.php`, { user_id: id });
      alert('✅ Mật khẩu đã được đặt lại về 12345678');
    } catch (error) {
      console.error('Lỗi khi reset mật khẩu:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Danh sách người dùng</h3>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Tìm theo tên hoặc email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="primary" onClick={fetchUsers}>Tìm</Button>
      </InputGroup>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Email</th>
            <th>Điện thoại</th>
            <th>Trạng thái</th>
            <th>Reset mật khẩu</th>
            <th>Khóa/Mở khóa</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone_number}</td>
              <td>{user.status === 'active' ? 'Hoạt động' : 'Đã khóa'}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => resetPassword(user.user_id)}
                >
                  Reset
                </Button>
              </td>
              <td>
                <Button
                  variant={user.status === 'active' ? 'warning' : 'success'}
                  onClick={() => toggleStatus(user.user_id)}
                >
                  {user.status === 'active' ? 'Khóa' : 'Mở khóa'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}


