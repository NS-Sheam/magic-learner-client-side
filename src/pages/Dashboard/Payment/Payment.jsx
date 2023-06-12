import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import SectionTitle from '../../../components/SectionTitle';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import useMyClasses from '../../../hooks/useMyClasses';


const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
    const [responseData, classLoading, refetch] = useMyClasses();
    const {classesData: myClassData} = responseData;
    const totalAmount = myClassData?.reduce((sum, singleClass) => +singleClass.price + sum, 0);
    // console.log(totalAmount);
    const price = +totalAmount.toFixed(2);
    return (
        <div className='w-full'>
            <SectionTitle heading={"Payment"}
                description={"Please pay for the confim enroll"} />
            <div className='w-1/2 mx-auto'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm
                        price={price}
                        myClassData={myClassData}
                    />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;