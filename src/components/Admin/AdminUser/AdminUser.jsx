import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminUser.css';

export default function AdminUser() {
    const API = 'http://localhost/btlweb/BTLWEB/src/components/Admin/AdminUser/AdminUser.php';
    const perPage = 10;

    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    const load = async (p = 1) => {
        setLoading(true);
        try {
            const { data } = await axios.get(API, {
                params: { action: 'list', page: p, limit: perPage }
            });
            setUsers(Array.isArray(data.data) ? data.data : []);
            setTotal(data.total || 0);
            setPage(data.page || p);
        } catch (e) {
            console.error('AXIOS ERROR', e.response || e);
            alert('Không tải được danh sách người dùng:\n' + (e.response?.data?.error || e.message));
        }
        setLoading(false);
    };

    useEffect(() => { load(1); }, []);

    const onAction = async (id, action) => {
        let msg = '';
        if (action === 'lock')    msg = 'Xác nhận khóa người dùng?';
        if (action === 'unlock')  msg = 'Xác nhận mở khóa người dùng?';
        if (action === 'reset')   msg = 'Reset mật khẩu về mặc định?';
        if (action && !window.confirm(msg)) return;

        try {
            await axios.post(API, new URLSearchParams({ action, id }));
            load(page);
        } catch (e) {
            console.error('AXIOS ERROR', e.response || e);
            alert('Thao tác thất bại:\n' + (e.response?.data?.error || e.message));
        }
    };

    const totalPages = Math.ceil(total / perPage);

    return (
        <section className="admin-user">
            {loading && <p className="loading">Đang tải…</p>}
            {!loading && users.length === 0 && <p className="no-data">Chưa có người dùng.</p>}

            {!loading && users.length > 0 && (
                <table className="user-table">
                    <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(u => (
                        <tr key={u.id}>
                            <td>{u.username}</td>
                            <td>{u.email}</td>
                            <td>{u.phone_number || '—'}</td>
                            <td>{u.role}</td>
                            <td>{u.status}</td>
                            <td>{new Date(u.created_at).toLocaleString()}</td>
                            <td>{new Date(u.updated_at).toLocaleString()}</td>
                            <td className="action-buttons">
                                <button className="view"   onClick={() => alert(JSON.stringify(u, null, 2))}>Xem</button>
                                <button className="reset"  onClick={() => onAction(u.id, 'reset')}>Reset mật khẩu</button>
                                {u.status === 'active'
                                    ? <button className="lock" onClick={() => onAction(u.id, 'lock')}>Khoá</button>
                                    : <button className="unlock" onClick={() => onAction(u.id, 'unlock')}>Mở khoá</button>
                                }
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
