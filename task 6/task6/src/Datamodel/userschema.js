import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: {
     type: String,
     required: true
     },
  bio: {
     type: String,
     required:false
    },
  username: { 
    type: String, 
    required: true, 
    unique: true
 },
  password: {
     type: String,
      required: true,
      unique :true
     },
  contactNo: { 
    type: String 
},
  dob: {
     type: Date
     },
  messages: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Message' }],
  blogs: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Blog' }],
  followersCount: { 
    type: Number, 
    default: 0 },
  followingCount: {
     type: Number, 
     default: 0 },
  follows: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' }],
  createdAt: { 
    type: Date,
    default: Date.now
 },
  savedBlogs: [{
     type: mongoose.Schema.Types.ObjectId, 
     ref: 'Blog' }]
});
const User = mongoose.model('User', userSchema);

export default User;