import { MapPin, Trash } from "lucide-react";
import { useAdminStore } from "../store/useAdminStore";
import { useState } from "react";
const ProductCardAdmin = ({ product }) => {
  const { deleteAProduct } = useAdminStore();
  const [deletingProductId, setDeletingProductId] = useState(null);

  return (
    <div className="bg-base-300 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-40 object-contain m-2 mix-blend-normal"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold">{product.title}</h3>
        <p className="text-base-content/70 text-sm">
          Seller: {product.seller.name}
        </p>

        <div className="flex justify-between">
          <p className="text-green-600 font-medium mt-3">
            <span className="text-base-content">Price -</span> ₹{product.price}
          </p>

          <span className="flex items-center mt-3 gap-0.5">
            <MapPin className="size-5" /> {product.seller.location}
          </span>
        </div>
        <button
          onClick={async () => {
            setDeletingProductId(product._id);
            await deleteAProduct(product._id); // wait for deletion to complete
            setDeletingProductId(null);
          }}
          disabled={deletingProductId === product._id}
          className="btn btn-outline text-sm mt-3 w-full"
        >
          {deletingProductId === product._id ? (
            "Deleting product..."
          ) : (
            <>
              <Trash className="size-5" /> Delete
            </>
          )}
        </button>
      </div>
    </div>
  );
};
export default ProductCardAdmin;
