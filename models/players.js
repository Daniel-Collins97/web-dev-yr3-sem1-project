let mongoose = require('mongoose');

let PlayersSchema = new mongoose.Schema({
        _id: {type: Number, default: 0},
        playerName: String,
        playerPosition: String,
        playerSport: String,
        playerAge: {type: Number, default: 1}
    },
    {collection: 'playerdb'});

module.exports = mongoose.model('players', PlayersSchema);