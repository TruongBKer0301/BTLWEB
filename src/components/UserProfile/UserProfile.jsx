import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserProfile.css';
import {
    FaUser, FaEnvelope, FaPhone,
    FaLock, FaImage
} from 'react-icons/fa';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const userId = localStorage.getItem('userId') || 1;

    // trạng thái form
    const [showPwdForm, setShowPwdForm] = useState(false);
    const [showAvatarForm, setShowAvatarForm] = useState(false);
    // mật khẩu
    const [currentPwd, setCurrentPwd] = useState('');
    const [newPwd, setNewPwd] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
    // avatar
    const [avatarFile, setAvatarFile] = useState(null);

    // load dữ liệu user
    const fetchUser = () => {
        axios.get('http://localhost/btlweb/BTLWEB/src/components/UserProfile/UserProfile.php', {
            params: { id: userId }
        }).then(res => setUser(res.data))
            .catch(console.error);
    };

    useEffect(fetchUser, [userId]);

    if (!user) {
        return <div className="text-center mt-5">Đang tải hồ sơ...</div>;
    }

    // đổi mật khẩu
    const handlePwdSubmit = e => {
        e.preventDefault();
        if (newPwd !== confirmPwd) {
            return alert('Xác nhận mật khẩu không khớp');
        }
        axios.post(
            'http://localhost/btlweb/BTLWEB/src/components/UserProfile/updatePassword.php',
            { id: userId, current_password: currentPwd, new_password: newPwd, confirm_password: confirmPwd }
        ).then(res => {
            if (res.data.success) {
                alert('Đổi mật khẩu thành công');
                setShowPwdForm(false);
                setCurrentPwd(''); setNewPwd(''); setConfirmPwd('');
            } else {
                alert(res.data.error || 'Lỗi');
            }
        }).catch(err => alert(err.response?.data?.error || err.message));
    };

    // đổi avatar
    const handleAvatarSubmit = e => {
        e.preventDefault();
        if (!avatarFile) return alert('Chưa chọn file');
        const form = new FormData();
        form.append('id', userId);
        form.append('avatar', avatarFile);
        axios.post(
            'http://localhost/btlweb/BTLWEB/src/components/UserProfile/updateAvatar.php',
            form,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        ).then(res => {
            if (res.data.success) {
                alert('Cập nhật avatar thành công');
                setShowAvatarForm(false);
                setAvatarFile(null);
                fetchUser();
            } else {
                alert(res.data.error || 'Lỗi');
            }
        }).catch(err => alert(err.response?.data?.error || err.message));
    };

    return (
        <div className="user-profile container my-5">
            <div className="card profile-card mx-auto shadow-sm">
                <div className="card-header text-white d-flex align-items-center">
                    <FaUser size={24} className="me-2"/>
                    <h3 className="mb-0">Hồ sơ cá nhân</h3>
                </div>
                <div className="card-body text-center">
                    <img
                        src={user.avatar_url}
                        alt="Avatar"
                        className="avatar mb-3 shadow"
                    />
                    <ul className="list-group list-group-flush text-start">
                        <li className="list-group-item">
                            <FaUser className="me-2 text-primary"/>
                            <strong>Tên:</strong> {user.username}
                        </li>
                        <li className="list-group-item">
                            <FaEnvelope className="me-2 text-success"/>
                            <strong>Email:</strong> {user.email}
                        </li>
                        <li className="list-group-item">
                            <FaPhone className="me-2 text-info"/>
                            <strong>Điện thoại:</strong> {user.phone_number}
                        </li>
                    </ul>

                    <div className="mt-4 d-flex justify-content-center">
                        <button
                            className="btn btn-outline-primary me-3"
                            onClick={() => setShowPwdForm(!showPwdForm)}
                        >
                            <FaLock className="me-1"/> Đổi mật khẩu
                        </button>
                        <button
                            className="btn btn-outline-secondary"
                            onClick={() => setShowAvatarForm(!showAvatarForm)}
                        >
                            <FaImage className="me-1"/> Đổi avatar
                        </button>
                    </div>

                    {showPwdForm && (
                        <form onSubmit={handlePwdSubmit} className="mt-4">
                            <div className="card p-3 form-card">
                                <h5 className="mb-3">Thay mật khẩu</h5>
                                <input type="password" className="form-control mb-2"
                                       placeholder="Mật khẩu hiện tại"
                                       value={currentPwd}
                                       onChange={e => setCurrentPwd(e.target.value)} />
                                <input type="password" className="form-control mb-2"
                                       placeholder="Mật khẩu mới"
                                       value={newPwd}
                                       onChange={e => setNewPwd(e.target.value)} />
                                <input type="password" className="form-control mb-3"
                                       placeholder="Xác nhận mật khẩu"
                                       value={confirmPwd}
                                       onChange={e => setConfirmPwd(e.target.value)} />
                                <button type="submit" className="btn btn-primary w-100">
                                    Lưu mật khẩu
                                </button>
                            </div>
                        </form>
                    )}

                    {showAvatarForm && (
                        <form onSubmit={handleAvatarSubmit} className="mt-4">
                            <div className="card p-3 form-card">
                                <h5 className="mb-3">Thay avatar</h5>
                                <input type="file" accept="image/*" className="form-control mb-3"
                                       onChange={e => setAvatarFile(e.target.files[0])} />
                                <button type="submit" className="btn btn-primary w-100">
                                    Tải lên avatar
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
