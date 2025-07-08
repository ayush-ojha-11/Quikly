import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { devtools, persist } from "zustand/middleware";
import toast from "react-hot-toast";

export const useAuthStore = create(
  devtools(
    persist(
      (set) => ({
        authUser: null,
        isCheckingAuth: null,
        isRegistering: false,
        isLoggingIn: false,
        isUpdatingProfile: false,

        register: async (data) => {
          set({ isRegistering: true });

          try {
            const res = await axiosInstance.post("/auth/register", data);
            set({ authUser: res.data });
            toast.success("Account created successfully.");
          } catch (error) {
            toast.error(error.response.data.message);
          } finally {
            set({ isRegistering: false });
          }
        },

        login: async (data) => {
          set({ isLoggingIn: true });
          try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Logged in successfully.");
          } catch (error) {
            toast.error(error.response.data.message);
          } finally {
            set({ isLoggingIn: false });
          }
        },

        logout: async () => {
          try {
            const res = await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success(res.data.message);
          } catch (error) {
            toast.error(error.response?.data?.message);
          }
        },
        changeRole: async (data) => {
          try {
            const res = await axiosInstance.put("/auth/changerole", data);
            console.log(data);
            set({ authUser: res.data });
            toast.success("Role changed successfully.");
          } catch (error) {
            toast.error("Unable to change role!");
            console.log(error.message);
          }
        },
      }),
      { name: "auth-store" }
    )
  )
);
