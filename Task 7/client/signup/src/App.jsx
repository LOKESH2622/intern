import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./LoginForm";
import SignupForm from "./signupform";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignupForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
