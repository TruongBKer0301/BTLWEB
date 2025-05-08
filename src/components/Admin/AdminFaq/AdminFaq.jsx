import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminFaq.css';

const AdminFaq = () => {
    const [faqs, setFaqs]           = useState([]);
    const [form, setForm]           = useState({ id: null, question: '', answer: '' });
    const [loading, setLoading]     = useState(false);

    // Load FAQs
    const fetchFaqs = async () => {
        try {
            const { data } = await axios.get('/src/components/Admin/AdminFaq/AdminFaq.php', {
                params: { action: 'list' }
            });
            setFaqs(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => { fetchFaqs() }, []);

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(f => ({ ...f, [name]: value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        const action = form.id ? 'update' : 'create';
        const payload = new URLSearchParams({ action, id: form.id || '', question: form.question, answer: form.answer });
        try {
            await axios.post('/src/components/Admin/AdminFaq/AdminFaq.php', payload);
            setForm({ id: null, question: '', answer: '' });
            await fetchFaqs();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = faq => setForm({ id: faq.id, question: faq.question, answer: faq.answer });
    const handleDelete = async id => {
        if (!window.confirm('Bạn có chắc muốn xóa?')) return;
        try {
            await axios.post(
                '/src/components/Admin/AdminFaq/AdminFaq.php',
                new URLSearchParams({ action: 'delete', id })
            );
            fetchFaqs();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <section className="section">
            <div className="page-heading">
                <h3>Quản lý Câu hỏi / Đáp</h3>
            </div>

            <div className="page-content">
                {/* Form tạo / sửa */}
                <div className="card">
                    <div className="card-header">
                        <h4>Thêm / Cập nhật FAQ</h4>
                    </div>
                    <div className="card-body">
                        <form className="row g-3" onSubmit={handleSubmit}>
                            <div className="col-md-5">
                                <label className="form-label">Câu hỏi</label>
                                <input
                                    type="text"
                                    name="question"
                                    className="form-control"
                                    value={form.question}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-5">
                                <label className="form-label">Trả lời</label>
                                <textarea
                                    name="answer"
                                    className="form-control"
                                    rows="1"
                                    value={form.answer}
                                    onChange={handleChange}
                                    required
                                />
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
                <div className="card mt-4">
                    <div className="card-header">
                        <h4>Danh sách FAQ</h4>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-striped mb-0">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Câu hỏi</th>
                                    <th>Trả lời</th>
                                    <th>Hành động</th>
                                </tr>
                                </thead>
                                <tbody>
                                {faqs.map(f => (
                                    <tr key={f.id}>
                                        <td>{f.id}</td>
                                        <td>{f.question}</td>
                                        <td>{f.answer}</td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-info me-2"
                                                onClick={() => handleEdit(f)}
                                            >
                                                Sửa
                                            </button>
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => handleDelete(f.id)}
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
            </div>
        </section>
    );
};

export default AdminFaq;
