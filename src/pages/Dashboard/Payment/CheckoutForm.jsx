import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const CheckoutForm = ({ price, myClassData }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const [cardError, setCardError] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransectionId] = useState("");

    useEffect(() => {
        fetch("https://summer-camp-server-side-alpha.vercel.app/create-payment-intent", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ price })
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setClientSecret(data.clientSecret)
            })
    }, [price])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card
        })

        if (error) {
            console.log("error", error);
            setCardError(error?.message);
        }
        else {
            setCardError("");
            console.log("payment method", paymentMethod);
        }

        setProcessing(true);

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || "annoymous user",
                        email: user?.email || "unknown email"
                    },
                },
            },
        );
        if (confirmError) {
            // console.log(confirmError);
            setCardError(setCardError);
        }

        // console.log("payment Intent", paymentIntent);
        setProcessing(false);
        if (paymentIntent?.status === "succeeded") {
            setTransectionId(paymentIntent.id);
            const payment = {
                email: user?.email,
                transactionId: paymentIntent.id,
                price,
                date: new Date(),
                classIds: myClassData?.map(singleClass => singleClass._id),
                className: myClassData?.map(singleClass => singleClass.title),
                paymentStatus: "success"
            }
            fetch("https://summer-camp-server-side-alpha.vercel.app/payments", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    // if (data.insertedId) {
                    //     Swal.fire({
                    //         icon: 'success',
                    //         title: 'your payment successfull',
                    //         showConfirmButton: false,
                    //         timer: 1500
                    //     });
                    // }
                })
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
                <button className='btn btn-sm bg-primary text-white ' type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </div>
            {
                cardError &&
                <p className='text-error'>{cardError}</p>
            }
            {
                transactionId &&
                <p className='text-green-700 text-xl'>Your transaction completed. Transaction Id: {transactionId}</p>
            }
        </form>
    );
};

export default CheckoutForm;