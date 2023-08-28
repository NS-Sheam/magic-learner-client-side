import React from 'react';
import SectionTitle from '../../../components/SectionTitle';
import useAuth from '../../../hooks/useAuth';
import { useState } from 'react';
import { useEffect } from 'react';
import useMyClasses from '../../../hooks/useMyClasses';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import SingleClassRow from './SingleClassRow';

const SelectedClass = () => {
    const { user, loading } = useAuth();
    const [responseData, classLoading, refetch] = useMyClasses();
    const { classesData: myClassData, classesId: paymentStatus } = responseData;

    // const filterPayment = myClassData?.filter(obj1 =>
    //     paymentStatus?.some(obj2 => String(obj2.key) === obj1._id && Object.values(obj2)[0] === "pending")
    //   );
    //   console.log(filterPayment);
    // console.log(filterPayment);
    const totalAmount = myClassData?.reduce((sum, singleClass) => + singleClass.price + sum, 0).toFixed(2);
    // console.log(totalAmount);
    // console.log(myClassData);
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
                fetch(`https://summer-camp-server-side-alpha.vercel.app/users?email=${user?.email}&id=${id}`, {
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
                                <SingleClassRow
                                    key={i}
                                    singleClass={singleClass}
                                    handleDelete={handleDelete}
                                    i={i}
                                />
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