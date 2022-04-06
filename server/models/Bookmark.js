const mongoose = require('mongoose');

const bookmark = mongoose.Schema({
    bookmark_name: {
        type: String,
        maxlength: 30,
        unique: 1,
        required: true
    },
    bookmark_info: [{
        img: String,
        url: String,
        title: String,
    }]
}
)

const Bookmark = mongoose.model('Bookmark', bookmark)

module.exports = { Bookmark }