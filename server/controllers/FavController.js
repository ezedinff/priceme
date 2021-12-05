const Favourites = require('../db/models/favourite');
const mongoose = require('mongoose');

const findAll = async (req, res) => {
    const {data} = req.user;
    const favs = await Favourites.find({user: data});
    res.send({
        success: true,
        data: {
            favourites: favs.map((fav) => fav.value)
        }
    })
}

const toggle = async (req, res) =>{
    const {data} = req.user;
    const {value} = req.body;
    const condition = {value, user: data};
    const extFav = await Favourites.findOne(condition);
    if(extFav) {
        await Favourites.deleteOne(condition);
        await findAll(req, res);
    } else {
        await Favourites.create(condition);
        await findAll(req, res);
    }
}

const removeFav = async (req, res) => {
    const {id} = req.params;
    const r = await Favourites.deleteOne({_id: id});
    res.send({
        success: true,
        data: {
            message: 'removed Successfully'
        }
    })
}


module.exports = {findAll, toggle, removeFav};
// TODO: create, remove
// TODO: logout button, favourites page
