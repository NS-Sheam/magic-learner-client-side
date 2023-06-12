import React from 'react';
import SectionTitle from '../../../components/SectionTitle';
import useAuth from '../../../hooks/useAuth';
import { useState } from 'react';
import { useEffect } from 'react';
import useMyClasses from '../../../hooks/useMyClasses';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const SelectedClass = () => {
    const { user, loading } = useAuth();
    const [myClassData, classLoading, refetch] = useMyClasses();

    if (loading || classLoading) {
        return <div className='flex justify-center items-center'>
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }

    const totalAmount = myClassData?.reduce((sum, singleClass) => +singleClass?.price + sum, 0);
    // console.log(totalAmount);
    const handleDelete = id => {
        Swal.fire({
            title: 'Are you sure to want to delete?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/users?email=${user?.email}&id=${id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data);
                        if (data.modifiedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your class has been deleted.',
                                'success'
                            )
                            refetch();
                        }
                    })
            }
        })
    }
    
    return (
        <div>
            <div>
                <SectionTitle heading={"Selected Classes"}
                    description={"All your selected classes are Here. You can edit the classes."} />
            </div>
            <div className='flex justify-end items-center gap-4 my-4'>
                <p className='text-2xl font-bold'>You have to pay ${totalAmount}</p>
                <Link to="/dashboard/payment">
                    <label
                        className="btn btn-md text-xl font-bold border-none text-white bg-bandOrange hover:bg-orange-secondary"
                    >
                        Pay Now
                    </label>
                </Link>

            </div>
            <table className="table w-full">
                {/* head */}
                <thead>
                    <tr>
                        <td>#</td>
                        <td>Class</td>
                        <td>Instructor</td>
                        <td>Price</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {/* table row */}
                    {
                        myClassData?.map((singleClass, i) => {
                            return (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={singleClass.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <p className="font-bold">{singleClass.title}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div>
                                                <div className="font-bold">{singleClass.instructor}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p>${singleClass.price}</p>
                                    </td>

                                    <th className="">
                                        {/* TODO: payment page */}
                                        <label
                                            onClick={() => handleDelete(singleClass._id)}
                                            className="btn btn-xs border-none text-white bg-red-500 hover:bg-orange-secondary"
                                        >
                                            Delete
                                        </label>
                                    </th>
                                </tr>
                            )
                        })
                    }
                    {/* table row finished */}
                </tbody>
                {
                    myClassData?.length < 0 &&
                    <h2 className="text-xl text-center font-bold">No class selected</h2>
                }
            </table>
        </div>
    );
};

export default SelectedClass;