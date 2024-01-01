import React, {useState,useEffect} from 'react';
import  {useParams,useNavigate} from 'react-router-dom';


const ProductDetail =()=>{

  const { productId }=useParams();
  const [product,setProduct]=useState(null);
  const navigate=useNavigate();
  const [cart,setCart]= useState([]);

  useEffect(()=>{

  })

  useEffect(()=>{
    const fetchProduct =async()=>{
      try{
        const response = await fetch(`http://localhost:5000/api/products/${productId}`)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProduct(data);
      } catch(error){
        console.error("error fetching data",error);
      }
    };

    fetchProduct();

    const storedCart =localStorage.getItem('cart');
    if(storedCart){
      setCart(JSON.parse(storedCart));
    }
  },[productId]);

  const addToCart = () => {
    const existingProduct = cart.find((cartProduct) => cartProduct._id === product._id);

    if (existingProduct) {
       alert("Product is already in the cart");
    } else {
      
      const updatedCart = [...cart, { ...product, quantity: 1 }];
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  

  const increaseQuantity = (itemToIncrease) =>{
    const updatedCart = cart.map((cartProduct)=>
      cartProduct._id === itemToIncrease._id
         ? {...cartProduct,quantity:(cartProduct.quantity||1) + 1}

         :cartProduct
    );
    setCart(updatedCart);
    localStorage.setItem('cart',JSON.stringify(updatedCart));
    
  }

  const decreaseQuantity =(itemToDecrease)=>{
    const updatedCart =cart.map((cartProduct)=>
      cartProduct._id === itemToDecrease._id
          ? {...cartProduct,quantity:(cartProduct.quantity||1) -1}

          : cartProduct
    )

    setCart(updatedCart);
    localStorage.setItem('cart',JSON.stringify(updatedCart));
  }


  const removeFromCart =(itemToRemove)=>{
    const updatedCart = cart.filter((cartProduct)=>
      cartProduct._id !== itemToRemove._id)

    setCart(updatedCart)

    localStorage.setItem('cart',JSON.stringify(updatedCart));
  }

  const handleBuyNow = () =>{
    navigate('/order',{
    
      state:{product,cart}
    });
  }

  if(!product){
    return <div>No Product</div>
  }



  

  

  return(
    <>
     <div>
      <h2>{product.title}</h2>
      <p>Price: {product.price}</p>
      <img src={product.image} alt={product.title} style={{ maxWidth: '200px' }} />
      <p>{product.description}</p>
      <button onClick={handleBuyNow}>Buy Now</button>
      <button onClick={addToCart}>Add to Cart</button>
    </div>

      <div>
      <h3>
        Cart
      </h3>
      { cart.length === 0 ? (
        <p>Your cart is empty</p>
      ):(
        <>
          <ul>
             {cart.map((cartProduct)=>(
              <li key={cartProduct._id}>
                 {cartProduct.title} - Quantity: {cartProduct.quantity||1} -Total Price: $

                 {cartProduct.price*(cartProduct.quantity||1)}

                 <button onClick={()=>increaseQuantity(cartProduct)}>+</button>
                 <button onClick={()=>decreaseQuantity(cartProduct)}>-</button>
                 <button onClick={()=>removeFromCart(cartProduct)}>
                   <span role="img" arial-label="delete" style={{fontSize:"20px"}}>🗑️</span>
                 </button>

              </li>
             )
             
             )}
          </ul>
          <p>Total: ${cart.reduce((total,item)=> total+item.price*(item.quantity||1),0)}</p>

        </>
      )}
      </div>

    </>
    
    
  )

}

export default ProductDetail;