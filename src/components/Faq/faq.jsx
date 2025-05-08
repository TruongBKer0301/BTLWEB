import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './faq.css';

const Faq = () => {
    const [faqs, setFaqs] = useState([]);
    const [openIndex, setOpen] = useState(null);

    useEffect(() => {
        fetch('/components/Faq/faq.php')
            .then(res => res.json())
            .then(data => setFaqs(data))
            .catch(err => console.error(err));
    }, []);

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
        </div>
    );
};

export default Faq;
