import React from 'react';

export default function Pagination({ page, setPage, totalPages = 5 }) {
    return (
        <div className="pagination">
            <ul className="pagination-list">
                {[...Array(totalPages)].map((_, i) => (
                    <li
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={`pagination-item ${
                            page === i + 1 ? 'active' : ''
                        }`}
                    >
                        {i + 1}
                    </li>
                ))}
            </ul>
        </div>
    );
}
