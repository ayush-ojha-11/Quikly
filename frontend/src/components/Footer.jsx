import { Link } from "react-router-dom";
import { APP_NAME } from "../constants/constants";
const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content py-5 px-6">
      {/* Branding */}
      <div className="text-center">
        <h2 className="text-xl font-bold text-white">{APP_NAME}</h2>
        <p className="mt-1 text-gray-400">Buy & Sell Easily</p>
      </div>

      {/* Copyright */}
      <div className="mt-5 text-center text-gray-500 text-sm border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} {APP_NAME}. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
