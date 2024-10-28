// import jwt from 'jsonwebtoken';
// import { errorHandler } from './error.js';

// export const verifyToken = (req, res, next) => {
//   const token = req.cookies.access_token;

//   if (!token) return next(errorHandler(401, 'Unauthorized'));

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return next(errorHandler(403, 'Forbidden'));

//     req.user = user;
//     next();
//   });
// };

// utils/verifyUser.js
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js'; // Adjust if the path is incorrect

// Verify general user token
export const verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      console.log(`User not found for ID: ${decoded.id}`); // Log for debugging
      return res.status(404).json({ message: 'User not found' });
    }

    next();
  } catch (error) {
    console.error('Token verification error:', error); // Log error for debugging
    return res.status(401).json({ message: 'Invalid token' });
  }
};
