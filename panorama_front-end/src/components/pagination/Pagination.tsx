import {
  FaChevronLeft,
  FaChevronRight ,
} from 'react-icons/fa';
import './pagination.css'

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) => {

    if(totalPages <= 1){
        return null;
    }

    const pageNumbers = getPageNumbers(currentPage, totalPages);

    return (
        <>
      <div className="pagination">
        <ul className="pagination justify-content-center">
         
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button
              onClick={() => onPageChange(currentPage - 1)}
              className="page-link"
            >
              <FaChevronLeft />
            </button>
          </li>
            {pageNumbers.map((page, index) => (
              <li
                key={index}
                className={`page-item ${
                  page === currentPage ? 'active' : ''
                } ${page === '...' ? 'disabled' : ''}`}
              >
                <button
                  onClick={() => typeof page === 'number' && onPageChange(page)}
                  className="page-link"
                  disabled={page === '...'}
                >
                  {page}
                </button>
              </li>
            ))}

          <li
            className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
          >
            <button
              onClick={() => onPageChange(currentPage + 1)}
              className="page-link"
            >
              <FaChevronRight />
            </button>
          </li>
          <li
            className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
          >
          </li>
        </ul>
      </div>
    </>
    )
}

export default Pagination;

function getPageNumbers(currentPage: number, totalPages: number) {
    const delta = 1; // controla quantas páginas aparecem ao redor da atual
    const pages: (number | string)[] = [];

    const start = Math.max(2, currentPage - delta);
    const end = Math.min(totalPages - 1, currentPage + delta);

    // primeira página
    pages.push(1);

    if (start > 2) {
        pages.push("...");
    }

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    if (end < totalPages - 1) {
        pages.push("...");
    }

    if (totalPages > 1) {
        pages.push(totalPages);
    }

    return pages;
} 