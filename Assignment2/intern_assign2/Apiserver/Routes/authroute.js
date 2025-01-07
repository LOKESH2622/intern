import express from "express";
import { validation } from "../Controllers/validationcontroller.js"; 

const authRoute = express.Router();

authRoute.get("/validation", validation); 

export default authRoute;
