import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { devtools } from "zustand/middleware";

import toast from "react-hot-toast";
export const useAdminStore = create(
  devtools(
    (set, get) => ({
      stats: null,
      loading: false,
      sellers: null,
      users: null,
      allProducts: null,
      productsOfASeller: null,
      isLoading: false,
      isUpdating: false,
      isDeleting: false,
      otherProducts: null,
      currentPage: 1,
      totalPages: null,

      // anyone can access
      fetchProducts: async () => {
        set({ isLoading: true });
        try {
          const { data } = await axiosInstance.get("/products");
          set({ allProducts: data });
        } catch {
          toast.error("Error fetching products!");
        } finally {
          set({ isLoading: false });
        }
      },
      // anyone
      fetchOtherProducts: async (product) => {
        try {
          const { data } = await axiosInstance.get("/products");
          set({
            otherProducts: data
              .filter(
                (item) =>
                  item.category === product.category && item._id !== product._id
              )
              .slice(0, 6), // show only top 5 related products
          });
        } catch {
          console.log("Failed to load other products!");
        }
      },
      // seller or admin
      fetchProductsOfSeller: async () => {
        try {
          set({ isLoading: true });
          const { data } = await axiosInstance.get("products/seller/products");
          console.log(data);
          set({ productsOfASeller: data });
        } catch {
          toast.error("Error in fetching seller products!");
        } finally {
          set({ isLoading: false });
        }
      },
      // seller or admin
      deleteAProduct: async (productId) => {
        try {
          set({ isDeleting: true });
          const res = await axiosInstance.delete(`/products/${productId}`);
          toast.success(res.data.message);

          set((state) => {
            const updatedProducts = (state.allProducts || []).filter(
              (item) => item._id !== productId
            );
            const updatedSellerProducts = (
              state.productsOfASeller || []
            ).filter((item) => item._id !== productId);
            console.log("Updated allProducts after deletion:", updatedProducts);
            return {
              allProducts: updatedProducts,
              productsOfASeller: updatedSellerProducts,
            };
          });
        } catch (error) {
          console.log(
            "Error in useProductStore (deleteAProduct)",
            error.message
          );
        } finally {
          set({ isDeleting: false });
        }
      },
      // seller only
      updateProduct: async (product, formDataObj) => {
        try {
          set({ isUpdating: true });
          const { data: updatedProduct } = await axiosInstance.put(
            `/products/${product._id}`,
            formDataObj
          );
          if (updatedProduct) {
            toast.success("Edited successfully.");

            // Now updating the store with new product data

            set((state) => {
              const updateList = (list) =>
                list?.map((item) =>
                  item._id === updatedProduct._id ? updatedProduct : item
                );

              return {
                allProducts: updateList(state.allProducts),
                productsOfASeller: updateList(state.productsOfASeller),
              };
            });
          }
        } catch (error) {
          console.log(
            "Error in useProductStore (updateProduct)",
            error.message
          );
          toast.error("Editing failed!");
        } finally {
          set({ isUpdating: false });
        }
      },

      // all the functions below are only for admin access
      fetchAdminStats: async () => {
        set({ loading: true });
        try {
          const { data } = await axiosInstance.get("/admin/stats");
          set({ stats: data });
        } catch (error) {
          toast.error(error.response?.data?.message);
        } finally {
          set({ loading: false });
        }
      },

      fetchUsers: async () => {
        try {
          set({ loading: true });
          const { data } = await axiosInstance.get("/admin/users");
          set({ users: data });
        } catch (error) {
          toast.error(error.response.data.message);
        } finally {
          set({ loading: false });
        }
      },

      fetchSellers: async () => {
        try {
          set({ loading: true });
          const { data } = await axiosInstance.get("/admin/sellers");
          set({ sellers: data });
        } catch (error) {
          toast.error(error.response.data.message);
        } finally {
          set({ loading: false });
        }
      },
      deleteUser: async (currentUser) => {
        try {
          set({ loading: true });
          // ✅ Remove products of deleted seller (from local store)
          if (currentUser.role === "seller") {
            get().deleteProductsOfSeller(currentUser._id);

            const updatedProducts = (get().allProducts || []).filter(
              (product) =>
                (typeof product.seller === "string"
                  ? product.seller
                  : product.seller?._id
                )?.toString() !== currentUser._id.toString()
            );
            set({
              allProducts: updatedProducts,
            });
            console.log(updatedProducts);
          }

          // delete user from database
          const res = await axiosInstance.delete(
            `/admin/users/${currentUser._id}`
          );
          toast.success(res.data.message);

          // update users locally in the store
          const updatedUsers = get().users?.filter(
            (user) => user._id !== currentUser._id
          );
          const updatedSellers = get().sellers?.filter(
            (seller) => seller._id !== currentUser._id
          );

          set({
            users: updatedUsers,
            sellers: updatedSellers,
          });

          //refetch stats after deletion
          await get().fetchAdminStats();
        } catch (error) {
          toast.error(error?.response?.data?.message);
        } finally {
          set({ loading: false });
        }
      },
      deleteProductsOfSeller: async (id) => {
        try {
          const res = await axiosInstance.delete(`/admin/seller/${id}`);
          toast.success(res.data.message);
        } catch (error) {
          toast.error(error.response.data.message);
        }
      },
      fetchPaginatedProducts: async (page = 1, limit = 10) => {
        set({ isLoading: true });
        try {
          const { data } = await axiosInstance.get(
            `/products?page=${page}&limit=${limit}`
          );
          set((state) => ({
            allProducts: [...(state.allProducts || []), ...data.products],
            totalPages: data.totalPages,
            currentPage: data.currentPage,
          }));
        } catch {
          toast.error("Error fetching paginated products!");
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    { name: "central-store" }
  )
);
