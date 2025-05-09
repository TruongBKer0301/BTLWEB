import React, { useEffect, useState } from "react";
import axios from "axios";

import BASE_URL from '../../../config/config';
const API_URL = `${BASE_URL}AdminSiteSetting/`

function SiteSettings() {
    const [settings, setSettings] = useState({});
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios.get(`${API_URL}AdminSiteSetting.php?action=get`)
            .then((res) => setSettings(res.data))
            .catch((err) => console.error(err));
    }, []);

    const handleChange = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = () => {
        axios.post(`${API_URL}AdminSiteSetting.php?action=update`, settings)
            .then(() => setMessage("Cập nhật thành công!"))
            .catch(() => setMessage("Cập nhật thất bại!"));
    };

    return (
        <div>
            <h2>Cấu hình Website</h2>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Mục </th>
                    <th>Thông tin</th>
                </tr>
                </thead>
                <tbody>
                {Object.keys(settings).map((key) => (
                    <tr key={key}>
                        <td>{key}</td>
                        <td>
                            <input
                                type="text"
                                className="form-control"
                                value={settings[key]}
                                onChange={(e) => handleChange(key, e.target.value)}
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button className="btn btn-primary mt-3" onClick={handleSubmit}>Lưu thay đổi</button>
            {message && <p className="mt-2">{message}</p>}
        </div>
    );
}

export default SiteSettings;