import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateToken } from "../lib/utils.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, role, country, state, city, tehsil } =
      req.body;
    if (!name.trim() || !email.trim() || !password.trim()) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    //check if user already exists in the db or not
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "Invalid Credentials" });

    //After passing all checks hash the password and create the user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      country,
      state,
      city,
      tehsil,
    });

    if (newUser) {
      // generate JWT token
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        location: newUser.location,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email.trim() || !password.trim())
      return res.status(400).json({ message: "Both fields are required!" });
    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }
    // if the password is correct, login the user and generate the token
    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.log("Error in login controller ", error.message);
    res.status(500).json({ message: "Internal server error!" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    console.log("Error in authController (logout) ", error.message);
    res.status(500).json({ message: "Internal server error!" });
  }
};
export const changeRole = async (req, res) => {
  try {
    const { phone } = req.body;
    const role = "seller";
    const userId = req.user._id;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role: role, phone: phone },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error in authController (changeRole) ", error.message);
    res.status(500).json({ message: "Internal server error!" });
  }
};
