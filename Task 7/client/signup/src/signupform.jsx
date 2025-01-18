import React, { useState } from "react";
import axios from "axios";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    DOB: "",
    mobilenumber: "",
    emailid: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [otp, setOtp] = useState(""); 

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/auth/signup", formData);

      setSuccessMessage(response.data.message); 
      setOtp(response.data.otp); 
      setError(""); 
      setFormData({
        firstname: "",
        lastname: "",
        DOB: "",
        mobilenumber: "",
        emailid: "",
        password: "",
      }); // Reset form
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong. Please try again.");
      setSuccessMessage(""); // Clear success message
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>Signup Form</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && (
        <p style={{ color: "green" }}>
          {successMessage} {otp && `(OTP: ${otp})`}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="firstname">First Name:</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="lastname">Last Name:</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="DOB"
            value={formData.DOB}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="mobilenumber">Mobile Number:</label>
          <input
            type="tel"
            id="mobilenumber"
            name="mobilenumber"
            value={formData.mobilenumber}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="emailid">Email ID:</label>
          <input
            type="email"
            id="emailid"
            name="emailid"
            value={formData.emailid}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
