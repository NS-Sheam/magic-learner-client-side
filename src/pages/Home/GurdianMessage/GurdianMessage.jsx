import React from 'react';
import "./GurdianMessage.css";
import logo from "../../../assets/logo.png"

const GurdianMessage = () => {

    const feedBackCard = <div className="bg-black bg-opacity-10 border text-white shadow-white border-white rounded-lg shadow p-4">
        <div className="flex items-center mb-4r relative">
            <img
                className="w-10 h-10 rounded-full absolute -right-8 -top-8"
                src="https://i.ibb.co/Dk08kh9/chef5.jpg" // Replace with customer's profile image URL
                alt="Customer Profile"
            />
            <div>
                <h3 className="text-lg font-medium">Natasha Romanoff</h3>
                <p className="text-slate-300 text-sm">New York, USA</p>
            </div>
        </div>
        <p className="">
            Summer Camp Music School exceeded our expectations! Our child had an amazing time learning and exploring different instruments. The instructors were skilled and passionate, creating a positive and supportive environment. We were impressed with the variety of classes offered and the progress our child made in such a short time. We highly recommend Summer Camp Music School to any parent looking to foster their child musical talents and create lasting memories.
        </p>
    </div>
    const repeatCards = [];
    for (let i = 0; i < 6; i++) {
        repeatCards.push(feedBackCard);
    }
    return (
        <section

            className="gurdian-message-bg my-container py-8 lg:py-14 min-h-screen bg-cover bg-fixed">
            <div className="text-center lg:my-8 space-y-4 mx-auto">
                <h2 className="lg:text-3xl font-bold text-white uppercase">Gurdians Feedback</h2>
                <img className="h-10 w-10 mx-auto" src={logo} alt="" />
                <p className="lg:w-2/3 mx-auto text-white">Here is some gurdian feedback about our classes</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Feedback Card */}
                {repeatCards}
            </div>
        </section>
    );
};

export default GurdianMessage;