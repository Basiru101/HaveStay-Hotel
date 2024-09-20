import express from 'express';
import { checkPermission, deleteUser, getUser, getUserListings, test, updateUser } from '../controller/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

// import { deleteUser, test, updateUser,  getUserListings, getUser} from '../controllers/user.controller.js';
// import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();

router.get('/test', test);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser)
router.get('/listings/:id', verifyToken, getUserListings)
router.get('/:id', verifyToken, getUser)
// router.get('/:id', verifyToken, checkPermission, getUser);

export default router;