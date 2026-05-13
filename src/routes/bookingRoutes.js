const express = require('express');
const bookingController = require('../controllers/bookingController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(requireAuth);
router.post('/events/:eventId', bookingController.create);
router.patch('/:id/cancel', bookingController.cancel);

module.exports = router;
