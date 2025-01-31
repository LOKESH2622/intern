import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./LoginForm";
import SignupForm from "./signupform";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import BlogList from "./components/BlogList";
import About from "./pages/about";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/blogList" element={<BlogList/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/blogform" element={<Home />} />
          <Route path="/create" element={<CreateBlog />} />
          <Route path="/edit/:id" element={<EditBlog />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



