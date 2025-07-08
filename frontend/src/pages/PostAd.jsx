import { useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAdminStore } from "../store/useAdminStore";

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

const PostAd = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const { fetchProducts } = useAdminStore();

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };
  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      return toast.error("Please upload an image!");
    }

    setLoading(true);

    const formDataObj = new FormData();
    formDataObj.append("title", formData.title);
    formDataObj.append("description", formData.description);
    formDataObj.append("price", formData.price);
    formDataObj.append("category", formData.category);
    formDataObj.append("image", formData.image);

    // API call to post the ad

    try {
      await axiosInstance.post("/products", formDataObj);
      toast.success("Ad posted successfully.");
      // fetching products to update allProducts in the store
      fetchProducts();
    } catch (error) {
      console.error("Error posting ad: ", error.message);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Post an Ad</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* title */}
          <div>
            <label className="block font-medium label-text">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter product title"
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
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              className="textarea w-full"
            />
          </div>
          {/* price */}
          <div>
            <label className="block font-medium label-text">Price (₹)</label>
            <input
              type="number"
              name="price"
              className="input w-full"
              onChange={handleChange}
              placeholder="Enter price (₹)"
              value={formData.price}
              required
            />
          </div>
          {/* category */}
          <div>
            <label className="block font-medium label-text">Category</label>
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

          {/* Image upload */}

          <div>
            <label className="block font-medium label-text">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input file-input-bordered w-full"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full btn btn-primary"
            disabled={loading}
          >
            {loading ? "Uploading your Ad. Please Wait...." : "Post Ad"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default PostAd;
