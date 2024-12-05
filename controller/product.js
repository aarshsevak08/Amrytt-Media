const category = require("../models/category");
const product = require("../models/product");


exports.createProduct = async (req, res) => {
    try {
       const {name,description,price,images,category} = req.body;
        const addedProduct = await product.create({name,description,price,images,category});
        return res.status(200).json({error:false,data:addedProduct,message:"Product added successfully"})

    } catch (error) {
      return res.status(400).json({ error, success: false });
    }
  };
 
  exports.getProduct = async (req, res) => {
    try {
        const getProduct = await product.find();
        
        return res.status(200).json({error:false,data:getProduct})

    } catch (error) {
      return res.status(400).json({ error, success: false });
    }
  }; 

  exports.getProductById = async (req, res) => {
    try {
      const {id} = req.params;
        const getProductbyid = await product.findById(id);
        return res.status(200).json({error:false,data:getProductbyid})

    } catch (error) {
      return res.status(400).json({ error, success: false });
    }
  };

  exports.updateProductById = async (req, res) => {
    try {
      const {id} = req.params;
        const updateProductbyid = await product.findByIdAndUpdate(id,req.body,{new:true});
        return res.status(200).json({error:false,data:updateProductbyid})

    } catch (error) {
      return res.status(400).json({ error, success: false });
    }
  };
 
exports.deleteProductById = async (req, res) => {
    try {
      const {id} = req.params;
        const deleteProductById = await product.findByIdAndDelete(id);
        return res.status(200).json({error:false,message:"Product Deleted Successfully"})

    } catch (error) {
      return res.status(400).json({ error, success: false });
    }
  };