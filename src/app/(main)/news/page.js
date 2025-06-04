'use client';
export default function NewsPage() {
  return (
    <main>
      {/* Banner */}
      <section className="relative">
        <img
          src="/images/banner3.jpg"
          alt="Banner"
          className="w-full h-[500px] object-cover"
        />
        {/* Lớp overlay đen mờ */}
        <div className="absolute inset-0 bg-black/50" />
        {/* Nội dung trên banner */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg mb-4">
            Kết nối với chúng tôi
          </h2>
          <p className="text-white text-lg md:text-xl drop-shadow-sm">
            ☎ Gọi đặt bàn: <strong>0901 234 567</strong>
          </p>
        </div>
      </section>

      {/* Thông tin liên hệ + Form */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-[1280px] w-full px-5 mx-auto">
          <h3 className="text-3xl font-bold mb-10 text-center text-gray-800">
            Thông tin liên hệ
          </h3>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Thông tin liên hệ */}
            <div className="bg-white shadow-md rounded-2xl p-8 space-y-6">
              <div>
                <h4 className="text-xl font-semibold mb-2">Địa chỉ</h4>
                <p className="text-gray-700">
                  123 Lê Lợi, Phường Bến Thành, Quận 1, TP.HCM
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">Số điện thoại</h4>
                <p className="text-gray-700">0901 234 567</p>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">Email</h4>
                <p className="text-gray-700">lienhe@nhahang.com</p>
              </div>
            </div>

            {/* Form liên hệ */}
            <form className="bg-white shadow-md rounded-2xl p-8 space-y-6">
              <div>
                <label className="block mb-1 font-medium">Họ tên</label>
                <input
                  type="text"
                  placeholder="Nhập họ tên"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Email</label>
                <input
                  type="email"
                  placeholder="Nhập email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Nội dung</label>
                <textarea
                  rows={4}
                  placeholder="Nhập nội dung tin nhắn"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <button
                type="submit"
                className="bg-black text-white px-6 py-2 rounded-lg hover:bg-yellow-500 hover:text-white transition"
              >
                Gửi liên hệ
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
