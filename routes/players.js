let players = require('../models/players');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
var Player = require('../models/players');
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

    Player.find(function (err, players) {
        if (err) {
            res.send(err);
        } else {
            res.send(JSON.stringify(players, null, 5))
        }
    });
};

router.findOne = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Player.find({'_id' : req.params.id}, function (err,foundPlayer) {
        if (err)
            res.send("Error, Player NOT found")
        else
            res.send(JSON.stringify(foundPlayer,null,5))
    })
};

router.findByPosition = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    Player.find({'playerPosition' : req.params.playerPosition}, function (err, foundPlayer) {
        if (err) {
            res.send("Error, Players not found")
        } else {
            res.send(JSON.stringify(foundPlayer,null,5))
        }
    })
};

router.findBySport = (req, res) => {
    res.setHeader('Content-type', 'application/json');
    Player.find({'playerSport' : req.params.playerSport}, function(err, foundPlayers) {
        if (err) {
            res.send("Error, Players not found")
        } else {
            res.send(JSON.stringify(foundPlayers,null,5))
        }
    })
};

router.addPlayer = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    var player = new Player();
    player._id = Math.floor((Math.random() * 100) + 1); //Randomly generate an id
    player.playerName = req.body.playerName;
    player.playerPosition = req.body.playerPosition;
    player.playerSport = req.body.playerSport;
    player.playerAge = req.body.playerAge;

    player.save(function(err){
        if (err)
            res.send("Error, Player was NOT added");
        else
            res.send("Player ADDED successfully");
    });
};

router.updatePlayer = (req, res) => {

    Player.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, player) {
        if (err) {
            res.send("Error, Player NOT found")
        } else {
            res.send("Player" + player.playerName.toString() + " Saved")
        }
    });
};

router.deletePlayer = (req, res) => {
    Player.findOneAndDelete(req.params.id, function(err) {
        if(err) {
            res.send("Error Deleting Player")
        } else {
            res.send("Player Deleted")
        }
    });
};

router.totalPlayers = (req,res) => {
    Player.find(function(err,players) {
        if(err) {
            res.send("Error, players not found")
        } else {
            res.send("There are " + players.length.toString() + " players in this collection")
        }
    });
};


module.exports = router;