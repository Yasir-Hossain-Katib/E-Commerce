// Transaction.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Transaction = ({ cart, handlePaymentMethod }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const navigate = useNavigate();

  const handlePaymentSelection = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handlePayment = async (paymentMethod,cart) => {
    try {
        const response = await fetch('http://localhost:5000/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to:'yasirkatib12@gmail.com',
            subject:"Order Confirmation",
            body:"Thank you for your order!Your payment of ${totalAmount} via ${paymentMethod} was successful."
          }),

        });

        navigate('/confirmation');

          if (response.ok) {
            console.log('Email sent successfully');
          } else {
            console.error('Failed to send email');}
}   catch (error) {
            console.error('Error sending email:', error);
          }
}
    
  

  return (
    <div>
      <h2>Transaction Page</h2>

      <div>
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="nagad"
            checked={selectedPaymentMethod === 'nagad'}
            onChange={() => handlePaymentSelection('nagad')}
          />
          Nagad
        </label>

        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="bikash"
            checked={selectedPaymentMethod === 'bikash'}
            onChange={() => handlePaymentSelection('bikash')}
          />
          bKash
        </label>

        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="card"
            checked={selectedPaymentMethod === 'card'}
            onChange={() => handlePaymentSelection('card')}
          />
          Card
        </label>
      </div>

      <button onClick={() => handlePayment(selectedPaymentMethod)}>Pay Now</button>
    </div>
  );
};

export default Transaction;
