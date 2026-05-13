const express = require('express');
const router = express.Router();

const {
    isAuthenticated
} = require('../middleware/authMiddleware');

const {
    isAdmin
} = require('../middleware/roleMiddleware');

router.get(
    '/admin/events',
    isAuthenticated,
    isAdmin,
    (req, res) => {

        res.render('admin/events');
    }
);

module.exports = router;