import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import SectionTitle from '../../../components/SectionTitle';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
const Payment = () => {
    return (
        <div className='w-full'>
             <SectionTitle heading={"Payment"}
                description={"Please pay for the confim enroll"} />
            <div className='w-1/2 mx-auto'>
            <Elements stripe={stripePromise}>
                <CheckoutForm/>
            </Elements>
            </div>
        </div>
    );
};

export default Payment;