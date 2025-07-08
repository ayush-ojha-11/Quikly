import jwt from "jsonwebtoken";
export const generateToken = (userId, res) => {
  const isProduction = process.env.NODE_ENV === "production";
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  // sending jwt in a cookie
  res.cookie("jwt", token, {
    maxAge: 1 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: isProduction ? "none" : "lax",
    secure: isProduction,
  });

  return token;
};
