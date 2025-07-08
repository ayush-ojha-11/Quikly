import { useNavigate } from "react-router-dom";
const About = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen px-4 py-12 sm:px-8 md:px-16 lg:px-32">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-primary">
          About Quikly
        </h1>
        <p className="text-lg text-center text-base-content mb-12">
          Quikly is your trusted online marketplace — built to help individuals
          and businesses buy, sell, and explore products effortlessly.
        </p>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Who We Are
          </h2>
          <p className="text-base-content leading-relaxed">
            At Quikly, we're on a mission to simplify online commerce. Whether
            you're looking to sell your used items, discover local deals, or
            connect with buyers across different locations — our platform is
            designed to make it seamless, secure, and efficient.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Why Choose Quikly?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "User-Friendly Experience",
              "Secure & Trusted",
              "Location-Based Filters",
              "Responsive Across Devices",
              "Seller Dashboard & Tools",
              "Quick Support & Helpdesk",
            ].map((item, index) => (
              <div
                key={index}
                className="bg-base-300 rounded-xl p-5 shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-lg font-medium text-primary mb-2">
                  {item}
                </h3>
                <p className="text-base-content text-sm">
                  {item === "User-Friendly Experience"
                    ? "Navigate easily with a clean interface tailored for all users."
                    : item === "Secure & Trusted"
                    ? "Your data and listings are safe with robust security protocols."
                    : item === "Location-Based Filters"
                    ? "Browse or list products based on your tehsil, district, or state."
                    : item === "Responsive Across Devices"
                    ? "Seamlessly accessible on mobile, tablet, and desktop."
                    : item === "Seller Dashboard & Tools"
                    ? "Effortlessly manage ads, edit listings, and track activity."
                    : "Our support team is available to assist you at every step."}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center mt-20">
          <h2 className="text-2xl font-semibold mb-4">
            Join the Quikly Community
          </h2>
          <p className="text-base-content max-w-3xl mx-auto mb-6">
            From pre-owned gadgets to local services and everything in between —
            Quikly is your go-to platform to connect, trade, and grow. Start
            exploring now and experience the smarter way to buy and sell!
          </p>
          <button
            className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition"
            onClick={() => navigate("/products")}
          >
            Start Browsing
          </button>
        </section>
      </div>
    </div>
  );
};

export default About;
