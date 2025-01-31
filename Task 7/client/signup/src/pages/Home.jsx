import { useState } from "react";
import BlogList from "../components/BlogList";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  const deleteBlog = (id) => {
    setBlogs(blogs.filter(blog => blog.id !== id));
  };

  return <BlogList blogs={blogs} deleteBlog={deleteBlog} />;
};

export default Home;
