let teams = require('../models/teams');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
var Team = require('../models/teams');
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

    Team.find(function (err, teams) {
        if (err) {
            res.send(err);
        } else {
            res.send(JSON.stringify(teams, null, 5))
        }
    });
};

router.findOne = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Team.find({'_id' : req.params.id}, function (err,foundTeam) {
        if (err)
            res.send("Error, Team NOT found")
        else
            res.send(JSON.stringify(foundTeam,null,5))
    })
};

router.findBySport = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    Team.find({'teamSport' : req.params.teamSport}, function (err, foundTeams) {
        if (err) {
            res.send("Error, Team not found")
        } else {
            res.send(JSON.stringify(foundTeams,null,5))
        }
    })
};

router.findByLeague = (req, res) => {
    res.setHeader('Content-type', 'application/json');
    Team.find({'teamLeague' : req.params.teamLeague}, function(err, foundTeams) {
        if (err) {
            res.send("Error, Teams not found")
        } else {
            res.send(JSON.stringify(foundTeams,null,5))
        }
    })
};

function getByValue(array, teamId) {
    var result  = array.filter(function(obj){return obj.teamId == teamId;} );
    return result ? result[0] : null; // or undefined
}

router.addTeam = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    var team = new Team();
    team._id = Math.floor((Math.random() * 100) + 1); //Randomly generate an id
    team.teamName = req.body.teamName;
    team.teamLeague = req.body.teamLeague;
    team.teamSport = req.body.teamSport;
    team.numberOfPitches = req.body.numberOfPitches;

    team.save(function(err){
        if (err)
            res.send("Error, Team was NOT added");
        else
            res.send("Team ADDED successfully");
    });
};

router.updateLeague = (req, res) => {

    Team.findById(req.params._id, function (err, team) {
        if (err)
            res.send("Error, Team NOT found")
        else {
            team.teamLeague +=1;
            team.save(function (err) {
                if (err)
                    res.send("Error Saving Team")
                else
                    res.send("Team Saved")
            });
        }
    });
};

router.deleteTeam = (req, res) => {
    Team.findOneAndDelete(req.params._id, function(err) {
        if(err) {
            res.send("Error Deleting Team")
        } else {
            res.send("Team Deleted")
        }
    });
};


module.exports = router;