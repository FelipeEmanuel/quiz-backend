const express = require('express')
const { getSalas, criarSala, entrarNaSala, removerDaSala } = require('../controllers/salasController')
const { protect, isAdmin } = require('../middleware/authMiddleware')
const router = express.Router()


router.post('/', protect, criarSala)
router.get('/', getSalas)
router.put('/add', protect, entrarNaSala)
router.put('/remove', protect, removerDaSala)

module.exports = router