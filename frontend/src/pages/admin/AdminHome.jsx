import React, { useEffect } from "react";
import { useAdminStore } from "../../store/useAdminStore";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const { fetchAdminStats, stats } = useAdminStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAdminStats();
  }, []);

  const cardStyle =
    "flex items-center gap-4 p-4 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg";

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-base-content">
          👋 Welcome, Admin!
        </h1>
        <p className="ml-8 text-base-content">Manage everything here</p>
      </div>

      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          className={`${cardStyle} bg-blue-100 text-blue-900 cursor-pointer`}
          onClick={() => navigate("/admin/products")}
        >
          <div className="text-4xl">📦</div>
          <div>
            <h2 className="text-lg font-semibold">Total Products</h2>
            <p className="text-3xl font-bold">{stats?.totalProducts}</p>
          </div>
        </div>

        <div
          className={`${cardStyle} bg-green-100 text-green-900 cursor-pointer`}
          onClick={() => navigate("/admin/sellers")}
        >
          <div className="text-4xl">🧑‍💼</div>
          <div>
            <h2 className="text-lg font-semibold">Total Sellers</h2>
            <p className="text-3xl font-bold">{stats?.totalSellers}</p>
          </div>
        </div>

        <div
          className={`${cardStyle} bg-purple-100 text-purple-900 cursor-pointer`}
          onClick={() => navigate("/admin/users")}
        >
          <div className="text-4xl">👨‍💼</div>
          <div>
            <h2 className="text-lg font-semibold">Total Users</h2>
            <p className="text-3xl font-bold">
              {stats?.totalBuyers + stats?.totalSellers}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
