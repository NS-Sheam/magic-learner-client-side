import React from 'react';
import useAdmin from '../hooks/useAdmin';
import useClasses from '../hooks/useClasses';
import { handleDeleteClass } from "../utilities/handleDeleteClass"
import Swal from 'sweetalert2';

const ClassCard = ({ singleClass, handleEnroll, handleStatus, setModalOpen, setSelectedClass }) => {
    const [userRole] = useAdmin();
    const { deleteClass, refetch } = useClasses();
    const role = userRole?.role;
    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure to want to delete this class?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#28a745",
            confirmButtonText: "Delete",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await deleteClass(id);
                if (response.deletedCount > 0) {
                    Swal.fire({
                        icon: "success",
                        title: "Class successfully deleted",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    refetch();
                }
            }
        })


    }
    return (
        <div
            key={singleClass._id}
            className="card card-compact bg-base-100 shadow-xl p-4 relative">
            <div><img className='h-60 w-full' src={singleClass.image} alt={singleClass.title} /></div>
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
                            onClick={() => handleDelete(singleClass._id)}
                            className="px-2 py-1 rounded-md border-2 font-bold text-white bg-red-700 hover:bg-red-600"
                        >
                            Delete Class</button>
                    </div>
                }
            </div>
        </div>
    );
};

export default ClassCard;