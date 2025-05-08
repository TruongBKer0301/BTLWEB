// src/components/ProductList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '../../config/config';
//import './ProductList.css'; // nếu bạn muốn style riêng
const API_URL = `${BASE_URL}product/`;

function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [search, sort]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}list.php`, {
        params: {
          search,
          sort,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseDetail = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Danh sách sản phẩm</h2>
      <div className="row mb-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm sản phẩm..."
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        <div className="col-md-6">
          <select className="form-select" value={sort} onChange={handleSortChange}>
            <option value="">-- Sắp xếp --</option>
            <option value="price_asc">Giá tăng dần</option>
            <option value="price_desc">Giá giảm dần</option>
            <option value="name_asc">Tên A-Z</option>
            <option value="name_desc">Tên Z-A</option>
          </select>
        </div>
      </div>

      <div className="row">
        {products.map((product) => (
          <div className="col-md-3 mb-4" key={product.product_id}>
            <div className="card h-100" onClick={() => handleProductClick(product)} style={{ cursor: 'pointer' }}>
              <img
                src={`${BASE_URL}uploads/${product.image}`}
                className="card-img-top"
                alt={product.name}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.price}₫</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chi tiết sản phẩm */}
      {selectedProduct && (
        <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedProduct.name}</h5>
                <button type="button" className="btn-close" onClick={handleCloseDetail}></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-5">
                    <img
                      src={`${BASE_URL}uploads/${selectedProduct.image}`}
                      alt={selectedProduct.name}
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-md-7">
                    <p><strong>Giá:</strong> {selectedProduct.price}₫</p>
                    <p><strong>Loại:</strong> {selectedProduct.category}</p>
                    <p><strong>Tồn kho:</strong> {selectedProduct.stock}</p>
                    <p><strong>Mô tả:</strong> {selectedProduct.description}</p>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseDetail}>Đóng</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductList;
