const jwt = require('express-jwt');
const jwtMiddleware = jwt({
    secret: process.env.JWT_ACCESS_TOKEN_SECRET,
    algorithms: ['HS256']
});

module.exports = jwtMiddleware;
