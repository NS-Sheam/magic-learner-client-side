import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = event =>{
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

    }
    return (
        <form onSubmit={handleSubmit} className='border rounded-md p-4'>
        <CardElement
        className='text-xl'
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <div className='my-3 flex items-end justify-end'>
        <button className='btn btn-md bg-primary text-white ' type="submit" disabled={!stripe}>
          Pay
        </button>
        </div>
      </form>
    );
};

export default CheckoutForm;