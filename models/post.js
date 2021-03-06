const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;
const postSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
        //required: "Title is required",
        //minlength: 4,
        //maxlength: 150
    },
    body:{
        type: String,
        required: true
        //required: "Body is required",
        //minlength: 4,
        //maxlength: 2000
    },
    photo:{
        data: Buffer,
        contentType: String
    },
    postedBy: {
        type: ObjectId,
        ref: "User"
    },
    created:{
        type: Date,
        default: Date.now
    },
    likes: [{type: ObjectId, ref: "User" }],
    comments: [{
        text: String,
        created: {type:Date, default: Date.now},
        postedBy: {type: ObjectId, ref: "User"}
    }],
    updated: Date
});

module.exports = mongoose.model("Post", postSchema);
