const express = require('express');
const adminEventController = require('../controllers/adminEventController');
const { requireAuth, requireRole } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(requireAuth, requireRole('admin'));
router.get('/', adminEventController.index);
router.post('/', adminEventController.create);
router.get('/:id/edit', adminEventController.edit);
router.put('/:id', adminEventController.update);
router.delete('/:id', adminEventController.remove);

module.exports = router;
