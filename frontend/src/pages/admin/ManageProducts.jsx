import React, { useEffect } from "react";
import { useAdminStore } from "../../store/useAdminStore";
import ProductCardAdmin from "../../components/ProductCardAdmin";

const ManageProducts = () => {
  const { stats, allProducts, fetchProducts, isLoading } = useAdminStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold">Total products/ads</h2>
      <p className="text-2xl ml-2">{stats?.totalProducts}</p>

      {isLoading ? (
        <p>Loading products/ads...</p>
      ) : !allProducts ? (
        <p>No products/ads</p>
      ) : (
        <div className="mt-5 p-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allProducts.map((product) => (
            <ProductCardAdmin key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
