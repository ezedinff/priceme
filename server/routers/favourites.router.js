const {Router} = require('express');
const FavouriteController = require('../controllers/FavController');
const jwtMiddleware = require('../middlewares/auth');

let router = Router();

router
    .get('/', jwtMiddleware, FavouriteController.findAll)
    .post('/toggle', jwtMiddleware, FavouriteController.toggle)

module.exports = router;
