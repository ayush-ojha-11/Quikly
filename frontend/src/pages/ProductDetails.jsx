import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore.js";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import RelatedProducts from "../components/RelatedProducts.jsx";
import { useAdminStore } from "../store/useAdminStore.js";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const ProductDetails = () => {
  const { id } = useParams();
  const { authUser } = useAuthStore();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { otherProducts, fetchOtherProducts } = useAdminStore();
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    if (!authUser) navigate("/login");
  }, [authUser, navigate]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axiosInstance.get(`/products/${id}`);
        setProduct(data);
        fetchOtherProducts(data);
      } catch (error) {
        console.error("Error: ", error.message);
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, fetchOtherProducts]);

  if (loading) {
    return (
      <p className="text-center text-gray-500 min-h-screen">
        Loading product details...
      </p>
    );
  }

  if (!product) {
    return <p className="text-center text-red-500">Product not found!</p>;
  }

  return (
    <div className="container mx-auto px-4 py-6 min-h-screen">
      {/* Product Content */}
      <div className="flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto bg-base-300 shadow-md rounded-xl overflow-hidden p-4 md:p-6">
        <div className="flex-1 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-full max-w-sm h-auto object-contain rounded-xl"
          />
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-base-content">
              {product.title}
            </h2>
            <p className="text-sm text-base-content/70 mt-1">
              {product.category}
            </p>
            <p className="mt-2 mb-4 text-xl font-semibold text-green-600">
              ₹{product.price}
            </p>

            <h3 className="font-semibold mb-1 text-base-content">
              Description
            </h3>
            <p className="text-sm text-base-content">{product.description}</p>
          </div>

          <div className="mt-6">
            <button
              className="btn btn-primary w-full h-10 rounded-lg"
              onClick={() => setShowContact(!showContact)}
            >
              Contact Seller - {product.seller.name}
            </button>

            {showContact && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 p-4 border border-gray-200 rounded-xl bg-gray-50 shadow-sm"
              >
                <h3 className="text-lg text-black font-semibold mb-2">
                  Seller Contact Info
                </h3>
                <div className="space-y-1 text-sm text-gray-700">
                  <p>
                    <span className="font-medium">Name:</span>{" "}
                    {product.seller.name}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span>{" "}
                    {product.seller.email}
                  </p>
                  <p>
                    <span className="font-medium">Phone:</span>{" "}
                    {product.seller.phone}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-center mb-6">
          {otherProducts?.length === 0
            ? "No related products"
            : "Related Products"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {otherProducts?.map((product) => (
            <RelatedProducts key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
