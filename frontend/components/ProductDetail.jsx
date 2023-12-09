import React from "react";
import product from "./Dashboard"

const ProductDetail = ({ product }) => {
    console.log('Props:', product);
    return (
      <div>
        <h2>{product.title}</h2>
        <p>Price: {product.price}</p>
        <img src={product.image} alt={product.title} style={{ maxWidth: '300px' }} />
       
        <button>Add to Cart</button>
       
      </div>
    );
  };
  
  export default ProductDetail;