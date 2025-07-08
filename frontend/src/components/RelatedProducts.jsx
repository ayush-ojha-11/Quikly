import { useNavigate } from "react-router-dom";

const RelatedProducts = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      className="rounded-lg overflow-hidden hover:bg-base-300 duration-300 p-5"
      onClick={() => navigate(`/products/${product._id}`)}
    >
      <img
        src={product.image}
        className="w-full h-40 object-contain m-2 mix-blend-normal"
      />
      <h1 className="text-center">{product.title}</h1>
      <p className="text-center text-green-600">₹{product.price}</p>
    </div>
  );
};
export default RelatedProducts;
