import React from "react";
import {useLocation,Link} from "react-router-dom";


const OrderPage = () => {
    const location=useLocation();
    const {product}=location.state || {};

    return(
        <div>
            <h2>Order Confirmation</h2>

            {product && (
                <div>
                    <p>Product: {product.title}</p>
                    <p>Price: {product.price}</p>

                    <Link to="/transaction">
                        <button>Place Order</button>
                    </Link>
                </div>

            )}
        </div>
    )

}

export default OrderPage;