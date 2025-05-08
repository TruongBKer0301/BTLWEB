import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Form } from 'react-bootstrap';

const AdminUserManager = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost/sever/user/get_all_users.php')
      .then(res => {
        const data = res.data.users;
        setUsers(Array.isArray(data) ? data : []);
      })
      .catch(err => {
        console.error(err);
        setUsers([]);
      });
  }, []);

  const resetPassword = (userId) => {
    axios.post('http://localhost/sever/user/reset_password.php', { id: userId })
      .then(() => alert('Mật khẩu đã được reset'))
      .catch(err => console.error(err));
  };

  const toggleLockUser = (userId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'locked' : 'active';
    axios.post('http://localhost/sever/user/update_status.php', {
      id: userId,
      status: newStatus
    })
    .then(() => {
      setUsers(prev =>
        prev.map(user =>
          user.id === userId ? { ...user, status: newStatus } : user
        )
      );
    })
    .catch(err => console.error(err));
  };

  const filteredUsers = users.filter(user =>
    (user.username?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (user.email?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h2>Quản lý Người dùng</h2>

      <Form.Control
        className="mb-3"
        type="text"
        placeholder="Tìm kiếm theo tên hoặc email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Vai trò</th>
            <th>Trạng thái</th>
            <th>Ngày tạo</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>{user.created_at}</td>
              <td>
                <Button
                  variant="warning"
                  className="me-2"
                  size="sm"
                  onClick={() => resetPassword(user.id)}
                >
                  Reset mật khẩu
                </Button>
                <Button
                  variant={user.status === 'active' ? 'danger' : 'success'}
                  size="sm"
                  onClick={() => toggleLockUser(user.id, user.status)}
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
};

export default AdminUserManager;
