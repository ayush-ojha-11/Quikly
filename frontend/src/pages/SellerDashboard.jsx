import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Edit, LogOut, Trash } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js";
import { useAdminStore } from "../store/useAdminStore.js";
import { isPossiblePhoneNumber } from "libphonenumber-js";
import toast from "react-hot-toast";

const SellerDashboard = () => {
  const navigate = useNavigate();
  const [phoneData, setPhoneData] = useState({
    phone: "",
  });
  const { authUser, changeRole, logout } = useAuthStore();
  const {
    deleteAProduct,
    isDeleting,
    isLoading,
    fetchProductsOfSeller,
    productsOfASeller,
  } = useAdminStore();

  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, [authUser, navigate]);

  useEffect(() => {
    if (authUser && authUser.role === "seller") fetchProductsOfSeller();
  }, [authUser, fetchProductsOfSeller]);

  const changeRoleToSeller = (phoneData) => {
    const valid = isPossiblePhoneNumber(phoneData.phone);
    console.log(valid);

    if (valid === false) {
      toast.error("Enter a valid phone number!");
      return;
    } else {
      changeRole(phoneData);
    }
  };

  const handleDelete = (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this ad?"
    );
    if (!confirmDelete) return;
    deleteAProduct(productId);
  };

  const handleEdit = (product) => {
    navigate("/editAd", {
      state: {
        product,
      },
    });
  };

  return authUser?.role === "seller" ? (
    <div className="mx-auto p-4 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-sm md:text-xl font-bold">Seller Dashboard</h2>
        <div className="space-x-2">
          <Link to="/post-ad" className="btn btn-primary btn-sm md:btn-md">
            Post new Ad
          </Link>
          <button
            className="btn btn-error btn-sm md:btn-md"
            onClick={() => logout()}
          >
            Logout <LogOut className="size-5" />
          </button>
        </div>
      </div>

      <h2 className="text-xl font-medium mb-4 text-center">All your Ads</h2>

      {isLoading ? (
        <p className="text-center text-lg text-base-content">Loading...</p>
      ) : productsOfASeller?.length === 0 ? (
        <p className="text-center text-lg text-base-content">
          No products listed yet.
        </p>
      ) : !isDeleting ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productsOfASeller?.map((product) => (
            <div
              key={product._id}
              className="bg-base-300 shadow-lg rounded-lg overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-contain"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold truncate">
                  {product.title}
                </h3>
                <p className="font-bold text-green-600">₹{product.price}</p>
                <p className="text-sm text-base-content/70">
                  {product.category}
                </p>
                <div className="flex justify-between mt-4">
                  <button
                    className="btn btn-primary btn-ghost"
                    onClick={() => handleEdit(product)}
                  >
                    <Edit className="size-5" />
                    Edit
                  </button>

                  <button
                    className="btn btn-error btn-ghost"
                    onClick={() => handleDelete(product._id)}
                  >
                    <Trash /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1 className="text-center text-lg">
          Please wait, deleting your Ad...
        </h1>
      )}
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-200 px-6 md:px-20 py-14 gap-10 justify-items-center">
      {/* Left Section */}
      <div className="flex flex-col justify-center items-center text-center space-y-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
          Want to become a <span className="text-primary">Seller</span>?
        </h1>
        <p className="text-base md:text-lg text-gray-600 max-w-md">
          Start your journey with us and expand your reach by posting ads for
          your products or services.
        </p>

        <div className="w-full max-w-sm space-y-4">
          <input
            type="text"
            placeholder="Phone number (e.g., +91 98765 01010)"
            value={phoneData.phone}
            onChange={(e) =>
              setPhoneData({ ...phoneData, phone: e.target.value })
            }
            className="input input-bordered w-full shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
          />
          <button
            className="btn btn-primary w-full text-lg shadow-lg hover:scale-105 transition-transform"
            onClick={() => changeRoleToSeller(phoneData)}
          >
            Become a Seller
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden md:flex flex-col justify-center items-center space-y-10">
        <img
          src="seller.svg"
          alt="Seller Illustration"
          className="w-80 h-80 object-contain rounded-3xl shadow-xl transition duration-300 hover:scale-105"
        />
        <div className="text-left text-gray-700 text-base md:text-lg space-y-1">
          <p>🚀 Create your seller profile</p>
          <p>📢 Post ads for your products & services</p>
          <p>🌍 Reach a wider audience and grow your brand</p>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
