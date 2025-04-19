import express from 'express';
import { signupController, loginController, verifyTokenController, logoutController } from '../controllers/authController.js';

const router = express.Router();

//routing 
//register
router.post('/signup' , signupController );  

//login 
router.post('/login' , loginController);


router.get('/verifytoken' , verifyTokenController);


router.post("/logout", logoutController);




export default router;  