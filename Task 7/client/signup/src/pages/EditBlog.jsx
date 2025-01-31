import { useParams } from "react-router-dom";
import BlogForm from "../components/Blogform";

const EditBlog = () => {
  const { id } = useParams();
  const existingBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
  const blogToEdit = existingBlogs.find((blog) => blog.id.toString() === id);

  const handleUpdate = (updatedBlog) => {
    const updatedBlogs = existingBlogs.map((blog) =>
      blog.id === updatedBlog.id ? updatedBlog : blog
    );
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Edit Blog</h1>
      {blogToEdit ? <BlogForm blog={blogToEdit} handleSubmit={handleUpdate} /> : <p>Blog not found.</p>}
    </div>
  );
};

export default EditBlog;
