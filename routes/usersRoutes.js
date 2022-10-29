const { Router } = require('express');

const { registerUser, loginUser, verifyUser } = require('../controllers/usersController');

const router = Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/:id/verify/:token', verifyUser)

module.exports = router