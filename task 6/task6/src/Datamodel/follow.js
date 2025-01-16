import mongoose from "mongoose";
const followSchema = new mongoose.Schema({
    followerRefId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true },
    followingRefId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true },
    timestamp: { 
        type: Date, 
        default: Date.now }
  });
  const Follow = mongoose.model('Follow', followSchema);
  export default Follow;