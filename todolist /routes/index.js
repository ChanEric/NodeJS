var express = require('express');
var router = express.Router();

//Chat


var mongoose = require( 'mongoose' );
var Task     = mongoose.model( 'Task' );
var User     = mongoose.model( 'User' );

// Controllers

var userController = require('../controllers/user');
var taskController = require('../controllers/task');


/* GET home page. */

router.get('/chat', function(req, res, next) {
  res.render('chat');
});

router.get('/', function(req, res, next) {
  res.render('home');
});


router.get('/todolist', taskController.controller.display);

router.post('/create', taskController.controller.create);

router.get( '/destroy/:id', taskController.controller.delete);

router.get( '/edit/:id', taskController.controller.modify);

router.post( '/update/:id', taskController.controller.update);

router.get('/login', function(req, res, next) {
  res.render( 'login', {
      error : '',
    });
});

router.post('/login', userController.controller.connect);

router.get('/register', function(req, res, next) {
  res.render( 'register', {
      error : '',
    });
});

router.post('/register', userController.controller.register)

router.get('/logout', userController.controller.logout);

router.get('/todolist', function(req, res, next) {
  res.render('todolist');
});

router.get('/contact', function(req, res, next) {
  res.render('contact');
});


module.exports = router;

