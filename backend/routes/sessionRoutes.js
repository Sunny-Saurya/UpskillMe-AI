const express = require('express')

const {creatSession, getSessionById, getMySessions, deleteSession} = require('../controllers/sessionController')

const { protect } = require('../middlewares/authMiddleware')

const router = express.Router()

// Create a new session
router.post('/create', protect, creatSession)

router.get('/my-sessions', protect, getMySessions)

// Get a session by ID
router.get('/:id', protect, getSessionById)

router.delete('/:id', protect, deleteSession)

module.exports = router
