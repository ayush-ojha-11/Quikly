import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";
import { Eye, EyeOff, Lock, Loader2, User2, Mail, MapPin } from "lucide-react";
import toast from "react-hot-toast";
import AuthImagePattern from "../components/skeletons/AuthImagePattern.jsx";
import { axiosInstance } from "../lib/axios.js";

const Register = () => {
  const navigate = useNavigate();
  const { register, isRegistering, authUser } = useAuthStore();

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    country: "",
    state: "",
    city: "",
    tehsil: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  // 🔐 Redirect if already logged in
  useEffect(() => {
    if (authUser) navigate("/");
  }, [authUser, navigate]);

  // 🌐 Fetch countries on mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const { data } = await axiosInstance.get("/location/countries");
        setCountries(data);
      } catch {
        toast.error("Failed to load countries");
      }
    };

    fetchCountries();
  }, []);

  // 🌍 Handle country selection
  const handleCountryChange = async (isoCode) => {
    setSelectedCountry(isoCode);
    console.log(isoCode);

    setFormData({ ...formData, country: isoCode, state: "", city: "" });
    setStates([]);
    setCities([]);
    setSelectedState(null);

    try {
      const { data } = await axiosInstance.get(`/location/states/${isoCode}`);
      setStates(data);
    } catch {
      toast.error("Failed to load states");
    }
  };

  // 🏙 Handle state selection
  const handleStateChange = async (isoCode) => {
    setSelectedState(isoCode);
    setFormData({ ...formData, state: isoCode, city: "" });
    setCities([]);

    try {
      const { data } = await axiosInstance.get(
        `/location/cities/${selectedCountry}/${isoCode}`
      );
      setCities(data);
    } catch {
      toast.error("Failed to load cities");
    }
  };

  // ✅ Form validation
  const validateForm = () => {
    const { name, email, password, country, state, city } = formData;

    if (!name || !email || !password || !country || !state || !city) {
      toast.error("All fields are required");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Invalid email format");
      return false;
    }

    return true;
  };

  // 📩 Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      register(formData);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Panel */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center transition-colors group-hover:bg-primary/20">
                <User2 className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">Get Started with us</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              label="Name"
              icon={<User2 className="size-5" />}
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter your name"
            />

            <InputField
              label="Email"
              icon={<Mail className="size-5" />}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Enter your email"
            />

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute flex inset-y-0 left-3 items-center z-10">
                  <Lock className="size-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  className="input input-bordered w-full pl-10"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <Eye className="size-5 text-base-content/40" />
                  ) : (
                    <EyeOff className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            {/* Location Dropdowns */}
            <div className="grid grid-cols-3 gap-4">
              <select
                className="select select-bordered"
                onChange={(e) => handleCountryChange(e.target.value)}
                value={formData.country}
              >
                <option value="">Country</option>
                {countries.map((c) => (
                  <option key={c.isoCode} value={c.isoCode}>
                    {c.name}
                  </option>
                ))}
              </select>

              <select
                className="select select-bordered"
                onChange={(e) => handleStateChange(e.target.value)}
                value={formData.state}
                disabled={!selectedCountry}
              >
                <option value="">State</option>
                {states.map((s) => (
                  <option key={s.isoCode} value={s.isoCode}>
                    {s.name}
                  </option>
                ))}
              </select>

              <select
                className="select select-bordered"
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                value={formData.city}
                disabled={!selectedState}
              >
                <option value="">City</option>
                {cities.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Tehsil */}
            <InputField
              label="Tehsil"
              icon={<MapPin className="size-5" />}
              value={formData.tehsil}
              onChange={(e) =>
                setFormData({ ...formData, tehsil: e.target.value })
              }
              placeholder="Tehsil"
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isRegistering}
            >
              {isRegistering ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <AuthImagePattern
        title={"Buy. Sell. Connect"}
        subtitle={"Buy. Sell. Connect. – Your Marketplace, Your Deals!"}
      />
    </div>
  );
};

// 🔧 InputField Component
const InputField = ({ label, icon, value, onChange, placeholder }) => (
  <div className="form-control">
    <label className="label">
      <span className="label-text font-medium">{label}</span>
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-3 flex items-center z-10">
        {icon}
      </div>
      <input
        type="text"
        className="input input-bordered w-full pl-10 relative"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  </div>
);

export default Register;
