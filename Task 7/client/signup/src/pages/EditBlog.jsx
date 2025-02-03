import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BlogForm from "../components/Blogform";
import axios from "axios";

const EditBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/blogs/${id}`)
      .then((response) => setBlog(response.data))
      .catch((err) => console.error("Error fetching blog:", err));
  }, [id]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-center">Edit Blog</h1>
      {blog ? <BlogForm blog={blog} /> : <p>Loading...</p>}
    </div>
  );
};

export default EditBlog;
