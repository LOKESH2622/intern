import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  DOB: {
    type: Date,
    required: true,
  },
  currentDate: {
    type: Date,
    default: Date.now, 
  },
  mobilenumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 10,
    maxlength: 15, 
  },
  emailid: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true, 
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
