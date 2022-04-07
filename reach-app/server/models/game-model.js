const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    author: {
        type: String,
    },
    guessInfo: [{
        userGuess: {
            type:Number
        },
        guessNumberCount: {
            type:Number
        },
        correctLocations: {
            type:Number
        },
        correctNumbers: {
            type:Number
        },
    }],
    message: {
        type: String,
    },

})

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;