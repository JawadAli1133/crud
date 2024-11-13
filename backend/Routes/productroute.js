const express = require('express');
const router = express.Router();
const product = require('../Models/Product');

router.post('/createproduct',async(req,res)=>{
    const newProduct = new product(req.body);
    await newProduct.save();
    res.status(201).json({success: true, message: "Product Created Successfully", product: newProduct});
})

router.get('/allproducts',async(req,res)=>{
    const products = await product.find();
    res.json(products);
})

router.put('/updateproduct/:id', async(req,res)=>{
    const updatedProduct = await product.findByIdAndUpdate(req.params.id, req.body, {new:true});
    res.status(201).json({success: true, message: "Product Updated Successfully"});
})

router.delete('/deleteProduct', async(req,res)=>{
    const {id} = req.body;
    await product.findByIdAndDelete(id);
    res.json({success:true ,message: "Product Deleted"});
})

module.exports = router;