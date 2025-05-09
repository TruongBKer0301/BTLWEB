import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminFaq.css';

export default function AdminFaq() {
    const API = 'http://localhost/btlweb/BTLWEB/src/components/Admin/AdminFaq/AdminFaq.php';
    const perPage = 10;

    const [faqs, setFaqs]           = useState([]);
    const [page, setPage]           = useState(1);
    const [total, setTotal]         = useState(0);
    const [loading, setLoading]     = useState(false);

    const [newQ, setNewQ]   = useState('');
    const [newA, setNewA]   = useState('');
    const [creating, setCreating] = useState(false);

    const [editId, setEditId] = useState(null);
    const [editQ, setEditQ]   = useState('');
    const [editA, setEditA]   = useState('');
    const [updating, setUpdating] = useState(false);

    const load = async (p=1) => {
        setLoading(true);
        try {
            const { data } = await axios.get(API, { params:{ action:'list', page:p, limit:perPage }});
            setFaqs(Array.isArray(data.data)?data.data:[]);
            setTotal(data.total||0);
            setPage(data.page||p);
        } catch(e) { console.error(e) }
        setLoading(false);
    };

    useEffect(()=>{ load(1) }, []);

    const onCreate = async e=>{
        e.preventDefault();
        if(!newQ.trim()||!newA.trim()) return alert('Chưa nhập đầy đủ');
        setCreating(true);
        try {
            await axios.post(API, new URLSearchParams({ action:'create', question:newQ, answer:newA }));
            setNewQ(''); setNewA('');
            load(page);
        } catch(e){ console.error(e); alert('Tạo thất bại') }
        setCreating(false);
    };

    const onStartEdit = faq=>{
        setEditId(faq.id);
        setEditQ(faq.question);
        setEditA(faq.answer);
    };
    const onCancelEdit = ()=> {
        setEditId(null);
        setEditQ(''); setEditA('');
    };

    const onUpdate = async e=>{
        e.preventDefault();
        if(!editQ.trim()||!editA.trim()) return alert('Chưa nhập đầy đủ');
        setUpdating(true);
        try {
            await axios.post(API, new URLSearchParams({
                action:'update', id:editId, question:editQ, answer:editA
            }));
            onCancelEdit();
            load(page);
        } catch(e){ console.error(e); alert('Cập nhật thất bại') }
        setUpdating(false);
    };

    const onDelete = async id=>{
        if(!window.confirm('Xác nhận xóa FAQ này?')) return;
        try {
            await axios.post(API, new URLSearchParams({ action:'delete', id }));
            // nếu xóa hết items trên trang cuối, back to page-1
            if(faqs.length===1 && page>1) load(page-1);
            else load(page);
        } catch(e){ console.error(e); alert('Xóa thất bại') }
    };

    const totalPages = Math.ceil(total/perPage);

    return (
        <section className="admin-faq">
            <h2>Quản lý FAQ</h2>

            {/* form tạo mới */}
            <form className="faq-form" onSubmit={onCreate}>
                <input
                    placeholder="Question..."
                    value={newQ} onChange={e=>setNewQ(e.target.value)}
                    disabled={creating}
                />
                <input
                    placeholder="Answer..."
                    value={newA} onChange={e=>setNewA(e.target.value)}
                    disabled={creating}
                />
                <button type="submit" disabled={creating}>
                    {creating?'Đang thêm…':'Thêm FAQ'}
                </button>
            </form>

            {loading && <p className="loading">Đang tải…</p>}

            {!loading && faqs.length===0 && <p className="no-data">Chưa có FAQ.</p>}

            {!loading && faqs.length>0 && (
                <table className="faq-table">
                    <thead>
                    <tr>
                        <th>ID</th><th>Question</th><th>Answer</th><th>Created</th><th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {faqs.map(faq => (
                        editId===faq.id
                            ? (
                                <tr key={faq.id} className="edit-row">
                                    <td>{faq.id}</td>
                                    <td>
                                        <input
                                            value={editQ} onChange={e=>setEditQ(e.target.value)}
                                            disabled={updating}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            value={editA} onChange={e=>setEditA(e.target.value)}
                                            disabled={updating}
                                        />
                                    </td>
                                    <td>{new Date(faq.created_at).toLocaleDateString()}</td>
                                    <td className="action-buttons">
                                        <button onClick={onUpdate} disabled={updating}>
                                            {updating?'Đang Lưu…':'Lưu'}
                                        </button>
                                        <button onClick={onCancelEdit} disabled={updating}>
                                            Hủy
                                        </button>
                                    </td>
                                </tr>
                            )
                            : (
                                <tr key={faq.id}>
                                    <td>{faq.id}</td>
                                    <td>{faq.question}</td>
                                    <td>{faq.answer}</td>
                                    <td>{new Date(faq.created_at).toLocaleDateString()}</td>
                                    <td className="action-buttons">
                                        <button onClick={()=>onStartEdit(faq)}>Sửa</button>
                                        <button onClick={()=>onDelete(faq.id)}>Xóa</button>
                                    </td>
                                </tr>
                            )
                    ))}
                    </tbody>
                </table>
            )}

            {totalPages>1 && (
                <div className="pagination">
                    {Array.from({length: totalPages},(_,i)=>i+1).map(p=>(
                        <button
                            key={p}
                            className={p===page?'active':''}
                            onClick={()=>load(p)}
                        >{p}</button>
                    ))}
                </div>
            )}
        </section>
    );
}
