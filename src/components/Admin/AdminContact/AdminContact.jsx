import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminContact = () => {
    const [contacts, setContacts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 15;

    // Fetch contacts from the backend
    useEffect(() => {
        axios.get('http://localhost:8888/btlweb/src/components/Admin/AdminContact/AdminContact.php')
            .then(response => setContacts(response.data))
            .catch(error => console.error('Error fetching contacts:', error));
    }, []);

    // Handle actions
    const handleAction = (id, action) => {
        axios.post('http://localhost:8888/btlweb/src/components/Admin/AdminContact/AdminContact.php', {
            id,
            action
        })
            .then(() => {
                // Refresh the contact list after an action
                setContacts(contacts.map(contact =>
                    contact.id === id ? { ...contact, status: action } : contact
                ));
            })
            .catch(error => console.error('Error performing action:', error));
    };

    // Pagination logic
    const totalPages = Math.ceil(contacts.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const currentContacts = contacts.slice(startIndex, startIndex + rowsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Liên hệ Khách hàng</h1>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Tên</th>
                    <th>SDT</th>
                    <th>Email</th>
                    <th>Tin nhắn</th>
                    <th>Trạng thái</th>
                    <th>Tác vụ</th>
                </tr>
                </thead>
                <tbody>
                {currentContacts.map(contact => (
                    <tr key={contact.id}>
                        <td>{contact.id}</td>
                        <td>{contact.name}</td>
                        <td>{contact.phone}</td>
                        <td>{contact.email}</td>
                        <td>{contact.message}</td>
                        <td>{contact.status}</td>
                        <td>
                            <button onClick={() => handleAction(contact.id, 'Đã đọc')} className="btn btn-success btn-sm">Đã đọc</button>
                            <button onClick={() => handleAction(contact.id, 'Chưa đọc')} className="btn btn-warning btn-sm">Chưa đọc</button>
                            <button onClick={() => handleAction(contact.id, 'Đã phản hồi')} className="btn btn-info btn-sm">Đã phản hồi</button>
                            <button onClick={() => handleAction(contact.id, 'Xóa')} className="btn btn-danger btn-sm">Xóa</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="d-flex justify-content-center mt-3">
                <button
                    className="btn btn-primary mx-1"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        className={`btn mx-1 ${currentPage === index + 1 ? 'btn-secondary' : 'btn-outline-secondary'}`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    className="btn btn-primary mx-1"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AdminContact;