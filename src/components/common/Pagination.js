'use client';

import { useMemo } from 'react';

export default function Pagination({ currentPage = 1, totalPages = 1, onPageChange }) {
  const visiblePages = useMemo(() => {
    const delta = 2;
    const range = [];

    for (let i = Math.max(1, currentPage - delta); i <= Math.min(totalPages, currentPage + delta); i++) {
      range.push(i);
    }

    return range;
  }, [currentPage, totalPages]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange?.(page);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <nav className="flex justify-center items-center gap-2 mt-6">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded border bg-white hover:bg-gray-200 disabled:opacity-50"
      >
        ←
      </button>

      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => goToPage(page)}
          className={`px-3 py-1 rounded-xl border ${
            page === currentPage
              ? 'bg-primary text-white'
              : 'bg-white hover:bg-gray-200'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded border bg-white hover:bg-gray-100 disabled:opacity-50"
      >
        →
      </button>
    </nav>
  );
}
