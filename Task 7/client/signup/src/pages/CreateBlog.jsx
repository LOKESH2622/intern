import BlogForm from "../components/Blogform";
const CreateBlog = () => {
  const handleSubmit = (blog) => {
    const existingBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    localStorage.setItem("blogs", JSON.stringify([...existingBlogs, blog]));
  };

  return (
    <div>
    
  <h1 className="text-2xl font-bold text-center">Create Blog</h1>


      <BlogForm handleSubmit={handleSubmit} />
    </div>
  );
};

export default CreateBlog;
