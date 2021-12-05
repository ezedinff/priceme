const User = require('../models/user');

const sampleUser = {
    username: "maru.nega@gmail.com",
    password: "12345678"
}

module.exports = async () => {
    const exU = await User.findOne({username: sampleUser.username});
    if(!exU) {
        await User.create(sampleUser);
    }
};
