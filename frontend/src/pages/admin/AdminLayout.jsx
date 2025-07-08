import { Outlet, NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState } from "react";
const AdminLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <aside
        className={`bg-base-200 hidden md:block p-4 ${
          isMenuOpen ? "w-64" : "w-15"
        }`}
      >
        <span className="flex justify-between mb-8">
          <NavLink to="/admin" hidden={!isMenuOpen}>
            Admin Panel
          </NavLink>
          <Menu
            className="cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        </span>
        <ul className="space-y-2" hidden={!isMenuOpen}>
          <li>
            <NavLink to="/admin/users" className="btn btn-sm hover:bg-primary">
              All Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/products"
              className="btn btn-sm hover:bg-primary"
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/sellers"
              className="btn btn-sm hover:bg-primary"
            >
              Sellers
            </NavLink>
          </li>
        </ul>
      </aside>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
