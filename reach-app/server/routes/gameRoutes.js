const express = require ('express');
const gameRoutes = express.Router();
const {postGameData} = require ('../controllers/game-data-controller')

gameRoutes.route('/')
    .post(postGameData)
    .get(()=>{console.log("hello");})

module.exports = gameRoutes