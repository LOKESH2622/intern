import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET; 
const COOKIE_NAME = "Lokesh"; 
export const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies[COOKIE_NAME];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized token" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Error:", error);
    return res.status(401).json({ message: "Unauthorized access" });
  }
};

export const userData = async (req, res) => {
  try {
    const token = req.cookies[COOKIE_NAME];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized token" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    res.json(decoded); // Ensure this matches the expected frontend format
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
