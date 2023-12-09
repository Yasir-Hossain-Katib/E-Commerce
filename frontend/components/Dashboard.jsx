import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";



const Dashboard =()=>{

    const [products,setProducts]=useState([])

    useEffect (()=>{
        const fetchProducts = async() => {
            try{
                const response = await fetch('http://localhost:5000/api/products');
                const data =await response.json();
                setProducts(data);

            } catch(error){
                console.error("error fetching products",error)
            }
        };
        fetchProducts();
        }, []);

    return(
        <div>
            <h2>Dashboard</h2>
            <ul>
                {products.map((product)=>(
                    <li key={product._id}>
                        <Link to={`/product/${product._id}`}>
                        <div>
                            <h3>{product.title}</h3>
                            <p>Price:{product.price}</p>
                        
                            <img src={product.image} alt={product.title} style={{maxWidth:"100px"}} />
                        </div>
                        </Link>
                       

                    </li>
                ))}
            </ul>
        
        
        </div>

    )
    
}


export default Dashboard;