import { useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import useAllUsers from "../../hooks/useAllUsers";
import useAuth from "../../hooks/useAuth";
import useClasses from "../../hooks/useClasses";
import Swal from "sweetalert2";
import { useEffect } from "react";
import useAdmin from "../../hooks/useAdmin";
import { handleDeleteClass } from "../../utilities/handleDeleteClass";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import FeedBackModal from "../../components/FeedBackModal";

const AllClasses = () => {
    const [classes, classLoading, refetch] = useClasses();
    const { user, loading } = useAuth();
    const [userRole, isAdminLoading] = useAdmin();
    const role = userRole?.role;
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedClass, setSelectedClass] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [feedbackMassage, setFeedbackMassage] = useState(null);
    const handleEnroll = id => {
        if (!user) {
            return Swal.fire('Please login first to enroll')
        } // TODO: enrolled student wiht Math.floor(Math.random() * 100)
        Swal.fire({
            title: 'Are you sure to added the class your enrollment list?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#28a745',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Enroll Class'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/users?email=${user?.email}`, {
                    method: "PUT",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({ status: "enrolled", classId: id })
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data);
                        if (data?.modifiedCount > 0) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Your selection done',
                                showConfirmButton: false,
                                timer: 1500
                            });
                            navigate("/dashboard/payment")
                            refetch();
                        }
                        if (data.error === "ClassId already exists in the array.") {
                            Swal.fire({
                                title: 'You already added the class',
                                showClass: {
                                    popup: 'animate__animated animate__fadeInDown'
                                },
                                hideClass: {
                                    popup: 'animate__animated animate__fadeOutUp'
                                }
                            })
                        }
                    })
            }
        })

    }

    const handleStatus = (id, status) => {
        const requestBody = {
            status: status
        }
        if (feedbackMassage !== null) {
            requestBody.feedback = feedbackMassage;
          }
        // console.log(id, status);
        fetch(`http://localhost:5000/classes/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(requestBody)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount) {
                    Swal.fire({
                        icon: 'success',
                        title: `${status} done`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                }
            })

    }
    if (loading || isAdminLoading || classLoading) {
        return <div className='h-screen flex justify-center items-center'>
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }
    return (
        <div className="">
            <SectionTitle
                heading={"All Classes are here"}
                description={"All classe of the school are here"}
            />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {
                    classes?.map(singleClass => <div
                        key={singleClass._id}
                        className="card card-compact bg-base-100 shadow-xl p-4 relative">
                        <div><img className='lg:h-48 w-full' src={singleClass.image} alt={singleClass.title} /></div>
                        <div className="card-body text-center">
                            <h2 className="text-2xl text-center">{singleClass.title}</h2>
                            <p className="font-bold">{singleClass.instructor}</p>
                            <p>Enrolled: {singleClass.enrolledStudents || (singleClass.capacity - singleClass.availableSeat)} students</p>
                            <p className="font-bold">{singleClass.availableSeat || singleClass.capacity || 0} seats are available</p>
                            <p>Fees: ${singleClass.price}</p>

                            {
                                !role || !userRole?.isAdmin &&
                                role === "student" &&
                                <div className="card-actions justify-end">
                                    <button onClick={() => handleEnroll(singleClass._id)} className="btn btn-xs bg-bandOrange">Enroll Now</button>
                                </div>
                            }
                            {
                                userRole?.isAdmin &&
                                <div className="flex justify-end gap-2">
                                    {
                                        singleClass?.status === "pending" ?
                                            <>
                                                <button
                                                    onClick={() => handleStatus(singleClass._id, "approved")}
                                                    className="px-2 py-1 rounded-md border-2 font-bold text-white bg-green-700 hover:bg-green-600"
                                                >
                                                    Approve</button>
                                                <button
                                                    onClick={() => {
                                                        setModalOpen(true)
                                                        setSelectedClass(singleClass)
                                                    }}
                                                    className="px-2 py-1 rounded-md border-2 font-bold text-white bg-red-700 hover:bg-red-600"
                                                >Deny</button>
                                            </> :
                                            singleClass?.status === "denied" ?
                                                <button
                                                    className="cursor-auto px-2 py-1 rounded-md border-2 text-red-500 border-red-500 font-bold"
                                                >
                                                    Denied</button> :
                                                <button
                                                    className="cursor-auto px-2 py-1 rounded-md border-2 text-green-500 border-green-500 font-bold"
                                                >
                                                    Approved</button>
                                    }
                                    <button
                                        onClick={() => handleDeleteClass(singleClass._id, refetch)}
                                        className="px-2 py-1 rounded-md border-2 font-bold text-white bg-red-700 hover:bg-red-600"
                                    >
                                        Delete Class</button>
                                </div>
                            }
                        </div>
                    </div>)
                }

            </div>
            {
                modalOpen &&
                <FeedBackModal
                    setModalOpen={setModalOpen}
                    handleStatus={handleStatus}
                    selectedClass={selectedClass}
                    setFeedbackMassage={setFeedbackMassage}
                />
            }
        </div>
    );
};

export default AllClasses;
