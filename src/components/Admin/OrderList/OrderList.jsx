import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Dropdown, Form, Button, Modal } from 'react-bootstrap';

import BASE_URL from '../../../config/config';
const API_URL = `${BASE_URL}orders/`;

const AdminOrderManager = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [newOrder, setNewOrder] = useState({
    user_id: "",
    product_id: "",
    quantity: 1,
  });

  const [totalPrice, setTotalPrice] = useState(0);

  // Tìm kiếm
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch data
  useEffect(() => {
    fetchOrders();
    fetchUsers();
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      searchOrders();
    } else {
      fetchOrders();  // Lấy lại tất cả đơn hàng khi không tìm kiếm
    }
  }, [searchTerm]);

  const fetchOrders = async () => {
    const res = await axios.get(`${API_URL}get_orders.php`);
    setOrders(res.data);
  };

  const searchOrders = async () => {
    const res = await axios.get(`${API_URL}search_orders.php?q=${encodeURIComponent(searchTerm)}`);
    setOrders(res.data);
  };

  const fetchUsers = async () => {
    const res = await axios.get(`${API_URL}get_users.php`);
    setUsers(res.data.filter((u) => u.role !== "admin"));
  };

  const fetchProducts = async () => {
    const res = await axios.get(`${API_URL}/get_products.php`);
    setProducts(res.data);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    await axios.post(`${API_URL}update_status.php`, {
      order_id: orderId,
      status: newStatus,
    });
    fetchOrders();
  };

  const handleCreateOrder = async () => {
    await axios.post(`${API_URL}create_order.php`, {
      ...newOrder,
      total_price: totalPrice,
    });
    fetchOrders();
    setShowModal(false);
    setNewOrder({ user_id: "", product_id: "", quantity: 1 });
  };

  useEffect(() => {
    const selectedProduct = products.find((p) => p.product_id === parseInt(newOrder.product_id));
    if (selectedProduct) {
      setTotalPrice((newOrder.quantity || 1) * selectedProduct.price);
    } else {
      setTotalPrice(0);
    }
  }, [newOrder.product_id, newOrder.quantity, products]);

  return (
    <div className="container mt-4">
      <h2>Quản lý đơn hàng</h2>

      {/* Tìm kiếm */}
      <Form.Control
        type="text"
        placeholder="Tìm kiếm đơn hàng (Người dùng, Sản phẩm, SĐT)..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-3"
      />

      <Button className="mb-3" onClick={() => setShowModal(true)}>Tạo đơn hàng</Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Phone</th>
            <th>Sản phẩm</th>
            <th>Số lượng</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.order_id}>
              <td>{order.order_id}</td>
              <td>{order.username}</td>
              <td>{order.phone_number}</td>
              <td>{order.product_name}</td>
              <td>{order.quantity}</td>
              <td>{order.total_price} đ</td>
              <td>{order.status}</td>
              <td>
                <Form.Select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.order_id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                  <option value="canceled">Canceled</option>
                </Form.Select>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal tạo đơn hàng */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Tạo đơn hàng mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Người dùng</Form.Label>
            <Form.Select
              value={newOrder.user_id}
              onChange={(e) => setNewOrder({ ...newOrder, user_id: e.target.value })}
            >
              <option value="">-- Chọn --</option>
              {users.map((user) => (
                <option key={user.user_id} value={user.user_id}>
                  {user.username} - {user.phone_number}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Sản phẩm</Form.Label>
            <Form.Select
              value={newOrder.product_id}
              onChange={(e) => setNewOrder({ ...newOrder, product_id: e.target.value })}
            >
              <option value="">-- Chọn --</option>
              {products.map((p) => (
                <option key={p.product_id} value={p.product_id}>
                  {p.name} - {p.price} đ
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Số lượng</Form.Label>
            <Form.Control
              type="number"
              min={1}
              value={newOrder.quantity}
              onChange={(e) =>
                setNewOrder({ ...newOrder, quantity: parseInt(e.target.value) || 1 })
              }
            />
          </Form.Group>

          <p className="mt-3">Tổng tiền: <strong>{totalPrice} đ</strong></p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Hủy</Button>
          <Button onClick={handleCreateOrder} disabled={!newOrder.user_id || !newOrder.product_id}>
            Tạo
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminOrderManager;
