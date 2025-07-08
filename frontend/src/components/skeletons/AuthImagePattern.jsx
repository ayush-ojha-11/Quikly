const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="max-w-md text-center">
        {/* Animated Grid Pattern */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`w-8 h-8 rounded-lg ${
                i % 3 === 0
                  ? "bg-primary animate-bounce"
                  : "bg-secondary animate-pulse"
              }`}
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>

        <h2 className="text-2xl font-bold text-primary mb-4">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
