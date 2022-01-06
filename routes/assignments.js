const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment')

// add, GET
router.get('/add', (req, res) => {
    res.render('add');
});



module.exports = router;