import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import App from "./App.jsx";
import ProtectedRoute from "./routes/ProtectedRoute";
import "./index.css";

// Lazy imports for route-level components
const Home = lazy(() => import("./pages/Home.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const Products = lazy(() => import("./pages/Products.jsx"));
const PostAd = lazy(() => import("./pages/PostAd.jsx"));
const ProductDetails = lazy(() => import("./pages/ProductDetails.jsx"));
const SellerDashboard = lazy(() => import("./pages/SellerDashboard.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const ContactUs = lazy(() => import("./pages/ContactUs.jsx"));
const EditAd = lazy(() => import("./pages/EditAd.jsx"));

// Admin Pages (lazy)
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout.jsx"));
const AdminHome = lazy(() => import("./pages/admin/AdminHome.jsx"));
const ManageUsers = lazy(() => import("./pages/admin/ManageUsers.jsx"));
const ManageProducts = lazy(() => import("./pages/admin/ManageProducts.jsx"));
const ManageSellers = lazy(() => import("./pages/admin/ManageSellers.jsx"));

// Wrap all routes in Suspense
const withSuspense = (element) => (
  <Suspense
    fallback={<div className="min-h-screen p-10 text-center">Loading...</div>}
  >
    {element}
  </Suspense>
);

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: withSuspense(<Home />) },
      { path: "/login", element: withSuspense(<Login />) },
      { path: "/register", element: withSuspense(<Register />) },
      { path: "/about", element: withSuspense(<About />) },
      { path: "/contact", element: withSuspense(<ContactUs />) },
      { path: "/products", element: withSuspense(<Products />) },
      {
        path: "/post-ad",
        element: <ProtectedRoute role="seller" />,
        children: [{ path: "", element: withSuspense(<PostAd />) }],
      },
      { path: "/products/:id", element: withSuspense(<ProductDetails />) },
      { path: "/seller-dashboard", element: withSuspense(<SellerDashboard />) },
      { path: "/editAd", element: withSuspense(<EditAd />) },
      {
        path: "admin",
        element: <ProtectedRoute role="admin" />,
        children: [
          {
            path: "",
            element: withSuspense(<AdminLayout />),
            children: [
              { path: "", element: withSuspense(<AdminHome />) },
              { path: "users", element: withSuspense(<ManageUsers />) },
              { path: "products", element: withSuspense(<ManageProducts />) },
              { path: "sellers", element: withSuspense(<ManageSellers />) },
            ],
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
