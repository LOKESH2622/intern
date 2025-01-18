import express from "express";
import { Signup} from "../Controllers/signupcontroller.js"; 

const authRoute = express.Router();

authRoute.post("/auth/signup", Signup); 

export default authRoute;
