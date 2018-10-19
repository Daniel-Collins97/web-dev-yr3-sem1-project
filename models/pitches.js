let mongoose = require('mongoose');

let PitchesSchema = new mongoose.Schema({
        _id: {type: Number, default: 0},
        pitchLocation: String,
        pitchLights: String,
        pitchSport: String,
        pitchAge: {type: Number, default: 1}
    },
    {collection: 'pitchdb'});

module.exports = mongoose.model('pitches', PitchesSchema);