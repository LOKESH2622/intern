import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000");

function CommentSection({ blogId: propBlogId }) {
  const { blogId: paramBlogId } = useParams();
  const blogId = propBlogId || paramBlogId;

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (!blogId) {
      console.error("Error: blogId is undefined or null!");
      return;
    }

    const storedUserId = localStorage.getItem("email");
    console.log("Stored User ID:", storedUserId);

    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      console.error("Error: User ID is missing!");
      return;
    }

    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/comment/${blogId}`);
        console.log("Fetched Comments:", response.data);
        setComments(response.data || []);
      } catch (error) {
        console.error("Error fetching comments:", error.response?.data || error.message);
      }
    };

    fetchComments();

    socket.on("update_comments", (data) => {
      if (data.blogId === blogId) {
        setComments(data.comments);
      }
    });

    return () => {
      socket.off("update_comments");
    };
  }, [blogId]);

  const sendComment = async () => {
    if (!comment.trim()) {
      console.error("Error: Comment cannot be empty!");
      return;
    }

    if (!userId) {
      console.error("Error: User ID is missing!");
      return;
    }

    const newComment = {
      userId,        
      comment,        
      createdAt: new Date().toISOString(),
    };

    console.log("New Comment Data:", newComment);

    try {
      setComments([...comments,newComment])
      const response = await axios.post(
        `http://localhost:5000/comment/${blogId}`,
        newComment
      );
      console.log("Comment Posted Successfullyx:", response.data);
      socket.emit("new_comment", { blogId, ...response.data });
      
      setComment("");
    } catch (error) {
      if (error.response) {
        console.error("Error posting comment:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-6 border border-gray-200">
      <h2 className="text-3xl font-semibold text-gray-800 text-center mb-4">Comments</h2>
      <div className="max-h-96 overflow-y-auto mb-6 p-4 border border-gray-300 rounded-lg space-y-4 bg-gray-50">
        {comments.length > 0 ? (
          comments.map((c, index) => (
            <div key={index} className="bg-white p-4 rounded-md shadow border border-gray-200">
              <div className="text-sm font-medium text-gray-800">
                {c.userName || c.userId || "Anonymous"}{" "}
                <span className="text-gray-500 text-xs ml-2">
                  {new Date(c.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="text-gray-700 mt-1">{c.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center">No comments yet. Be the first to comment!</p>
        )}
      </div>
      <textarea
        className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 placeholder-gray-400 resize-none"
        rows="4"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a comment..."
      />
      <button
        className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-all duration-300"
        onClick={sendComment}
      >
        Post Comment
      </button>
    </div>
  );
}

export default CommentSection;
