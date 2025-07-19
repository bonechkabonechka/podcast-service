import React from 'react';

export default function Pagination({ page, setPage, totalPages }) {
    if (totalPages <= 1) {
        return null;
    }

    const handlePrevious = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNext = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const renderPageNumbers = () => {
        const pages = [];

        if (totalPages <= 3) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(
                    <li
                        key={i}
                        onClick={() => setPage(i)}
                        className={`pagination-item ${
                            page === i ? 'active' : ''
                        }`}
                    >
                        {i}
                    </li>,
                );
            }
        } else {
            pages.push(
                <li
                    key={1}
                    onClick={() => setPage(1)}
                    className={`pagination-item ${page === 1 ? 'active' : ''}`}
                >
                    1
                </li>,
            );

            pages.push(
                <li
                    key={2}
                    onClick={() => setPage(2)}
                    className={`pagination-item ${page === 2 ? 'active' : ''}`}
                >
                    2
                </li>,
            );

            if (page > 2 && page < totalPages) {
                if (page > 3) {
                    pages.push(
                        <li key="dots1" className="pagination-item dots">
                            ...
                        </li>,
                    );
                }
                pages.push(
                    <li
                        key={page}
                        onClick={() => setPage(page)}
                        className="pagination-item active"
                    >
                        {page}
                    </li>,
                );
            }

            if (totalPages > 3 && (page < totalPages - 1 || page <= 2)) {
                pages.push(
                    <li key="dots2" className="pagination-item dots">
                        ...
                    </li>,
                );
            }

            if (totalPages > 2) {
                pages.push(
                    <li
                        key={totalPages}
                        onClick={() => setPage(totalPages)}
                        className={`pagination-item ${
                            page === totalPages ? 'active' : ''
                        }`}
                    >
                        {totalPages}
                    </li>,
                );
            }
        }

        return pages;
    };

    return (
        <div className="pagination">
            <ul className="pagination-list">
                <li
                    onClick={handlePrevious}
                    className={`pagination-item arrow ${
                        page === 1 ? 'disabled' : ''
                    }`}
                >
                    &lt;
                </li>

                {renderPageNumbers()}

                <li
                    onClick={handleNext}
                    className={`pagination-item arrow ${
                        page === totalPages ? 'disabled' : ''
                    }`}
                >
                    &gt;
                </li>
            </ul>
        </div>
    );
}
