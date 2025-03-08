import User from "../models/User.js";
import dotenv from "dotenv";
import generateToken from "../utils/generateToken.js";

dotenv.config();

// Register
export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already registered",
        data: null,
        error: null,
      });
    }

    const user = await User.create({ email, password });

    if (user) {
      const username = email.split("@")[0];

      res.status(201).json({
        success: true,
        message: `${username} is registered successfully!`,
        data: {
          email: user.email,
        },
        error: null,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid user data",
        data: null,
        error: null,
      });
    }
  } catch (error) {
    let errorMessage = "Server error";

    if (error.name === "ValidationError") {
      errorMessage = Object.values(error.errors)
        .map((err) => err.message)
        .join(", ");
    } else if (error.message) {
      errorMessage = error.message;
    }

    res.status(500).json({
      success: false,
      message: errorMessage,
      data: null,
      error: {
        message: error.message,
      },
    });
  }
};

// Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        success: true,
        message: "User is logged in successfully!",
        data: {
          email: user.email,
          token: generateToken(user._id),
        },
        error: null,
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid credentials",
        data: null,
        error: null,
      });
    }
  } catch (error) {
    console.error("Error during login:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
      data: null,
      error: {
        message: error.message,
      },
    });
  }
};
