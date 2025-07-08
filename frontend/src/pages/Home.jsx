import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";
import { User, Star } from "lucide-react";
import { APP_NAME } from "../constants/constants";

const Home = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthStore();

  const categories = [
    { name: "Electronics", icon: "💻" },
    { name: "Vehicles", icon: "🚗" },
    { name: "Real Estate", icon: "🏡" },
    { name: "Fashion", icon: "👕" },
    { name: "Services", icon: "🛠️" },
    { name: "Others", icon: "➕" },
  ];

  const featuredListings = [
    { title: "iPhone 13 Pro", price: "₹90000", img: "/iphone13pro.png" },
    { title: "Harry Potter", price: "₹35000", img: "/hp.jpg" },
    { title: "MacBook Pro M1", price: "₹100000", img: "/mpm1.png" },
    { title: "Apache 160 4v", price: "₹65000", img: "/bike.png" },
  ];

  const testimonials = [
    {
      name: "Aryan",
      review: "Quikly helped me sell my car in 2 days!",
      rating: 5,
    },
    {
      name: "Smith",
      review: "Great platform to buy second-hand gadgets.",
      rating: 4,
    },
  ];

  useEffect(() => {
    if (authUser) navigate("/products");
  }, [authUser, navigate]);

  return (
    <div className="min-h-screen text-base-content">
      {/* 🎯 Hero Section */}
      <header className="text-center py-16 px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          Buy & Sell Anything, Anytime!
          <br />
          <span className="bg-gradient-to-r from-pink-500 via-indigo-600 to-pink-500 bg-clip-text text-transparent">
            with {APP_NAME}
          </span>
        </h1>
        <div className="mt-6 flex justify-center">
          <button
            className="bg-primary hover:bg-primary/75 cursor-pointer transition px-6 py-3 text-white rounded-lg flex items-center gap-2 shadow-lg"
            onClick={() => navigate("/login")}
          >
            <User size={18} /> Get Started
          </button>
        </div>
      </header>

      {/* 🛒 Categories */}
      <section className="text-center py-12 px-4">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8">
          Explore Categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="bg-base-200 p-6 rounded-xl shadow hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-center"
            >
              <div className="text-5xl sm:text-6xl">{cat.icon}</div>
              <p className="mt-3 text-base font-semibold sm:text-lg">
                {cat.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 🔥 Featured Listings */}
      <section className="text-center py-12 px-4">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">
          Featured Listings
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {featuredListings.map((product, index) => (
            <div
              key={index}
              className="bg-base-200 p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={product.img}
                alt={product.title}
                className="w-full h-40 object-contain rounded"
              />
              <h3 className="text-lg mt-3 font-semibold">{product.title}</h3>
              <p className="text-green-600 font-bold">{product.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ How It Works */}
      <section className="text-center py-12 px-4">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "1️⃣ Create an Account",
              desc: "Sign up and start posting ads.",
            },
            {
              title: "2️⃣ Post Your Ad",
              desc: "Add images and details to attract buyers.",
            },
            {
              title: "3️⃣ Get Buyers & Sell Fast!",
              desc: "Negotiate and complete transactions securely.",
            },
          ].map((step, i) => (
            <div key={i} className="bg-base-200 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 💬 Testimonials */}
      <section className="text-center py-12 px-4 bg-base-200">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {testimonials.map((user, index) => (
            <div key={index} className="p-6 bg-base-100 rounded-lg shadow">
              <p className="text-lg italic">"{user.review}"</p>
              <div className="flex justify-center mt-2 text-yellow-500">
                {Array.from({ length: user.rating }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" stroke="none" />
                ))}
              </div>
              <h3 className="font-semibold mt-2">{user.name}</h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
