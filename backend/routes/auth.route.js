// // routes/auth.route.js
import express from 'express';
import { google, signin, signOut, signup } from '../controller/auth.controller.js'; 

const router = express.Router(); 

// Define the signin route
router.post('/signup', signup);
router.post('/signin', signin)
router.post('/google', google)
router.get('/signout', signOut);

export default router; // Exporting as router
