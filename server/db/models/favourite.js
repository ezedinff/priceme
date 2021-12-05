const mongoose = require('mongoose');

const FavouriteSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    }
});


module.exports = mongoose.model('Favourite', FavouriteSchema);
