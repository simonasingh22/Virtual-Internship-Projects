const express = require('express');
const router = express.Router();
const { register, login, logout, me, forgotPassword, resetPassword, updateProfile } = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', auth, me);
router.post('/forgot', forgotPassword);
router.post('/reset/:token', resetPassword);
router.put('/profile', auth, updateProfile);

module.exports = router;
