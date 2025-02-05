import Blog from "../DataModels/post.js";
import User from "../DataModels/usermodel.js";
import mongoose from "mongoose";


export const likeBlog = async (req, res) => {
  const blogId = req.params.id;
  const userEmail = req.body.userId; 

  if (!userEmail) {
    return res.status(400).json({ message: "User email is required" });
  }

  try {    
    const user = await User.findOne({ emailid: userEmail });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userId = user._id; 
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    const likeIndex = blog.likes.findIndex((id) => id.toString() === userId.toString());

    if (likeIndex !== -1) {
      blog.likes.splice(likeIndex, 1);
    } else {
      blog.likes.push(new mongoose.Types.ObjectId(userId)); 
    }
    await blog.save();
    res.status(200).json({ message: "Like updated successfully!", likes: blog.likes });
  } catch (error) {
    console.error("Error liking blog:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getBlogImage = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog || !blog.image) {
      return res.status(404).json({ message: "Image not found." });
    }

    res.set("Content-Type", blog.image.contentType); 
    res.send(blog.image.data); 
  } catch (err) {
    res.status(500).json({ message: "Error fetching image." });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    const blogsWithImages = blogs.map((blog) => ({
      ...blog._doc,
      image: blog.image ? `/api/blogs/image/${blog._id}` : null, 
    }));

    res.status(200).json({ blogs: blogsWithImages });
  } catch (err) {
    res.status(500).json({ message: "Error fetching blogs." });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("userId", "firstname lastname emailid")
      .populate("comments.userId", "firstname lastname")
      .populate("likes", "firstname lastname");

    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }

    const blogWithImage = {
      ...blog._doc,
      image: blog.image
        ? `data:${blog.image.contentType};base64,${blog.image.data.toString("base64")}`
        : null,
    };

    res.status(200).json(blogWithImage);
  } catch (err) {
    res.status(500).json({ message: "Error fetching blog." });
  }
};


export const createBlog = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);

   
    const user = await User.findOne({ emailid: req.body.userId });

    if (!user) {
      console.log("User not found with email:", req.body.userId);
      return res.status(400).json({ message: "User not found." });
    }
    const userId = user._id;

    // Create the blog
    const blog = new Blog({
      userId: userId,
      title: req.body.title,
      content: req.body.content,
      image: req.file
        ? { data: req.file.buffer, contentType: req.file.mimetype }
        : null,
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    console.error("Error creating blog:", err);
    res.status(500).json({ message: "Error creating blog.", error: err.message });
  }
};


// Delete a blog
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }
    res.status(200).json({ message: "Blog deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Error deleting blog." });
  }
};

export const updateBlog = async (req, res) => {
  console.log("sjdfn")
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }

    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content;

    if (req.file) {
      blog.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    await blog.save();
    res.status(200).json(blog);
  } catch (err) {
    console.error("Error updating blog:", err);
    res.status(500).json({ message: "Error updating blog.", error: err.message });
  }
};
