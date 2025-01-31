import bcrypt from "bcrypt"; 
import crypto from "crypto"; 
import User from "../DataModels/usermodel.js";

const Signup = async (req, res) => {
  try {
    const { firstname, lastname, DOB, mobilenumber, emailid, password } = req.body;

   
    if (!firstname || !lastname || !DOB || !mobilenumber || !emailid || !password) {
      return res.status(400).json({ error: `All fields are required!` });
    }

    const existingUser = await User.findOne({
      $or: [{ emailid: emailid }, { mobilenumber: mobilenumber }],
    });

    if (existingUser) {
      return res.status(400).json({ error: "Email or mobile number already exists!" });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = crypto.randomInt(100000, 999999);
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    const newUser = new User({
      firstname,
      lastname,
      DOB,
      mobilenumber,
      emailid,
      password: hashedPassword,
      otp, 
      otpExpiry, 
      verified: false,
    });

    await newUser.save();

    
    res.status(201).json({
      message: "Signup successful! Please verify your OTP.",
      otp, 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};

export { Signup };
