import React, { useState } from "react";
import { Link } from "react-router-dom";
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

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [otpMessage, setOtpMessage] = useState("");
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
      setSuccessMessage(response.data.message);
      setOtp(response.data.otp); // Note: For testing; remove in production
      setError("");
      setIsOtpStep(true);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong. Please try again.");
      setSuccessMessage("");
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/auth/verify-otp", {
        emailid: formData.emailid,
        otp,
      });
      setOtpMessage(response.data.message);
      setError("");
      setIsOtpStep(false); // Reset to signup form (or redirect to login)
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong. Please try again.");
      setOtpMessage("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          {isOtpStep ? "Verify OTP" : "Signup Form"}
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {successMessage && !isOtpStep && (
          <p className="text-green-500 text-center mb-4">
            {successMessage} {otp && `(OTP: ${otp})`}
          </p>
        )}
        {otpMessage && <p className="text-green-500 text-center mb-4">{otpMessage}</p>}

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
