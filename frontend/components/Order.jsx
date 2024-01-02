import React from "react";
import {useLocation,useNavigate,Link} from "react-router-dom";


const OrderPage = () => {
    const location=useLocation();
    const navigate=useNavigate();
    const {product,cart}=location.state || {};

    const tran=()=>{
        navigate('/transaction',{
            state:{product,cart}
        })
    }



    return(
        <div>
            <h2>Order Confirmation</h2>

            {product && (
                <div>
                    <p>Product: {product.title}</p>
                    <p>Price: {product.price}</p>

                 
                    <button onClick={tran}>Place Order</button>
                   
                </div>

            )}
        </div>
    )

}

export default OrderPage;