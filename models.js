const mongoose = require('mongoose');
const moment = require('moment');

const userSchema = new mongoose.Schema({
    username: String
});

const exerciseSchema = new mongoose.Schema({
    description: String,
    date: Date,
    duration: Number,
    userId: mongoose.Schema.ObjectId
});


const User = mongoose.model('User', userSchema);
const Exercise = mongoose.model('Exercise', exerciseSchema);

exports.User = User;
exports.Exercise = Exercise;