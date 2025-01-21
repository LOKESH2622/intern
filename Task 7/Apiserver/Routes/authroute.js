import express from "express";
import { Signup} from "../Controllers/signupcontroller.js"; 
import {login} from "../Controllers/Login.js";
const authRoute = express.Router();

authRoute.use("/auth/signup", Signup); 
authRoute.use("/auth/login", login);
export default authRoute;
