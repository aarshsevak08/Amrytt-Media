const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    
    name:{
        type:String,
        trim:true,
    },
    description:{
        type:String,
        trim:true,
    },
    price:{
        type:Number,
        trim:true,
    },
    images:{
        type:String,
        trim:true,
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:"category"
    }
     
})

module.exports = mongoose.model("product",productSchema);

        
     