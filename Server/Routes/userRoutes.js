import express from 'express';
const router = express.Router();
import { createUser ,loginUser } from '../Controller/userController.js';
import authentication from '../Middleware/authentication.js';

router.post('/signup',authentication, createUser);
router.post('/login', loginUser);

export default router;