const mongoose = require('mongoose')


const reportSchema = new mongoose.Schema({
    reason: {
        type:String
    }
},
{timestamp:true}
);


const Report = mongoose.model('Report',reportSchema)

module.exports = Report