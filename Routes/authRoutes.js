import express from 'express';
import { registerUser, loginUser } from '../controller/authController.js';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.post('/forgot-password', async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();
    res.json({ message: 'Password reset successfully ✅' });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong ❌' });
  }
});

export default router;