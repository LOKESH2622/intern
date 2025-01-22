import UserModel from "../DataModels/usermodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "YourSecretKey";
const COOKIE_NAME = "Lokesh";

export const login = async (req, res) => {
  const { EmailId, Password } = req.body;

  if (!EmailId || !Password) {
    return res.status(400).json({ message: `Email Id or Password missing` });
  }

  try {
    const user = await UserModel.findOne({ emailid:EmailId });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(Password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ email: user.emailid, id: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error in login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};