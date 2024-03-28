var express = require('express');
var router = express.Router();
var path = require('path');
/* GET home page. */
router.get('/', function(req, res, next) {
    // Trả về file index.hbs khi truy cập trang chủ
    res.sendFile(path.join(__dirname, '../public/html', 'index.html'));
  });
  router.get('/sign-in', function(req, res, next) {
    // Trả về file index.hbs khi truy cập trang chủ
    res.sendFile(path.join(__dirname, '../public/html', 'sign-in.html'));
  });
  router.get('/sign-up', function(req, res, next) {
    // Trả về file index.hbs khi truy cập trang chủ
    res.sendFile(path.join(__dirname, '../public/html', 'sign-up.html'));
  });
module.exports = router;
