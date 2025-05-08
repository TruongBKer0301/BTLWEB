import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserProfile.css';

const DEFAULT_AVATAR = '/default-avatar.png';
const API = '/components/UserProfile/UserProfile.php';

export default function UserProfile() {
    const [user, setUser]           = useState({});
    const [tab, setTab]             = useState('info'); // 'info' hoặc 'password'
    const [isEditing, setIsEditing] = useState(false);
    const [avatarFile, setAvatarFile]   = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(DEFAULT_AVATAR);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError]         = useState('');
    const [loading, setLoading]     = useState(false);

    // Load data khi mount
    useEffect(() => {
        setLoading(true);
        axios.get(API, { params: { action: 'get' } })
            .then(res => {
                setUser(res.data);
                setAvatarPreview(res.data.avatar || DEFAULT_AVATAR);
            })
            .catch(() => setError('Không tải được thông tin cá nhân'))
            .finally(() => setLoading(false));
    }, []);

    // Chọn file avatar mới
    const handleFileChange = e => {
        const f = e.target.files[0];
        if (!f) return;
        setAvatarFile(f);
        setAvatarPreview(URL.createObjectURL(f));
    };

    // Lưu thông tin profile
    const saveProfile = () => {
        setLoading(true);
        const form = new FormData();
        form.append('action','update');
        form.append('username',user.username);
        form.append('email',user.email);
        form.append('phone',user.phone_number);
        if (avatarFile) form.append('avatar_file',avatarFile);

        axios.post(API, form)
            .then(res => {
                alert('Cập nhật thành công');
                if (res.data.avatar) {
                    setUser(u => ({ ...u, avatar: res.data.avatar }));
                    setAvatarPreview(res.data.avatar);
                }
                setIsEditing(false);
            })
            .catch(() => alert('Cập nhật thất bại'))
            .finally(() => setLoading(false));
    };

    // Đổi mật khẩu
    const savePassword = () => {
        if (newPassword !== confirmPassword) {
            return setError('Mật khẩu mới và xác nhận phải giống nhau');
        }
        setLoading(true);
        const form = new FormData();
        form.append('action','change_password');
        form.append('password', newPassword);

        axios.post(API, form)
            .then(() => {
                alert('Đổi mật khẩu thành công');
                setNewPassword('');
                setConfirmPassword('');
                setTab('info');
            })
            .catch(err => {
                setError(err.response?.data?.error || 'Đổi mật khẩu thất bại');
            })
            .finally(() => setLoading(false));
    };

    if (loading) return <p className="loading">Đang tải…</p>;
    if (error)   return <p className="error">{error}</p>;

    return (
        <section className="user-profile">
            <h2>Trang cá nhân</h2>

            {/* Tab navigation */}
            <div className="tabs">
                <div
                    className={`tab ${tab==='info' ? 'active' : ''}`}
                    onClick={() => setTab('info')}
                >Thông tin</div>
                <div
                    className={`tab ${tab==='password' ? 'active' : ''}`}
                    onClick={() => setTab('password')}
                >Đổi mật khẩu</div>
            </div>

            {/* Tab content: Info */}
            <div className={`tab-content ${tab==='info' ? 'active' : ''}`}>
                {!isEditing ? (
                    <>
                        <img className="avatar-preview" src={avatarPreview} alt="Avatar" />
                        <p><strong>Username:</strong> {user.username}</p>
                        <p><strong>Email:</strong>    {user.email}</p>
                        <p><strong>Phone:</strong>    {user.phone_number || '—'}</p>
                        <p><strong>Created At:</strong> {new Date(user.created_at).toLocaleString()}</p>
                        <p><strong>Updated At:</strong> {new Date(user.updated_at).toLocaleString()}</p>
                        <div className="buttons">
                            <button onClick={() => setIsEditing(true)}>Chỉnh sửa</button>
                        </div>
                    </>
                ) : (
                    <form onSubmit={e => { e.preventDefault(); saveProfile(); }}>
                        <label>Username:</label>
                        <input
                            type="text" value={user.username||''}
                            onChange={e=>setUser({...user,username:e.target.value})}
                        />

                        <label>Email:</label>
                        <input
                            type="email" value={user.email||''}
                            onChange={e=>setUser({...user,email:e.target.value})}
                        />

                        <label>Phone:</label>
                        <input
                            type="text" value={user.phone_number||''}
                            onChange={e=>setUser({...user,phone_number:e.target.value})}
                        />

                        <label>Avatar:</label>
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                        <img className="avatar-preview" src={avatarPreview} alt="Preview" />

                        <div className="buttons">
                            <button type="submit">Lưu thay đổi</button>
                            <button type="button" onClick={()=>setIsEditing(false)}>Hủy</button>
                        </div>
                    </form>
                )}
            </div>

            {/* Tab content: Change Password */}
            <div className={`tab-content ${tab==='password' ? 'active' : ''}`}>
                <form onSubmit={e => { e.preventDefault(); savePassword(); }}>
                    <label>Mật khẩu mới:</label>
                    <input
                        type="password" value={newPassword}
                        onChange={e=>setNewPassword(e.target.value)}
                        required
                    />
                    <label>Xác nhận mật khẩu:</label>
                    <input
                        type="password" value={confirmPassword}
                        onChange={e=>setConfirmPassword(e.target.value)}
                        required
                    />
                    <div className="buttons">
                        <button type="submit">Xác nhận</button>
                    </div>
                </form>
            </div>
        </section>
    );
}
