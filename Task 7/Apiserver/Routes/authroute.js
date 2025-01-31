import express from "express";
import { Signup} from "../Controllers/signupcontroller.js"; 
import {login} from "../Controllers/Login.js";
import { VerifyOtp } from "../Controllers/otpverified.js";
const authRoute = express.Router();

authRoute.use("/auth/signup", Signup); 
authRoute.use("/auth/login", login);
authRoute.use("/auth/verify-otp", VerifyOtp);
export default authRoute;


