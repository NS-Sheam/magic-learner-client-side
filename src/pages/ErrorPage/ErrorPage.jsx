import React from 'react';
import errorImg from "../../assets/Error.png"
import { Link, useRouteError } from 'react-router-dom';
const ErrorPage = () => {
    const { error, status } = useRouteError()
    return (
        <section className='flex items-center justify-center h-screen p-16 text-gray-900'>
            <div className='d-flex flex-column justify-content-between align-items-center px-5 mx-auto my-8'>
                {/* <img className='w-25' src={errorAnim} alt="" /> */}
                <div className="w-44 h-44 mx-auto">
                    <img className='' src={errorImg} alt="" />
                </div>
                <div className='text-center'>
                    <p className='text-error text-xl font-semibold md:text-3xl mb-8 text-danger'>
                        {error?.message}
                    </p>
                    <Link
                        to='/'
                        className='px-4 py-3 rounded'
                    >
                        <button className='bg-orange-primary hover:bg-orange-secondary py-2 px-4 rounded-2 border-0 fw-bold text-white rounded-full font-bold'>Back to homepage</button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ErrorPage;