const express = require('express');
const eventController = require('../controllers/eventController');

const router = express.Router();

router.get('/', eventController.listEvents);
router.get('/events/:id', eventController.showEvent);

module.exports = router;
