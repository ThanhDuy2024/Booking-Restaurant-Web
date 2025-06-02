'use client';
import React, { useState } from 'react';

export default function MenuPage() {
  const categories = ['Phở', 'Gỏi Cuốn', 'Chè', 'Bánh', 'Cơm'];

  const menuItems1 = [
    { id: 1, name: 'Phở Bò', category: 'Phở' },
    { id: 2, name: 'Phở Gà', category: 'Phở' },
    { id: 3, name: 'Gỏi Cuốn Tôm Thịt', category: 'Gỏi Cuốn' },
    { id: 4, name: 'Chè Dừa Non', category: 'Chè' },
    { id: 5, name: 'Bánh Mì', category: 'Bánh' },
    { id: 6, name: 'Cơm Tấm', category: 'Cơm' },
    // ... thêm món ăn khác
  ];
  const menuItems = [
    {
      id: 1,
      name: 'Phở Bò Truyền Thống',
      image: '/fonts/images/product.jpg',
      position: 1,
      status: 'active',
      price: 120,
      discount: 30,
      stars: 4,
    },
    {
      id: 2,
      name: 'Gỏi Cuốn Tôm Thịt',
      image: '/fonts/images/product.jpg',
      position: 2,
      status: 'unactive',
      price: 60,
      discount: 0,
      stars: 5,
    },
    {
      id: 3,
      name: 'Chè Dừa Non',
      image: '/fonts/images/product.jpg',
      position: 3,
      status: 'active',
      price: 45,
      discount: 50,
      stars: 3,
    },
    {
      id: 4,
      name: 'Chè Dừa Non',
      image: '/fonts/images/product.jpg',
      position: 4,
      status: 'active',
      price: 45,
      discount: 5,
      stars: 3,
    },
    {
      id: 5,
      name: 'Chè Dừa Non',
      image: '/fonts/images/product.jpg',
      position: 5,
      status: 'active',
      price: 45,
      discount: 50,
      stars: 3,
    },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const sortedItems = menuItems.sort((a, b) => a.position - b.position);
  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);
  const currentItems = sortedItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCheckboxChange = (categoryName) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((c) => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  const filteredMenuItems1 =
    selectedCategories.length === 0
      ? menuItems1
      : menuItems1.filter((item) => selectedCategories.includes(item.category));

  return (
    <main>
      <section className="relative">
        <img src="/fonts/images/img_product_list_banner.webp" alt="Banner" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <h2 className="text-4xl font-semibold text-white">Menu</h2>
        </div>
      </section>

      <section className="pt-12 pb-12">
        <div className="max-w[1480px] w-full px-5 mx-auto py-0 ">
          <div className="lg:grid grid-cols-5 gap-6">
            {/* Danh mục */}
            <div className="col-span-1 p-4 border rounded-md shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Danh Mục Món Ăn</h2>
              <ul className="space-y-3">
                {categories.map((name) => (
                  <li
                    key={name}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      id={`cat-${name}`}
                      checked={selectedCategories.includes(name)}
                      onChange={() => handleCheckboxChange(name)}
                    />
                    <label
                      htmlFor={`cat-${name}`}
                      className="select-none font-medium text-sm"
                    >
                      {name}
                    </label>
                  </li>
                ))}
                <h2 className="text-lg font-semibold mb-4">Danh Sách Món Ăn</h2>
                {filteredMenuItems1.length === 0 ? (
                  <p>Không tìm thấy món ăn phù hợp.</p>
                ) : (
                  <ul className="space-y-3">
                    {filteredMenuItems1.map((item) => (
                      <li
                        key={item.id}
                        className="font-medium text-black text-sm"
                      >
                        {item.name} ({item.category})
                      </li>
                    ))}
                  </ul>
                )}
              </ul>
            </div>
            {/* Món ăn */}
            <div className="col-span-4 p-4">
              <ul className="mt-8 lg:grid grid-cols-4 gap-7 md:grid grid-rows-1 md:gap-10 ">
                {currentItems.map((item) => (
                  <li
                    key={item.id}
                    className="mt-6 md:mt-0 text-center group relative"
                  >
                    <div
                      href="#"
                      className="block  shadow-sm rounded-xl  transition-all duration-300 "
                    >
                      {item.status === 'unactive' && (
                        <span className="absolute py-1 text-xs px-2 top-3 left-3 bg-red-500 text-white rounded-xl">
                          Out of stock
                        </span>
                      )}
                      {item.discount > 0 && (
                        <span className="absolute py-1 text-xs px-2 top-3 left-3 bg-green-500 text-white rounded-xl">
                          -{item.discount}%
                        </span>
                      )}

                      <div className="rounded-xl  bg-white lg:h-[385px]  ">
                        <img
                          className="block w-full h-full object-cover"
                          src={item.image}
                          alt={item.name}
                        />
                      </div>

                      <div className="flex justify-center items-center gap-1 mt-5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <img
                            key={star}
                            className="w-5 h-5 inline-block"
                            src={
                              star <= item.stars
                                ? '/fonts/images/ico_star_active.png'
                                : '/fonts/images/ico_star_gray.png'
                            }
                            alt="Star Rating"
                          />
                        ))}
                      </div>
                      <h3 className="text-15 mt-2 font-semibold">
                        {item.name}
                      </h3>
                      <div className="mt-2  relative h-5 overflow-hidden">
                        <div className="absolute flex items-center flex-col left-1/2 -translate-x-1/2 hover:bottom-0 -bottom-5 transition-all duration-300">
                          <div className="flex items-center justify-center font-bold text-15 text-center">
                            {item.discount > 0 ? (
                              <>
                                <span className="line-through text-green-500 mr-2">
                                  ${item.price.toFixed(2)}
                                </span>
                                <span>-</span>
                                <span>
                                  $
                                  {(
                                    item.price *
                                    (1 - item.discount / 100)
                                  ).toFixed(2)}
                                </span>
                              </>
                            ) : (
                              <span className="text-gray-500">
                                ${item.price.toFixed(2)}
                              </span>
                            )}
                          </div>
                          {item.status === 'active' && (
                            <a
                              href="#"
                              className=" uppercase text-xs font-medium relative  after:absolute after:bottom-0 after:w-0 after:h-[1px] after:bg-black after:left-0 hover:after:w-full after:transition-all after:duration-500"
                            >
                              Add to cart
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <ul className="flex items-center justify-center gap-2">
                  <li>
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className="grid place-items-center w-10 h-10 rounded-full border border-lightGray disabled:opacity-50"
                    >
                      <img
                        className="w-4 h-4"
                        src="/fonts/images/ico_chevron_left.png"
                        alt="Previous"
                      />
                    </button>
                  </li>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <li key={page}>
                        <button
                          onClick={() => setCurrentPage(page)}
                          className={`grid place-items-center w-10 h-10 rounded-full border border-lightGray hover:text-white hover:bg-black transition-all ${
                            page === currentPage ? 'bg-black text-white' : ''
                          }`}
                        >
                          {page}
                        </button>
                      </li>
                    )
                  )}
                  <li>
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className="grid place-items-center w-10 h-10 rounded-full border border-lightGray disabled:opacity-50"
                    >
                      <img
                        className="w-4 h-4"
                        src="/fonts/images/ico_chevron_right.png"
                        alt="Next"
                      />
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
