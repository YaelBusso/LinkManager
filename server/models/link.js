import mongoose from 'mongoose';
import shortid from 'shortid';
const linkSchema = mongoose.Schema({
    full:{
        type: String,
        required: true
    },
    short:{
        type: String,
        required: true,
        default: shortid.generate 
    },
    clicks:{
        type: Number,
        default: 0,
        required: true
    },
    date:{
        type: Date,
        default: Date.now()
    },
    title: {
        type: String,
        required: false
    },
    tags:{
        type: [String],
        required: false
    },
    star:{
        type: Boolean, 
        required: false,
        default: false
    },
    userToken: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }
});

const Link= mongoose.model("Link", linkSchema); 

export default Link;