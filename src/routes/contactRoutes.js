const express = require('express');
const contactController = require('../controllers/contactController');
const { requireAuth, requireRole } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', contactController.show);
router.post('/', contactController.create);
router.patch('/:id/status', requireAuth, requireRole('admin'), contactController.updateStatus);
router.delete('/:id', requireAuth, requireRole('admin'), contactController.remove);

module.exports = router;
