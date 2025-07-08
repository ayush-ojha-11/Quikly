import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";
import { useAdminStore } from "../store/useAdminStore.js";
import { Search } from "lucide-react";

import Skeleton from "../components/skeletons/Skeleton";
import ProductCard from "../components/ProductCard";
import CategoryBar from "../components/CategoryBar.jsx";
import { axiosInstance } from "../lib/axios.js";

const Products = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthStore();
  const { allProducts, isLoading, fetchProducts } = useAdminStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  // Load countries from backend on mount
  useEffect(() => {
    const loadCountries = async () => {
      try {
        const { data } = await axiosInstance.get("/location/countries");
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    loadCountries();
  }, []);

  // Redirect if not logged in
  useEffect(() => {
    if (!authUser) navigate("/login");
  }, [authUser, navigate]);

  // Fetch products if not already present
  useEffect(() => {
    if (!allProducts) fetchProducts();
  }, [allProducts, fetchProducts]);

  const handleCountryChange = async (isoCode) => {
    if (!isoCode) {
      setSelectedCountry("");
      setSelectedState("");
      setSelectedCity("");
      setStates([]);
      setCities([]);
      return;
    }

    try {
      const { data } = await axiosInstance.get(`/location/states/${isoCode}`);
      setStates(data);
      setSelectedCountry(isoCode);
      setSelectedState("");
      setSelectedCity("");
      setCities([]);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const handleStateChange = async (isoCode) => {
    if (!isoCode) {
      setSelectedState("");
      setSelectedCity("");
      setCities([]);
      return;
    }

    try {
      const { data } = await axiosInstance.get(
        `/location/cities/${selectedCountry}/${isoCode}`
      );
      setCities(data);
      setSelectedState(isoCode);
      setSelectedCity("");
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleCityChange = (cityName) => {
    setSelectedCity(cityName || "");
  };

  // Filtering logic
  let filteredProducts = allProducts || [];

  if (activeCategory !== "All") {
    filteredProducts = filteredProducts.filter(
      (p) => p.category?.toLowerCase() === activeCategory.toLowerCase()
    );
  }

  if (selectedCountry) {
    filteredProducts = filteredProducts.filter(
      (p) => p.seller?.country?.toLowerCase() === selectedCountry.toLowerCase()
    );
  }

  if (selectedState) {
    filteredProducts = filteredProducts.filter(
      (p) => p.seller?.state?.toLowerCase() === selectedState.toLowerCase()
    );
  }

  if (selectedCity) {
    filteredProducts = filteredProducts.filter(
      (p) => p.seller?.city?.toLowerCase() === selectedCity.toLowerCase()
    );
  }

  if (searchQuery.trim()) {
    filteredProducts = filteredProducts.filter((p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  return (
    <div className="container mx-auto p-4 min-h-screen">
      {/* Search & Filters */}
      <div className="sm:grid grid-cols-2 items-center gap-4 space-y-4 sm:space-y-0">
        {/* Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center">
            <Search className="size-5" />
          </div>
          <input
            type="text"
            placeholder="Search products..."
            className="input input-bordered w-full pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Location Filters */}
        <div className="grid grid-cols-3 gap-4">
          {/* Country */}
          <select
            className="select select-bordered"
            value={selectedCountry}
            onChange={(e) => handleCountryChange(e.target.value)}
          >
            <option value="">Country</option>
            {countries.map((c) => (
              <option key={c.isoCode} value={c.isoCode}>
                {c.name}
              </option>
            ))}
          </select>

          {/* State */}
          <select
            className="select select-bordered"
            value={selectedState}
            onChange={(e) => handleStateChange(e.target.value)}
            disabled={!selectedCountry}
          >
            <option value="">State</option>
            {states?.map((s) => (
              <option key={s.isoCode} value={s.isoCode}>
                {s.name}
              </option>
            ))}
          </select>

          {/* City */}
          <select
            className="select select-bordered"
            value={selectedCity}
            onChange={(e) => handleCityChange(e.target.value)}
            disabled={!selectedState}
          >
            <option value="">City</option>
            {cities?.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category Filter */}
      <CategoryBar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* Product Listing */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} classname="w-full h-64 rounded-lg bg-base-200" />
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="mt-10 text-center">
          <h1 className="text-xl font-semibold">No Ads/Products found</h1>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
