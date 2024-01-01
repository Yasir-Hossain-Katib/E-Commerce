// Transaction.jsx

import React, { useState } from 'react';


const Transaction = ({ cart, handlePayment }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const handlePaymentSelection = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handlePayment = async (paymentMethod,cart) => {
    try {
        const response = await fetch('http://your-server/send-email', {
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

      <button onClick={() => handlePayment(selectedPaymentMethod, cart)}>Pay Now</button>
    </div>
  );
};

export default Transaction;
