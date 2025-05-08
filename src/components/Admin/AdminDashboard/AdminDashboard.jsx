import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from '../../../config/config';
const API_URL = `${BASE_URL}product/`;

function ProductManager() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: '', category: '', stock: '', image: null });
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');

  const fetchProducts = async () => {
    const res = await axios.get(`${API_URL}search.php?search=${search}`);
    setProducts(res.data);
  };

  useEffect(() => { fetchProducts(); }, [search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach(key => formData.append(key, form[key]));

    if (editingId) formData.append('product_id', editingId);

    const endpoint = editingId ? 'update.php' : 'create.php';
    await axios.post(`${API_URL}${endpoint}`, formData);
    setForm({ name: '', description: '', price: '', category: '', stock: '', image: null });
    setEditingId(null);
    fetchProducts();
  };

  const handleEdit = (product) => {
    setEditingId(product.product_id);
    setForm({ ...product, image: null });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xoá?')) {
      await axios.post(`${API_URL}delete.php`, { product_id: id });
      fetchProducts();
    }
  };

  return (
    <div className="container py-3">
      <h3>Quản lý sản phẩm</h3>

      <form onSubmit={handleSubmit} className="row g-2 mb-4">
        <div className="col-md-4">
          <input className="form-control" placeholder="Tên sản phẩm" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
        </div>
        <div className="col-md-2">
          <input type="number" className="form-control" placeholder="Giá" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required />
        </div>
        <div className="col-md-2">
          <input type="number" className="form-control" placeholder="Tồn kho" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} />
        </div>
        <div className="col-md-4">
          <input className="form-control" placeholder="Danh mục" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
        </div>
        <div className="col-md-12">
          <textarea className="form-control" placeholder="Mô tả" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}></textarea>
        </div>
        <div className="col-md-6">
          <input type="file" className="form-control" onChange={e => setForm({ ...form, image: e.target.files[0] })} />
        </div>
        <div className="col-md-6 d-grid">
          <button className="btn btn-primary">{editingId ? 'Cập nhật' : 'Thêm mới'}</button>
        </div>
      </form>

      <input className="form-control mb-2" placeholder="Tìm kiếm sản phẩm..." value={search} onChange={e => setSearch(e.target.value)} />

      <table className="table table-bordered">
        <thead>
          <tr><th>Ảnh</th><th>Tên</th><th>Giá</th><th>Tồn kho</th><th>Danh mục</th><th>Hành động</th></tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.product_id}>
              <td><img src={`${API_URL}../uploads/${p.image}`} width="50" alt="" /></td>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.stock}</td>
              <td>{p.category}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(p)}>Sửa</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p.product_id)}>Xoá</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductManager;
