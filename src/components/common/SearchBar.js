'use client'

import { useState } from 'react';

export default function SearchBar({onSearch}) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(query.trim());
  }

  return (
    <>
      <form onSubmit={handleSubmit}
            className="w-full sm:max-w-xs flex items-center border border-gray-300 rounded-3xl shadow-sm px-3 py-2 cursor-pointer">
        <input
          type="text"
          placeholder="Tìm kiếm danh mục..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-white"
        />
        <img className={`text-gray-500 ml-2 w-7 h-7`} src="/icons/common/icon_search.png" alt="" />
      </form>
    </>
  );
}