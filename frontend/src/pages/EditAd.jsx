import { useState } from "react";
import { useLocation } from "react-router-dom";

import toast from "react-hot-toast";
import { useAdminStore } from "../store/useAdminStore";

const EditAd = () => {
  const categories = [
    "Electronics",
    "Fashion",
    "Home & Kitchen",
    "Automobiles",
    "Sports & Outdoors",
    "Books",
    "Toys",
    "Real Estate",
    "Services",
  ];
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: null,
  });
  const { isUpdating, updateProduct } = useAdminStore();

  // received data from seller-dashboard (product to be edited)
  const { state } = useLocation();
  const product = state?.product;

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.image) {
      return toast.error("Please upload an image!");
    }
    const formDataObj = new FormData();
    formDataObj.append("title", formData.title);
    formDataObj.append("description", formData.description);
    formDataObj.append("price", formData.price);
    formDataObj.append("category", formData.category);
    formDataObj.append("image", formData.image);

    updateProduct(product, formDataObj);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="shadow-lg rounded-lg w-full p-6 max-w-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Edit your Ad
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* title */}
          <div>
            <label className="block font-medium label-text">Title</label>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              value={formData.title}
              placeholder={product.title}
              className="input w-full"
              required
            />
          </div>
          {/* description */}
          <div>
            <label className="block font-medium label-text">Description</label>
            <textarea
              rows="4"
              name="description"
              onChange={handleChange}
              value={formData.description}
              placeholder={product.description}
              className="textarea w-full"
            />
          </div>

          {/* price */}
          <div>
            <label>Price (₹)</label>
            <input
              type="number"
              name="price"
              placeholder={product.price}
              className="input w-full"
              onChange={handleChange}
              value={formData.price}
              required
            />
          </div>

          {/* category */}

          <div>
            <label className="block font-medium">Category</label>
            <select
              className="select select-bordered w-full"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* image */}
          <div>
            <label className="block font-medium label-text">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input file-input-bordered w-full"
            />
          </div>

          {/* update button */}
          <button
            type="submit"
            className="w-full btn btn-primary"
            disabled={isUpdating}
          >
            {isUpdating ? "Updating your Ad. Please Wait...." : "Update Ad"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditAd;
