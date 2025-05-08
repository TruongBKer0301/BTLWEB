import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminUser.css';

export default function AdminUser() {
    const API = 'http://localhost/btlweb/BTLWEB/src/components/Admin/AdminUser/AdminUser.php';
    const perPage = 20;

    const [users, setUsers]   = useState([]);
    const [page, setPage]     = useState(1);
    const [total, setTotal]   = useState(0);
    const [loading, setLoading] = useState(false);

    const load = async (p = 1) => {
        setLoading(true);
        try {
            const { data } = await axios.get(API, { params: { action: 'list', page: p, limit: perPage } });
            setUsers(Array.isArray(data.data) ? data.data : []);
            setTotal(data.total || 0);
            setPage(data.page || p);
        } catch (e) {
            console.error(e);
            alert('Không tải được danh sách người dùng');
        }
        setLoading(false);
    };

    useEffect(() => { load(1); }, []);

    const onAction = async (id, action) => {
        if (action === 'lock' && !window.confirm('Xác nhận khóa người dùng?')) return;
        if (action === 'unlock' && !window.confirm('Xác nhận mở khóa người dùng?')) return;
        if (action === 'reset' && !window.confirm('Reset mật khẩu về mặc định?')) return;

        try {
            await axios.post(API, new URLSearchParams({ action, id }));
            load(page);
        } catch (e) {
            console.error(e);
            alert('Thao tác thất bại');
        }
    };

    const totalPages = Math.ceil(total / perPage);

    return (
        <section className="admin-user">
            <h2>Quản lý Tài khoản</h2>

            {loading && <p className="loading">Đang tải…</p>}
            {!loading && users.length === 0 && <p className="no-data">Chưa có người dùng.</p>}

            {!loading && users.length > 0 && (
                <table className="user-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Created At</th>
                        <th>Actions</th>
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
                            <td>{new Date(u.created_at).toLocaleDateString()}</td>
                            <td className="action-buttons">
                                <button className="view" onClick={() => alert(JSON.stringify(u, null, 2))}>
                                    Xem
                                </button>
                                <button className="reset" onClick={() => onAction(u.id, 'reset')}>
                                    Reset mật khẩu
                                </button>
                                {u.status === 'active' ? (
                                    <button className="lock" onClick={() => onAction(u.id, 'lock')}>
                                        Khoá
                                    </button>
                                ) : (
                                    <button className="unlock" onClick={() => onAction(u.id, 'unlock')}>
                                        Mở khoá
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            {totalPages > 1 && (
                <div className="pagination">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                        <button
                            key={p}
                            className={p === page ? 'active' : ''}
                            onClick={() => load(p)}
                        >{p}</button>
                    ))}
                </div>
            )}
        </section>
    );
}
