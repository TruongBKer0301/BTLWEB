import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './adminUser.css';

const API = '/src/components/Admin/AdminUser/adminUser.php';

const AdminUser = () => {
    const [users, setUsers] = useState([]);
    const [form, setForm]   = useState({
        id: null,
        username: '',
        password: '',
        email: '',
        role: 'member',
        status: 'active'
    });
    const [loading, setLoading] = useState(false);

    const fetchUsers = async () => {
        try {
            const { data } = await axios.get(API, { params: { action: 'list' } });
            setUsers(data);
        } catch (err) {
            console.error('Fetch users error:', err);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(f => ({ ...f, [name]: value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        const action = form.id ? 'update' : 'create';
        const payload = new URLSearchParams({
            action,
            id:       form.id || '',
            username: form.username,
            password: form.password,
            email:    form.email,
            role:     form.role,
            status:   form.status
        });

        try {
            await axios.post(API, payload);
            setForm({
                id: null, username: '', password: '', email: '',
                role: 'member', status: 'active'
            });
            fetchUsers();
        } catch (err) {
            console.error('Submit error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = u => {
        setForm({
            id: u.id,
            username: u.username,
            password: '',
            email: u.email,
            role: u.role,
            status: u.status
        });
    };

    const handleDelete = async id => {
        if (!window.confirm('Bạn có chắc muốn xóa người dùng này?')) return;
        try {
            await axios.post(API, new URLSearchParams({ action: 'delete', id }));
            fetchUsers();
        } catch (err) {
            console.error('Delete error:', err);
        }
    };

    return (
        <section className="section">
            <div className="page-heading">
                <h3>Quản lý Người dùng</h3>
            </div>

            <div className="page-content">
                {/* Form Thêm / Cập nhật */}
                <div className="card mb-4">
                    <div className="card-header"><h4>Thêm / Cập nhật User</h4></div>
                    <div className="card-body">
                        <form className="row g-3" onSubmit={handleSubmit}>
                            <div className="col-md-3">
                                <label className="form-label">Username</label>
                                <input
                                    name="username"
                                    type="text"
                                    className="form-control"
                                    value={form.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label">Mật khẩu</label>
                                <input
                                    name="password"
                                    type="password"
                                    className="form-control"
                                    value={form.password}
                                    onChange={handleChange}
                                    {...(form.id ? {} : { required: true })}
                                />
                                {form.id && <div className="form-text">Để trống nếu không đổi mật khẩu</div>}
                            </div>
                            <div className="col-md-3">
                                <label className="form-label">Email</label>
                                <input
                                    name="email"
                                    type="email"
                                    className="form-control"
                                    value={form.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label">Vai trò</label>
                                <select
                                    name="role"
                                    className="form-select"
                                    value={form.role}
                                    onChange={handleChange}
                                >
                                    <option value="admin">Admin</option>
                                    <option value="member">Member</option>
                                </select>
                            </div>
                            <div className="col-md-3">
                                <label className="form-label">Trạng thái</label>
                                <select
                                    name="status"
                                    className="form-select"
                                    value={form.status}
                                    onChange={handleChange}
                                >
                                    <option value="active">Active</option>
                                    <option value="locked">Locked</option>
                                </select>
                            </div>
                            <div className="col-md-2 d-flex align-items-end">
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={loading}
                                >
                                    {form.id ? 'Cập nhật' : 'Thêm mới'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Bảng danh sách */}
                <div className="card">
                    <div className="card-header"><h4>Danh sách Người dùng</h4></div>
                    <div className="card-body table-responsive">
                        <table className="table table-striped mb-0">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Created At</th>
                                <th>Hành động</th>
                            </tr>
                            </thead>
                            <tbody>
                            {users.map(u => (
                                <tr key={u.id}>
                                    <td>{u.id}</td>
                                    <td>{u.username}</td>
                                    <td>{u.email}</td>
                                    <td>{u.role}</td>
                                    <td>{u.status}</td>
                                    <td>{u.created_at}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-info me-2"
                                            onClick={() => handleEdit(u)}
                                        >
                                            Sửa
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleDelete(u.id)}
                                        >
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AdminUser;
