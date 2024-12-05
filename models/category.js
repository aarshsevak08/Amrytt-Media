const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    
    categoryName:{
        type:String,
        trim:true,
    }
     
})

module.exports = mongoose.model("category",categorySchema);

        
     