import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaHeart } from "react-icons/fa"; 

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [likedBlogs, setLikedBlogs] = useState({}); 
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blogList");
      const blogsWithImages = await Promise.all(
        res.data.blogs.map(async (blog) => {
          if (blog.image) {
            const imageRes = await axios.get(`http://localhost:5000/api/blogs/image/${blog._id}`, {
              responseType: "blob",
            });
            const imageUrl = URL.createObjectURL(imageRes.data);
            return { ...blog, imageUrl };
          }
          return blog;
        })
      );

      setBlogs(blogsWithImages);
      const userId = localStorage.getItem("userId");
      const initialLikedState = {};
      blogsWithImages.forEach((blog) => {
        initialLikedState[blog._id] = blog.likes?.includes(userId);
      });
      setLikedBlogs(initialLikedState);

    } catch (err) {
      console.error("Error fetching blogs:", err);
      toast.error("Error fetching blogs.");
    }
  };

  const deleteBlog = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete/${id}`);
      setBlogs(blogs.filter((blog) => blog._id !== id));
      toast.success("Blog deleted successfully!");
    } catch (err) {
      console.error("Error deleting blog:", err);
      toast.error("Error deleting blog. Please try again.");
    }
  };

  const handleCommentClick = (id) => {
    navigate(`/CommentSection/${id}`); 
  };
  

  const handleLike = async (id) => {
    const userId = localStorage.getItem("email"); 
  
    if (!userId) {
      toast.error("User not logged in");
      return;
    }

    try {
      const blog = blogs.find((b) => b._id === id);
      const isLiked = likedBlogs[id]; 
      const newLikes = isLiked
        ? blog.likes.filter((user) => user !== userId)
        : [...(blog.likes || []), userId]; 
      const res = await axios.post(`http://localhost:5000/api/blogs/like/${id}`, {
        userId,
        likes: newLikes,
      });

      console.log("Like Response:", res.data);
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === id ? { ...blog, likes: res.data.likes } : blog
        )
      );

      setLikedBlogs((prevLiked) => ({
        ...prevLiked,
        [id]: !isLiked, 
      }));

    } catch (err) {
      console.error("Error liking blog:", err.response?.data || err.message);
      toast.error("Error liking blog. Please try again.");
    }
  };

  return (
    <div className="bg-blue-100 py-6 px-4 min-h-screen flex flex-col items-center">
      <ToastContainer position="top-center" autoClose={2000} />

      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Blogs</h1>

      {blogs.length === 0 ? (
        <p className="text-center text-blue-600">No blogs are posted yet.</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog._id} className="bg-white p-6 mt-4 rounded-lg shadow-md max-w-xl w-full mx-auto">
            <h2 className="text-2xl font-semibold text-blue-800">{blog.title}</h2>
            <p className="text-gray-700 mt-2">{blog.content}</p>

            {blog.imageUrl && (
              <img
                src={blog.imageUrl}
                alt="blog"
                className="mt-4 w-full h-48 object-cover rounded-lg"
              />
            )}

            <div className="mt-4 flex justify-between items-center">
              <div className="flex items-center">
                <span className="mr-2 text-gray-600">Likes: {blog.likes?.length || 0}</span>
                
      
                <button onClick={() => handleLike(blog._id)} className="focus:outline-none">
                  <FaHeart
                    size={24}
                    className={`transition-all duration-300 ${likedBlogs[blog._id] ? "text-red-500" : "text-gray-400"}`}
                  />
                </button>
              </div>

              <div>
                <button
                  onClick={() => handleCommentClick(blog._id)}
                  className="text-gray-600 hover:underline"
                >
                  Comments: {blog.comments?.length || 0}
                </button>
              </div>
            </div>

            <div className="mt-4">
              {blog.comments && blog.comments.length > 0 ? (
                blog.comments.map((comment, index) => (
                  <div key={index} className="border-t-2 pt-2 mt-2 text-sm">
                    <p className="font-semibold">
                      {comment.userId.firstname} {comment.userId.lastname}:
                    </p>
                    <p>{comment.text}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 mt-2">No comments yet.</p>
              )}
            </div>

            <div className="mt-4 flex justify-between items-center">
              <Link to={`/edit/${blog._id}`} className="text-blue-500 hover:text-blue-700">
                Edit
              </Link>
              <button
                onClick={() => deleteBlog(blog._id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BlogList;
