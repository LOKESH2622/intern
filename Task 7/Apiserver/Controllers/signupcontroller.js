import bcrypt from "bcrypt"; 
import crypto from "crypto"; 
import User from "../DataModels/usermodel.js";
import isEmail from "validator/lib/isEmail.js";  

const Signup = async (req, res) => {
  try {
    const { firstname, lastname, DOB, mobilenumber, emailid, password } = req.body;

    if (!firstname || !lastname || !DOB || !mobilenumber || !emailid || !password) {
      return res.status(400).json({ error: `All fields are required!` });
    }
    if (!/^\d{10}$/.test(mobilenumber)) {
      return res.status(400).json({ error: "Mobile number must contain 10 digits" });
    }
    if (!isEmail(emailid)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    const dob = new Date(DOB);
    const year = dob.getFullYear();
    const month = dob.getMonth() + 1;  
    const day = dob.getDate();

    if (year < 1900 || year > 2025) {
      return res.status(400).json({ error: "Year of birth must be between 1900 and 2025" });
    }

    if (month < 1 || month > 12) {
      return res.status(400).json({ error: "Invalid month in date of birth" });
    }

    const daysInMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > daysInMonth) {
      return res.status(400).json({ error: "Invalid day in date of birth" });
    }

    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ error: "Password must be at least 6 characters long and contain at least one special character" });
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
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { Signup };
