const mongoose = require('mongoose')

const saveSchema = new mongoose.Schema({
    userid: {
        type: String,
    },
    postid: {
        type: String,
    }
},
    {
        timestamps: true
    }
)

const Save = mongoose.model('Save',saveSchema)

module.exports = Save