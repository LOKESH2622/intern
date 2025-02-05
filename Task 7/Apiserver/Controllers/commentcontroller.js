import isEmail from "validator/lib/isEmail.js";
import Blog from "../DataModels/post.js";
import mongoose from "mongoose";
export const getComments = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId).select("comments");

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.status(200).json(blog.comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const addComment = async (req, res) => {
      const { blogId } = req.params;
      const { userId, comment } = req.body;
  
      if (!mongoose.Types.ObjectId.isValid(blogId)) {
        return res.status(400).json({ error: "Invalid blog ID" });
      }
  
      if (!isEmail(userId)) {  
        return res.status(400).json({ error: "Invalid user ID (email format)" });
      }
  
      if (!comment || !comment.trim()) {
        return res.status(400).json({ error: "Comment cannot be empty" });
      }
  
      const blog = await Blog.findById(blogId);
      if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
      }
  
      const newComment = {
        userId,
        comment,
        createdAt: new Date().toISOString(),
      };
  
      blog.comments.push(newComment);
      await blog.save();
  
      res.status(201).json(newComment);

  };
export const setupSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("new_comment", async (data) => {
      const { blogId, userId, comment } = data;

      try {
        const blog = await Blog.findById(blogId);
        if (!blog) {
          console.error("Blog not found for Socket comment");
          return;
        }

        const newComment = {
          userId,
          comment,
          createdAt: new Date().toISOString(),
        };

        blog.comments.push(newComment);
        await blog.save();

        io.emit("update_comments", { blogId, comments: blog.comments });
      } catch (error) {
        console.error("Error saving comment:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};
