import { useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import useAllUsers from "../../hooks/useAllUsers";
import useAuth from "../../hooks/useAuth";
import useClasses from "../../hooks/useClasses";
import Swal from "sweetalert2";
import { useEffect } from "react";

const AllClasses = () => {
    const [classes, refetch] = useClasses();
    const { user, loading } = useAuth();

    const [role, setRole] = useState(null);
    const [isAdminLoading, setIsAdminLoading] = useState(true)
    // console.log(classes);
    const handleEnroll = id => {
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
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Your enroll done',
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
    useEffect(() => {
        if (!loading) {
            fetch(`http://localhost:5000/users/admin/${user?.email}`)
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    setRole(data.role)
                    setIsAdminLoading(false);
                })
        }
    }, [user, loading])
    return (
        <div>
            <SectionTitle
                heading={"All Classes are here"}
                description={"All classe of the school are here"}
            />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {
                    classes?.map(cl => <div
                        key={cl._id}
                        className="card card-compact bg-base-100 shadow-xl p-4">
                        <div><img className='lg:h-48 w-full' src={cl.image} alt={cl.title} /></div>
                        <div className="card-body text-center">
                            <h2 className="text-2xl text-center">{cl.title}</h2>
                            <p>Enrolled: {cl.enrolledStudents} students</p>
                            <p className="font-bold">{cl.availableSeat} seats are available</p>
                            <p>Fees: ${cl.price}</p>

                            {
                                role === "student" &&
                                <div className="card-actions justify-end">
                                    <button onClick={() => handleEnroll(cl._id)} className="btn btn-xs bg-bandOrange">Enroll Now</button>
                                </div>
                            }
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default AllClasses;