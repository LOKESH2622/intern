
import User from "../DataModels/usermodel.js";
export const VerifyOtp = async (req, res) => {
  try {
    const { emailid, otp } = req.body;

    if (!emailid || !otp) {
      return res.status(400).json({ error: "Email and OTP are required!" });
    }

    const user = await User.findOne({ emailid });

    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    if (user.verified) {
      return res.status(400).json({ message: "User is already verified!" });
    }

    if (user.otp !== parseInt(otp)) {
      return res.status(400).json({ error: "Invalid OTP!" });
    }

    if (new Date() > user.otpExpiry) {
      return res.status(400).json({ error: "OTP has expired!" });
    }

    user.verified = true; // Mark user as verified
    user.otp = null;      // Clear OTP
    user.otpExpiry = null; // Clear OTP expiry
    await user.save();

    res.status(200).json({ message: "OTP verified successfully! User is now verified." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};



