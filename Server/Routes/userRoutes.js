import express from 'express';
const router = express.Router();
import { createUser ,loginUser,logoutUser} from '../Controller/userController.js';

router.post('/signup',createUser);
router.post('/login', loginUser);
router.delete("/logout/:id",logoutUser)

export default router;