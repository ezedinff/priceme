const {Router} = require('express');
const AuthController = require('../controllers/AuthController');
const jwtMiddleware = require('../middlewares/auth');


let router = Router();


router
    .post('/login', AuthController.login)
    .post('/me', jwtMiddleware, AuthController.me);


module.exports = router;
