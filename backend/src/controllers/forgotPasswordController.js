import crypto from "crypto";
import sendEmail from "../lib/sendEmail.js";
import User from "../models/User.js";

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found!" });

  const token = crypto.randomBytes(32).toString("hex");
  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 mins
  await user.save();

  const resetURL = `http://localhost:5173/reset-password/${token}`;

  await sendEmail({
    to: user.email,
    subject: "Reset your password",
    html: ` <p>
        Click <a href="${resetURL}">here</a> to reset your password. This link
        expires in 15 minutes.
      </p>`,
  });

  res.json({ message: "Password reset link sent to your email." });
};
