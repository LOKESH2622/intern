import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./LoginForm";
import SignupForm from "./signupform";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateBlog from "./pages/CreateBlog";
import BlogList from "./components/BlogList";
import About from "./pages/about";
import CommentSection from "./pages/comment";
import BlogForm from "./components/Blogform";
function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/blogList" element={<BlogList/>} />
          <Route path="/edit/:id" element={<BlogForm/>} />
          <Route path="/CommentSection/:blogId" element={<CommentSection />} />
          <Route path="/about" element={<About/>} />
          <Route path="/blogform" element={<Home />} />
          <Route path="/create" element={<CreateBlog />} />
          <Route path="/CommentSection" element={<CommentSection />} />

        </Routes>
      </div>
    </Router>
  );
}
export default App;