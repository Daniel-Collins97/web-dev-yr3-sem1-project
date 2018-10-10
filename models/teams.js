let mongoose = require('mongoose');

let TeamsSchema = new mongoose.Schema({
    teamId: {type: Number, default: 0},
    teamName: String,
    teamLeague: {type: Number, default: 1}
    },
    {collection: 'rugbydb'});

module.exports = mongoose.model('Teams', TeamsSchema);