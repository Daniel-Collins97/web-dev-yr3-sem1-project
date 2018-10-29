let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
var mongodbUri = 'mongodb://ScreamerD12:Daniel_joseph1@ds161112.mlab.com:61112/donations-assignment';
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const JWT_KEY = "Secret";


mongoose.connect(mongodbUri);

let db = mongoose.connection;

db.on('error', function (err) {
    console.log('Unable to connect to [' + db.name + ']', err);
});

db.once('open', function () {
    console.log('Successfully connected to [' + db.name + ']');
});

router.signUp = (req, res) => {
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length >= 1) {
                res.send("User with this email already exists!")
            } else {
                var user = new User();
                user._id = Math.floor((Math.random() * 100) + 1);
                user.email = req.body.email;
                user.password = req.body.password;

                user.save(function (err) {
                    if (err)
                        res.send("Error, User was NOT added");
                    else
                        res.send("User ADDED successfully");
                });
            }
        });
};

router.login = (req, res) => {
    User.find({email: req.body.email}, function (err, foundUser) {
        if (err) {
            res.send("Error, that email is not associated with any User")
        } else {
            bcrypt.compare(req.body.password, foundUser[0].password, (err, result) => {
                if (err) {
                    res.send("Auth Failed")
                } else if (result) {
                    const token = jwt.sign({
                        email: foundUser[0].email,
                        id: foundUser[0]._id
                    }, JWT_KEY, {expiresIn: "1h"})
                    res.json({message: "Auth Successful, User Logged in", token: token})
                }
            })
        }
    })
}


router.findAll = (req, res) => {
    //Return JSON representation of list
    res.setHeader('Content-Type', 'application/json');

    User.find(function (err, users) {
        if (err) {
            res.send(err);
        } else {
            res.send(JSON.stringify(users, null, 5))
        }
    });
};

router.findByEmail = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    User.find({'email': req.params.email}, function (err, foundUser) {
        if (err) {
            res.send("Error, User not found")
        } else {
            res.send(JSON.stringify(foundUser, null, 5))
        }
    })
};

router.deleteUser = (req, res) => {
    User.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.send("Error Deleting User")
        } else {
            res.send("User Deleted")
        }
    });
};

router.totalUsers = (req, res) => {
    User.find(function (err, users) {
        if (err) {
            res.send("Error, Users not found")
        } else {
            res.send("There are " + users.length.toString() + " users in this collection")
        }
    });
};

module.exports = router;