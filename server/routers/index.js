const AuthRouter = require('./auth.router');
const FavouriteRouter = require('./favourites.router');

let routes = (app) => {
    app.use("/api/auth", AuthRouter);
    app.use("/api/favourites", FavouriteRouter);
}


module.exports = routes;
