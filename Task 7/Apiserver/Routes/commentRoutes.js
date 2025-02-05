import express from "express";
import { getComments, addComment } from "../Controllers/commentcontroller.js";

const commentroute = express.Router();

commentroute.get("/:blogId", getComments);
commentroute.post("/:blogId", addComment);

export default commentroute;
 