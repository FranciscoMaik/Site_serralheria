var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/galeria', function(req, res, next){
  res.render('galeria');
});

router.get('/faleConosco', function(req, res){
  res.render('faleConosco');
});

module.exports = router;
