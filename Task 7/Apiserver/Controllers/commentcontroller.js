import Blog from "../DataModels/post.js";
import User from "../DataModels/usermodel.js";

// Get all comments for a specific blog post
export const getComments = async (req, res) => {
    try {
        const { blogId } = req.params;
        const blog = await Blog.findById(blogId).select("comments");

        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }

        // Fetch user names for each comment
        const commentsWithUserName = await Promise.all(
            blog.comments.map(async (comment) => {
                const user = await User.findById(comment.userId);
                return {
                    userName: user ? `${user.firstName} ${user.lastName}` : "Anonymous",
                    message: comment.message,
                    timestamp: comment.timestamp,
                };
            })
        );

        res.status(200).json(commentsWithUserName);
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Add a new comment to a blog post (via REST API)
export const addComment = async (req, res) => {
    try {
        const { blogId } = req.params;
        const { userId, message } = req.body;

        if (!userId || !message.trim()) {
            return res.status(400).json({ error: "User ID and message are required" });
        }

        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const newComment = {
            userId,
            userName: `${user.firstName} ${user.lastName}`,
            message,
            timestamp: new Date().toISOString(),
        };

        blog.comments.push(newComment);
        await blog.save();

        res.status(201).json(newComment); // Return the saved comment
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Setup Socket.io for real-time comments
export const setupSocket = (io) => {
    io.on("connection", (socket) => {
        console.log("A user connected");

        // Handle new comments via WebSocket
        socket.on("new_comment", async (data) => {
            const { blogId, userId, message } = data;

            try {
                const blog = await Blog.findById(blogId);
                if (!blog) return;

                const user = await User.findById(userId);
                if (!user) return;

                const newComment = {
                    userId,
                    userName: `${user.firstName} ${user.lastName}`,
                    message,
                    timestamp: new Date().toISOString(),
                };

                blog.comments.push(newComment);
                await blog.save();

                // Emit updated comments to all clients
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
