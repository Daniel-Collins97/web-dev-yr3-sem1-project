let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
var Pitch = require('../models/pitches');
var mongodbUri = 'mongodb://ScreamerD12:Daniel_joseph1@ds161112.mlab.com:61112/donations-assignment';

mongoose.connect(mongodbUri);

let db = mongoose.connection;

db.on('error', function (err) {
    console.log('Unable to connect to [' + db.name + ']', err);
});

db.once('open', function () {
    console.log('Successfully connected to [' + db.name + ']');
});

router.findAll = (req, res) => {
    //Return JSON representation of list
    res.setHeader('Content-Type', 'application/json');

    Pitch.find(function (err, pitches) {
        if (err) {
            res.send(err);
        } else {
            res.send(pitches, null, 5)
        }
    });
};

router.findOne = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Pitch.find({'_id' : req.params.id}, function (err,foundPitch) {
        if (err)
            res.send("Error, Pitch NOT found")
        else
            res.send(foundPitch,null,5)
    })
};

router.findByLocation = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    Pitch.find({'pitchLocation' : req.params.pitchLocation}, function (err, foundPitches) {
        if (err) {
            res.send("Error, Pitches not found")
        } else {
            res.send(foundPitches,null,5)
        }
    })
};

router.findBySport = (req, res) => {
    res.setHeader('Content-type', 'application/json');
    Pitch.find({'pitchSport' : req.params.pitchSport}, function(err, foundPitches) {
        if (err) {
            res.send("Error, Pitches not found")
        } else {
            res.send(foundPitches,null,5)
        }
    })
};

router.addPitch = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    var pitch = new Pitch();
    pitch._id = Math.floor((Math.random() * 100) + 1); //Randomly generate an id
    pitch.pitchLocation = req.body.pitchLocation;
    pitch.pitchLights = req.body.pitchLights;
    pitch.pitchSport = req.body.pitchSport;
    pitch.pitchAge = req.body.pitchAge;

    pitch.save(function(err){
        if (err)
            res.send("Error, Pitch was NOT added");
        else
            res.send("Pitch ADDED successfully");
    });
};

router.updatePitch = (req, res) => {

    Pitch.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, pitch) {
        if (err) {
            res.send("Error, Pitch NOT found")
        } else {
            res.send("Pitch" + pitch.pitchLocation.toString() + " Saved")
        }
    });
};

router.deletePitch = (req, res) => {
    Pitch.findOneAndDelete(req.params.id, function(err) {
        if(err) {
            res.send("Error Deleting Pitch")
        } else {
            res.send("Pitch Deleted")
        }
    });
};

router.totalPitches = (req,res) => {
    Pitch.find(function(err,pitches) {
        if(err) {
            res.send("Error, pitches not found")
        } else {
            res.send("There are " + pitches.length.toString() + " pitches in this collection")
        }
    });
};


module.exports = router;