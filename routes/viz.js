var express = require('express');
var router = express.Router();

/* Viz */
router.get('/', function(req, res) {
  res.render('viz', { title: 'SuperTesisViz' });
});

module.exports = router;
