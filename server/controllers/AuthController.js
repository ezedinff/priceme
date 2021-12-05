const User = require('../db/models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        console.log(req.body);
        const { username, password } = req.body;
        const user = await User.findOne({username});
        if (!user) {
            throw new Error("Username or Password Incorrect");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Username or Password Incorrect");
        }
        const token = jwt.sign({
            data: user._id
        }, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

        res.send({
            success: true,
            data: {
                accessToken: token,
                username
            }
        });
    } catch (e) {
        res.status(404).send({
            success: false,
            error: {message: e.message}
        })
    }
}
const me = async (req, res) => {
    const {data} = req.user;
    const user = await User.findOne({_id: data});
    res.send({success: true, data: {user: {username: user.username}}});
}

module.exports = {login, me};
