import express from 'express';
const router = express.Router();
import { createUser ,loginUser } from '../Controller/userController.js';

router.post('/signup',createUser);
router.post('/login', loginUser);

export default router;