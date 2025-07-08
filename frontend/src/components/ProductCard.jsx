import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-base-300 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-45 object-contain"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold">{product.title}</h3>
        <p className="text-base-content/70 text-sm">{product.category}</p>
        <div className="flex justify-between">
          <p className="text-green-600 font-medium mt-3">
            <span className="text-base-content">Price -</span> ₹{product.price}
          </p>

          <span className="flex items-center mt-3 gap-0.5">
            <MapPin className="size-5" /> {product.seller?.city}
          </span>
        </div>
        <button
          onClick={() => navigate(`/products/${product._id}`)}
          className="btn btn-primary btn-sm mt-3 w-full"
        >
          View details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
