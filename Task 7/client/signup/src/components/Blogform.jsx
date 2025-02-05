import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const BlogForm = ({ blog = null }) => {
  const { id } = useParams(); 
  const [title, setTitle] = useState(blog?.title || "");
  const [content, setContent] = useState(blog?.content || "");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(blog?.image || "");
  const navigate = useNavigate();
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    setImagePreview(URL.createObjectURL(selectedImage)); 
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("email");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("userId", email);

    if (image) {
      formData.append("image", image); 
    }

    try {
      if (id) {
        console.log("Updating blog with ID:", id); 
  
        await axios.put(`http://localhost:5000/api/blogs/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await axios.post("http://localhost:5000/api/blogs", formData, {
          
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      navigate("/blogList");
    } catch (err) {
      console.error("Error saving/updating blog:", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-600 p-4">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-4">
          {blog ? "Edit Blog" : "Create Blog"}
        </h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          required
        />
        
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-3 w-full rounded-lg h-40 mt-3 focus:ring-2 focus:ring-blue-400 outline-none"
          required
        />
       
        <input
          type="file"
          onChange={handleImageChange}
          className="mt-3 block w-full text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-white p-2"
        />
        
        {imagePreview && (
          <div className="mt-3">
            <img
              src={imagePreview}
              alt="Preview"
              className="h-32 w-auto object-cover rounded"
            />
          </div>
        )}
        
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 mt-4 w-full rounded-lg font-semibold text-lg transition-all"
        >
          {blog ? "Update" : "Post"}
        </button>
      </form>
    </div>
  );
};

export default BlogForm;




