import { Link } from "react-router-dom";
import { LogOut, Menu, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js";
import { APP_NAME } from "../constants/constants";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();

  if (!authUser) {
    return (
      <nav className="navbar text-base-content  px-6">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-semibold flex items-center gap-2"
          >
            <img src={"cart.svg"} className="size-10" />
            <span className="text-base-content">{APP_NAME}</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex">
            <ul className="menu menu-horizontal text-lg font-medium space-x-2">
              <li hidden={!authUser ? false : true}>
                <Link to="/login" className="btn btn-outline btn-primary px-4">
                  Login
                </Link>
              </li>
              <li hidden={!authUser ? false : true}>
                <Link to="/register" className="btn btn-primary px-4">
                  Register
                </Link>
              </li>
              <li>
                <button
                  hidden={!authUser ? true : false}
                  onClick={() => logout()}
                >
                  <LogOut className="size-6" />
                </button>
              </li>
            </ul>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <Menu size={24} />
              </label>
              <ul
                tabIndex={0}
                className="menu menu-lg dropdown-content mt-3 z-[1] p-2 shadow bg-base-300 rounded-box w-58"
              >
                <li hidden={!authUser ? false : true}>
                  <Link to="/login">Login</Link>
                </li>
                <li hidden={!authUser ? false : true}>
                  <Link to="/register">Register</Link>
                </li>
                <li>
                  <button
                    hidden={!authUser ? true : false}
                    onClick={() => logout()}
                  >
                    <LogOut className="size-4" />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    );
  }
  if (authUser) {
    return (
      <nav className="navbar  text-base-content  px-6">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex gap-2">
            <User className="size-5" />
            <h1>{authUser.name}</h1>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex">
            <ul className="menu menu-horizontal text-lg font-medium space-x-2">
              <li>
                <Link to="/products">Home</Link>
              </li>
              <li>
                <Link to="/about">About us</Link>
              </li>
              <li>
                <Link to="/contact">Contact us</Link>
              </li>
              <li>
                <Link
                  to="/seller-dashboard"
                  className="btn btn-primary pl-5 pr-5"
                >
                  Sell
                </Link>
              </li>
              <li>
                <button className="" onClick={() => logout()}>
                  <LogOut className="size-5" /> Logout
                </button>
              </li>
            </ul>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <Menu size={24} />
              </label>
              <ul
                tabIndex={0}
                className="menu menu-lg dropdown-content mt-3 z-[1] p-2 shadow bg-base-300 rounded-box w-58"
              >
                <li>
                  <Link to="/seller-dashboard">Sell</Link>
                </li>
                <li>
                  <Link to="/about">About us</Link>
                </li>
                <li>
                  <Link to="/contact">Contact us</Link>
                </li>
                <li>
                  <button onClick={() => logout()}>
                    <LogOut />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    );
  }
};

export default Navbar;
