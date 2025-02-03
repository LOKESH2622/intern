import mongoose from "mongoose";
const blogSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }, 
  title: { 
    type: String, 
    required: true, 
    trim: true 
  }, 
  content: { 
    type: String, 
    required: true 
  }, 
  comments: [{ 
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User' 
    }, 
    comment: { 
      type: String, 
      required: true 
    }, 
    createdAt: { 
      type: Date, 
      default: Date.now 
    } 
  }], 
  dateOfCreation: { 
    type: Date, 
    default: Date.now 
  }, 
  likes: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }], 
  viewersCount: { 
    type: Number, 
    default: 0 
  },
  image: {
    data: Buffer, 
    contentType: String, 
  },
});
const Blog = mongoose.model("Blog", blogSchema);
export default Blog;