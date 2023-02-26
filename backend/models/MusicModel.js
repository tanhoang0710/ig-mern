const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({});

const Music = mongoose.model('Music', musicSchema);

module.exports = Music;
