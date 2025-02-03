import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    DOB: "",
    mobilenumber: "",
    emailid: "",
    password: "",
  });

  const [otp, setOtp] = useState("");
  const [isOtpStep, setIsOtpStep] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/auth/signup", formData);
      toast.success(response.data.message || "Signup successful! OTP sent.");
      setOtp(response.data.otp); // For testing; remove in production
      setIsOtpStep(true);
    } catch (err) {
      toast.error(err.response?.data?.error || "Something went wrong. Please try again.");
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/auth/verify-otp", {
        emailid: formData.emailid,
        otp,
      });
      toast.success(response.data.message || "OTP Verified! Account created.");
      setIsOtpStep(false);
    } catch (err) {
      toast.error(err.response?.data?.error || "Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500 px-4">
      <ToastContainer position="top-center" autoClose={2000} />
      
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          {isOtpStep ? "Verify OTP" : "Signup Form"}
        </h2>

        {!isOtpStep ? (
          <form onSubmit={handleSignup} className="space-y-6">
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              placeholder="First Name"
              required
              className="mt-1 block w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              placeholder="Last Name"
              required
              className="mt-1 block w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="date"
              name="DOB"
              value={formData.DOB}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="tel"
              name="mobilenumber"
              value={formData.mobilenumber}
              onChange={handleChange}
              placeholder="Mobile Number"
              required
              className="mt-1 block w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="email"
              name="emailid"
              value={formData.emailid}
              onChange={handleChange}
              placeholder="Email ID"
              required
              className="mt-1 block w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="mt-1 block w-full px-4 py-2 border rounded-lg"
            />
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md"
            >
              Signup
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpVerification} className="space-y-6">
            <input
              type="text"
              value={otp}
              onChange={handleOtpChange}
              placeholder="Enter OTP"
              required
              className="mt-1 block w-full px-4 py-2 border rounded-lg"
            />
            <button
              type="submit"
              className="w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-lg shadow-md"
            >
              Verify OTP
            </button>
          </form>
        )}

        {!isOtpStep && (
          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <Link to="/" className="text-blue-600 font-semibold hover:underline">
              Login
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default SignupForm;
