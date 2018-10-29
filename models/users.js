let mongoose = require('mongoose');

let UsersSchema = new mongoose.Schema({
        _id: {type: Number, default: 0},
        email: {type: String, required: true, unique: true, match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/},
        password: {type: String, required: true}
    },
    {collection: 'usersdb'});

module.exports = mongoose.model('users', UsersSchema);