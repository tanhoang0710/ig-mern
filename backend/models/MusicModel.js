const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
    codeName: String,
    name: String,
    artist: String,
});

const Music = mongoose.model('Music', musicSchema);

module.exports = Music;
