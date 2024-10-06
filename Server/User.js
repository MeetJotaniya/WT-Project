const mongo = require("mongoose");

const userSchema = new mongo.Schema({
    shopName: String,
    userName: String,
    email: String,
    password: String,
    contact: Number,
    history: []
});

module.exports = mongo.model('User', userSchema);