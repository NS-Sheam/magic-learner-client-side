import React from 'react';

const SingleMyClass = ({singleClass, navigate, setModalOpen, setSelectedClass, handleDeleteClass, refetch}) => {
    return (
        <div
                        key={singleClass._id}
                        className="card card-compact bg-base-100 shadow-xl p-4">
                        <div><img className='lg:h-48 w-full' src={singleClass.image} alt={singleClass.title} /></div>
                        <div className="card-body text-center">
                            <h2 className="text-2xl text-center">{singleClass.title}</h2>
                            <p>Enrolled: {singleClass.enrolledStudents || (singleClass.capacity - singleClass.availableSeat)} students</p>
                            <p className="font-bold">{singleClass.availableSeat} seats are available</p>
                            <p>Fees: ${singleClass.price}</p>

                            <div className="card-actions justify-end gap-2">
                                <button
                                    className={
                                        `cursor-auto px-2 py-1 rounded-md border-2 font-bold ${singleClass?.status === "pending" ?
                                            "text-yellow-400 border-yellow-400" : singleClass?.status === "approved" ?
                                                "text-green-400 border-green-400" :
                                                singleClass?.status === "denied" ? "text-red-400 border-red-400" : ""}`
                                    }
                                >
                                    {
                                        singleClass?.status === "pending" ?
                                            "Pending" : singleClass?.status === "approved" ?
                                                "Approved" :
                                                singleClass?.status === "denied" ? "Denied" : ""
                                    }
                                </button>
                                <button
                                    onClick={() =>
                                        navigate('/dashboard/updateclass', {
                                            state: { singleClass: singleClass },
                                            replace: true
                                        })
                                    }
                                    className="text-white font-bold px-2 py-1 rounded-md bg-orange-400">
                                    Update Class
                                </button>
                                {
                                    singleClass?.status === "denied" &&
                                    <button onClick={() => {
                                        setModalOpen(true)
                                        setSelectedClass(singleClass)
                                    }} className="text-white font-bold px-2 py-1 rounded-md bg-blue-600">Feedback</button>
                                }
                                <button onClick={() => handleDeleteClass(singleClass._id, refetch)} className="text-white font-bold px-2 py-1 rounded-md bg-red-500">Delete Class</button>
                            </div>
                        </div>
                    </div>
    );
};

export default SingleMyClass;