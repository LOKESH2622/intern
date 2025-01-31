import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blogList"); 
      setBlogs(res.data.blogs);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  const deleteBlog = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete`);
      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };

  return (
    <div className="bg-blue-100 py-6 px-4 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Blogs</h1>
      {blogs.length === 0 ? (
        <p className="text-center text-blue-600">No blogs are posted yet.</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog._id} className="bg-white p-6 mt-4 rounded-lg shadow-md max-w-xl mx-auto">
            <h2 className="text-2xl font-semibold text-blue-800">{blog.title}</h2>
            <p className="text-gray-700 mt-2">{blog.content}</p>
            
            {blog.image && (
              <img
                src={`http://localhost:5000${blog.image}`} // Correct image path
                alt="blog"
                className="mt-4 w-full h-48 object-cover rounded-lg"
              />
            )}
            
            <div className="mt-4 flex justify-between items-center">
              <div className="flex items-center">
                {/* Likes */}
                <span className="mr-2 text-gray-600">Likes: {blog.likes?.length || 0}</span>
                <button className="text-blue-500 hover:text-blue-700">Like</button> {/* You can add functionality to like a blog */}
              </div>
              
              {/* Comments Section */}
              <div>
                <span className="text-gray-600">Comments: {blog.comments?.length || 0}</span>
              </div>
            </div>

            {/* Display Comments */}
            <div className="mt-4">
              {blog.comments && blog.comments.length > 0 ? (
                blog.comments.map((comment, index) => (
                  <div key={index} className="border-t-2 pt-2 mt-2 text-sm">
                    <p className="font-semibold">{comment.userId.firstname} {comment.userId.lastname}:</p>
                    <p>{comment.text}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 mt-2">No comments yet.</p>
              )}
            </div>

            <div className="mt-4 flex justify-between items-center">
              <Link to={`/editBlog/${blog._id}`} className="text-blue-500 hover:text-blue-700">Edit</Link>
              <button onClick={() => deleteBlog(blog._id)} className="text-red-500 hover:text-red-700">Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BlogList;
