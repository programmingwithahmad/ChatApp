import express from 'express';
import { requiresignin } from '../middleware/authMiddleware.js';
import { getChatList, getMessages, sendMessage } from '../controllers/messageController.js';

const router = express.Router();


router.get('/list', requiresignin, getChatList);
router.get('/messages/:userId', requiresignin, getMessages);
router.post('/send', requiresignin, sendMessage);


export default router;  