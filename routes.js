var express = require('express');
var router = express.Router();

router.get('/', (req, res) => res.render('home.html'));

module.exports = router;
