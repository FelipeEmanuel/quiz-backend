const express = require('express')
const router = express.Router()
const {loginUser, registerUser, updateUser} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/login', loginUser)
router.post('/register', registerUser)
router.put('/update', protect, updateUser)

module.exports = router