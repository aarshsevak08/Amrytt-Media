const category = require("../models/category");


exports.createCategory = async (req, res) => {
    try {
       const {categoryName} = req.body;
        const categoryAdded = await category.create({categoryName});
        return res.status(200).json({error:false,data:categoryAdded,message:"Category added successfully"})

    } catch (error) {
      return res.status(400).json({ error, success: false });
    }
  };