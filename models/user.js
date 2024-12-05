const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    
    userName:{
        type:String,
        trim:true,
    },
    email:{
        type:String,
        unique:true,
        trim:true,
        required:["PLease enter your email"]
    },
    password:{
        type:String,
        required:["Please enter your Password"]
    }
})

module.exports = mongoose.model("user",userSchema);

        
     