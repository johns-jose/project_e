const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    userid:{
        type:String
    },
    postid:{
        type:String
    },
    parentid:{
        type:String
    },
    description:{
        type:String
    }
},
{timestamps:true}

)


  const Comment = mongoose.model('Comment',commentSchema)
  module.exports = Comment
