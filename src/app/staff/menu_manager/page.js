'use client';
import React, { useState } from 'react';
import SearchBar from '@/components/common/SearchBar';
import { ChevronDown, ChevronUp } from 'lucide-react';

const MenuManager = () => {
  const [search, setSearch] = useState('');
  const [openCategory, setOpenCategory] = useState(null);

  const menuItems = [
    {
      id: 1,
      name: 'Cơm tấm',
      price: 45000,
      image: '/images/product.jpg',
    },
    {
      id: 2,
      name: 'Phở bò',
      price: 50000,
      image: '/images/product.jpg',
    },
    {
      id: 3,
      name: 'Bún chả',
      price: 40000,
      image: '/images/product.jpg',
    },
    {
      id: 4,
      name: 'Trà đá',
      price: 10000,
      image: '/images/product.jpg',
    },
    {
      id: 5,
      name: 'Nước cam',
      price: 15000,
      image: '/images/product.jpg',
    },
    {
      id: 6,
      name: 'Cafe sữa',
      price: 20000,
      image: '/images/product.jpg',
    },
    {
      id: 7,
      name: 'Bánh flan',
      price: 12000,
      image: '/images/product.jpg',
    },
    {
      id: 8,
      name: 'Chè đậu xanh',
      price: 15000,
      image: '/images/product.jpg',
    },
    {
      id: 9,
      name: 'Bánh mì',
      price: 20000,
      image: '/images/product.jpg',
    },
    {
      id: 10,
      name: 'Gỏi cuốn',
      price: 25000,
      image: '/images/product.jpg',
    },
    {
      id: 11,
      name: 'Mì xào hải sản',
      price: 60000,
      image: '/images/product.jpg',
    },
    {
      id: 12,
      name: 'Súp cua',
      price: 30000,
      image: '/images/product.jpg',
    },
    {
      id: 13,
      name: 'Cua rang me',
      price: 80000,
      image: '/images/product.jpg',
    },
    {
      id: 14,
      name: 'Bò bít tết',
      price: 90000,
      image: '/images/product.jpg',
    },
    {
      id: 15,
      name: 'Bò nướng tảng',
      price: 95000,
      image: '/images/product.jpg',
    },
  ];

  const menuData = [
    {
      category: 'Món Khai Vị',
      items: ['Súp cua', 'Mì xào hải sản'],
    },
    {
      category: 'Món Chính',
      items: ['Cua rang me', 'Bò bít tết', 'Bò nướng tảng'],
    },

    {
      category: 'Tráng Miệng',
      items: ['Bánh flan', 'Chè đậu xanh'],
    },
    {
      category: 'Đồ Uống',
      items: ['Trà đá', 'Nước cam', 'Cafe sữa'],
    },
  ];

  const handleSearch = (keyword) => {
    setSearch(keyword);
  };

  return (
    <main>
      <section>
        <div className="max-w-[1480px] w-full px-5 mx-auto py-0 font-sans">
          <h2 className="text-3xl font-extrabold mb-6 text-gray-800 flex items-center gap-7">
            <SearchBar onSearch={handleSearch} />
            Thực Đơn Món Ăn Nhà Hàng
          </h2>

          {/* DANH MỤC MÓN ĂN DROPDOWN */}
          <div className="mt-12">
            {menuData.map((category, index) => (
              <div key={index} className="bg-white rounded  shadow">
                <div
                  className="flex justify-between items-center px-4 py-3 cursor-pointer hover:bg-gray-100"
                  onClick={() =>
                    setOpenCategory(openCategory === index ? null : index)
                  }
                >
                  <span className="font-semibold text-gray-800">
                    {category.category}
                  </span>
                  {openCategory === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </div>

                {openCategory === index && (
                  <ul className="px-6 pb-4 space-y-3">
                    {category.items.map((itemName, i) => {
                      const item = menuItems.find((m) => m.name === itemName);
                      return (
                        <li
                          key={i}
                          className="flex items-center justify-between px-4 py-2 rounded-md shadow-sm bg-gray-50"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={item?.image || '/images/product.jpg'}
                              alt={itemName}
                              className="w-12 h-12 object-cover rounded-full"
                            />
                            <div>
                              <span className="text-gray-800 font-medium block">
                                {itemName}
                              </span>
                              {item && (
                                <span className="text-gray-500 text-sm">
                                  {item.price.toLocaleString()} VND
                                </span>
                              )}
                            </div>
                          </div>
                          <button className="bg-yellow-200 text-yellow-700 hover:bg-yellow-500 hover:text-white px-3 py-1 rounded text-sm transition">
                            Chỉnh sửa
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default MenuManager;
