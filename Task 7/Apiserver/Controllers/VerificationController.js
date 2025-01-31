import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your secret key";
const COOKIE_NAME = "Lokesh";

export const authenticate = async (req, res) => {
    try {
        const token = req.cookies[COOKIE_NAME];

        if(!token){
            return res.status(401).json({message: "Unautorized token"});
        }

        const decode = jwt.verify(token, JWT_SECRET);
        res.user = decode;
        next();
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

export const userData = async (req, res) => {
    try {
        const token = req.cookies[COOKIE_NAME];

        if(!token){
            return res.status(401).json({message: "Unautorized token"});
        }

        const decode = jwt.verify(token, JWT_SECRET);
        req.user = decode;
        
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}