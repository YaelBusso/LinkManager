import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name : {
        type: String,
         unique: false
    },
    email : {
        type: String,
         unique: false
    },
    googleId : {
        type: String,
         unique: true
    },
    links : [{type: mongoose.Schema.Types.ObjectId, ref: 'Link'}],
})

const User = mongoose.model('User', userSchema)
module.exports = User;