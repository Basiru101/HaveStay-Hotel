import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'manager'], 
      default: 'manager', 
    },
    avatar: {
      type: String,
      default: "https://png.pngtree.com/thumb_back/fh260/background/20230611/pngtree-silhouette-of-girl-on-dark-background-vector-image_2890403.jpg",
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
