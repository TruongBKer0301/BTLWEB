import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './faq.css';

const Faq = () => {
    const [faqs, setFaqs] = useState([]);
    const [openIndex, setOpen] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 5;

    const fetchFaqs = (p) => {
        fetch(`http://localhost/btlweb/BTLWEB/src/components/Faq/faq.php?page=${p}&limit=${limit}`)
            .then(res => res.json())
            .then(data => {
                setFaqs(data.data);
                setPage(data.page);
                setTotalPages(data.totalPages);
                setOpen(null);
            })
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchFaqs(1);
    }, []);

    const goToPage = (p) => {
        if (p >= 1 && p <= totalPages && p !== page) {
            fetchFaqs(p);
        }
    };

    return (
        <div className="faq container py-5">
            <h1 className="h2 fw-bold mb-4">Câu hỏi thường gặp (FAQ)</h1>
            <div className="accordion" id="faqAccordion">
                {faqs.map((item, idx) => (
                    <div className="accordion-item" key={item.id}>
                        <h2 className="accordion-header" id={`heading${idx}`}>
                            <button
                                className={`accordion-button ${openIndex === idx ? '' : 'collapsed'}`}
                                type="button"
                                onClick={() => setOpen(openIndex === idx ? null : idx)}
                            >
                                {item.question}
                            </button>
                        </h2>
                        <div
                            className={`accordion-collapse collapse ${openIndex === idx ? 'show' : ''}`}
                            aria-labelledby={`heading${idx}`}
                            data-bs-parent="#faqAccordion"
                        >
                            <div className="accordion-body">
                                {item.answer}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <nav className="faq-pagination mt-4">
                    <ul className="pagination justify-content-center">
                        <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                            <button
                                className="page-link"
                                onClick={() => goToPage(page - 1)}
                                disabled={page === 1}
                            >
                                «
                            </button>
                        </li>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                            <li key={p} className={`page-item ${p === page ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => goToPage(p)}>
                                    {p}
                                </button>
                            </li>
                        ))}
                        <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                            <button
                                className="page-link"
                                onClick={() => goToPage(page + 1)}
                                disabled={page === totalPages}
                            >
                                »
                            </button>
                        </li>
                    </ul>
                </nav>
            )}
        </div>
    );
};

export default Faq;
