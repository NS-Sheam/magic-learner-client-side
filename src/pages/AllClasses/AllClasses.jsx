import { useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import useAllUsers from "../../hooks/useAllUsers";
import useAuth from "../../hooks/useAuth";
import useClasses from "../../hooks/useClasses";
import Swal from "sweetalert2";
import { useEffect } from "react";
import useAdmin from "../../hooks/useAdmin";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import FeedBackModal from "../../components/FeedBackModal";
import ClassCard from "../../components/ClassCard";

const AllClasses = () => {
    const { classes, classLoading, refetch } = useClasses();
    const { user, loading } = useAuth();
    const [userRole, isAdminLoading] = useAdmin();
    // console.log(role);
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
                fetch(`https://summer-camp-server-side-alpha.vercel.app/users?email=${user?.email}`, {
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
                            // navigate("/dashboard/payment")
                            refetch()
                        }
                        if (data.modifiedCount === 0) {
                            Swal.fire({
                                icon: 'error',
                                title: 'You already select this class',
                                showConfirmButton: false,
                                timer: 1500
                            });
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
        console.log("hitting", id, status);
        const requestBody = {
            status: status
        }
        if (feedbackMassage !== null) {
            requestBody.feedback = feedbackMassage;
        }
        // console.log(id, status);
        fetch(`https://summer-camp-server-side-alpha.vercel.app/classes/${id}`, {
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

    return (
        <div className="">
            <SectionTitle
                heading={"All Classes are here"}
                description={"All classe of the school are here"}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    classes?.map((singleClass, index) => <ClassCard key={index} singleClass={singleClass} handleEnroll={handleEnroll} handleStatus={handleStatus} setModalOpen={setModalOpen} setSelectedClass={setSelectedClass} />)
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
