import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
     },
    content: { 
        type: String, 
        required: true
     },
    comments: [{ 
        type: String 
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
    }
  });
  const Blog = mongoose.model('Blog', blogSchema);
  export default Blog;