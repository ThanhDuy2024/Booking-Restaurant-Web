export default function CategoryManage() {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Quản lý danh mục món ăn
        </h2>
        <button className="flex gap-2 items-center bg-primary text-white rounded-lg hover:bg-primary-dark transition">
          <img src="/icons/manager/icon_add_color.png" alt="Add" className="w-12 h-12 bg-white border-2 border-[var(--primary)] rounded-l-lg" />
          <span className={`pr-4 py-2`}>Thêm danh mục</span>
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-left bg-white">
          <thead className="bg-gray-200 text-sm text-gray-600 uppercase">
          <tr>
            <th scope="col" className="px-6 py-3">
              Tên danh mục
            </th>
            <th scope="col" className="px-6 py-3">
              Trạng thái
            </th>
          </tr>
          </thead>
          <tbody className="text-sm font-text text-gray-700 hover:bg-gradient-to-r from-violet-200 to-amber-200 transition duration-1000 cursor-pointer ">
          <tr className="border-t">
            <td className="px-6 py-4">
              Apple MacBook Pro 17"
            </td>
            <td className="px-6 py-4">
              Hiển thị
            </td>
          </tr>
          {/* TODO: Map dữ liệu từ Redux vào đây */}
          </tbody>
        </table>
      </div>
    </div>
  );
}