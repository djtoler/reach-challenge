const Game = require('../models/game-model');

const postGameData = async(req, res) => {
    let messageData = req.body
    console.log(messageData);
    console.log("hello");

}

module.exports = {postGameData}