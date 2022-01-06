const express = require('express');
const router = express.Router();
//const { ensureAuthenticated } = require('../config/auth');
const Assignment = require('../models/Assignment');

// Login, GET
router.get('/', (req, res) => {
    res.render('login');
});

// Dashboard, GET
router.get('/dashboard', (req, res) => {
    res.render('dashboard');
});


module.exports = router;