const mongoose = require("mongoose");
const fetch =require("node-fetch");
const Product =require("../models/product");



mongoose.connect("mongodb+srv://katib:1234@bingo.billuxn.mongodb.net/?retryWrites=true&w=majority");


const apiUrl= 'https://fakestoreapi.com/products';

fetch(apiUrl)
     .then((response)=> response.json())
     .then( async (data)=>{
        for (const productData of data){
            const product = new Product({
                title:productData.title,
                description: productData.description,
                price: productData.price,
                category: productData.category,
                image: productData.image,
            });
            await product.save()
            console.log(`Saved product: ${product.title}`);
        }
        console.log("data fetch complete")
     })
     .catch((error)=>console.error("error fetching data",error));
     