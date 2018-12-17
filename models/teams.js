let mongoose = require('mongoose');

let TeamsSchema = new mongoose.Schema({
        _id: {type: Number, default: 0},
        teamName: String,
        teamLeague: {type: Number, default: 1},
        teamSport: String,
        numberOfPitches: {type: Number, default: 1}
    },
    {collection: 'rugbydb'});

module.exports = mongoose.model('teams', TeamsSchema);