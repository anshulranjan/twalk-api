const mongoose = require('mongoose');
const { v1: uuidv1 } = require('uuid');
const crypto = require('crypto');
const {ObjectId} = mongoose.Schema;
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    school: {
        type: String,
        trim: true
    },
    college: {
        type: String,
        trim: true
    },
    relation: {
        type: String,
        trim: true
    },
    city: {
        type: String,
        trim: true
    },
    job: {
        type: String,
        trim: true
    },
    gender: {
        type: String,
        trim: true
    },
    about: {
        type: String,
        trim: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    salt: String,
    created:{
        type: Date,
        default: Date.now
    },
    photo:{
        data: Buffer,
        contentType: String
    },
    resetPasswordLink: {
        data: String,
        default: ""
    },
    following: [{type: ObjectId, ref: "User" }],
    followers: [{type: ObjectId, ref: "User" }],
    updated: Date
});

userSchema.virtual('password')
.set(function(password){
    // generate temporary variable
    this._password = password
    //generate a timestamp
    this.salt = uuidv1();
    //encryptpassword
    this.hashed_password = this.encryptPassword(password)

})
.get(function(){
    return this._password
});

userSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password
    },
    encryptPassword: function(password){
        if(!password) return "";
        try{
            return crypto.createHmac('sha1',this.salt)
            .update(password).digest('hex');
        }
        catch (err){
            return "";
        }
    }
};

module.exports = mongoose.model("User", userSchema);
