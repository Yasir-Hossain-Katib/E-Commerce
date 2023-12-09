const Product=require("../models/product");

exports.getProducts= async (req,res)=>{
    try{
        const product = await Product.find();
        res.json(product);
    } catch(error){
        console.error(error,"Error fetching products");
        res.status(500).json({error:"internal Server Error"})
    }
}

exports.addProduct = async(req,res)=>{
    try{
        const {title,description,price,image,category} = req.body;

        const existingProduct=await Product.findOne({title});//uppecase,lowercase thik kora lagbe!!!!!

        if(existingProduct){
            return res.status(400).json({error:"Product already exists"})
        }
        const newProduct= new Product({
            title,
            description,
            price,
            image,category
           
        })
        await newProduct.save();
        res.status(200).json({message:"product added successfully,",product: newProduct})
    } catch(error){
        console.error(error,"error adding product");
        res.status(500).json({error:"internal Server Error"})
    }
}

exports.updateProduct = async(req,res)=>{
    try{
        const { productId} =req.params;
        const {title,description,price,image,category} = req.body;

        const updateProduct= await Product.findByIdAndUpdate(productId,{title,description,price,image,category});
      
        if (!updateProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
      
        res.json({message:"product updated successfully",prouct:updateProduct})


    }catch(error){
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


exports.deleteProduct = async(req,res)=>{
    try{
        const { productId} =req.params;
        const {title,description,price,image,category} = req.body;

        const deleteProduct= await Product.findByIdAndDelete(productId,{title,description,price,image,category});
      
        if (!deleteProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
      
        res.json({message:"product deleted successfully",prouct:deleteProduct})


    }catch(error){
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


