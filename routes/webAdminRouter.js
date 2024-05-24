var express = require('express');
var router = express.Router();
var path = require('path');
/* GET home page. */



router.get('/', function(req, res, next) {
    // Trả về file index.hbs khi truy cập trang chủ
    res.sendFile(path.join(__dirname, '../public/html', 'index.html'));
  });
  router.get('/userprofile', function(req, res, next) {
    // Trả về file index.hbs khi truy cập trang chủ
    res.sendFile(path.join(__dirname, '../public/html', 'userprofile.html'));
  });
  router.get('/sign-in', function(req, res, next) {
    // Trả về file index.hbs khi truy cập trang chủ
    res.sendFile(path.join(__dirname, '../public/html', 'sign-in.html'));
  });
  router.get('/sign-up', function(req, res, next) {
    // Trả về file index.hbs khi truy cập trang chủ
    res.sendFile(path.join(__dirname, '../public/html', 'sign-up.html'));
  });
  router.get('/usermanager', function(req, res, next) {
    // Trả về file index.hbs khi truy cập trang chủ
    res.sendFile(path.join(__dirname, '../public/html', 'userManager.html'));
  });
  router.get('/categorymanager', function(req, res, next) {
    // Trả về file index.hbs khi truy cập trang chủ
    res.sendFile(path.join(__dirname, '../public/html', 'categoryManager.html'));
  });
  router.get('/productmanager', function(req, res, next) {
    // Trả về file index.hbs khi truy cập trang chủ
    res.sendFile(path.join(__dirname, '../public/html', 'productManager.html'));
  });
  router.get('/odermanager', function(req, res, next) {
    // Trả về file index.hbs khi truy cập trang chủ
    res.sendFile(path.join(__dirname, '../public/html', 'oderManager.html'));
  });
module.exports = router;
