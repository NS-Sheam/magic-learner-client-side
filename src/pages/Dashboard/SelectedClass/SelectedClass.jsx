import React from 'react';
import SectionTitle from '../../../components/SectionTitle';
import useAuth from '../../../hooks/useAuth';
import { useState } from 'react';
import { useEffect } from 'react';

const SelectedClass = () => {
    const { user, loading } = useAuth();
    const [enrollClass, setEnrollClass] = useState([]);
    useEffect(() => {
        if (!loading) {
            fetch(`http://localhost:5000/users?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setEnrollClass(data);
            })
        }
    }, [user, loading])
    const handleDelete =() =>{

    }
    const handlePay = () =>{

    }
    return (
        <div>
            <div>
                <SectionTitle heading={"Selected Classes"}
                    description={"All your selected classes are Here. You can edit the classes."} />
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
                            enrollClass?.map((singleClass, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{i}</td>
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
                                            <p>{singleClass.price}</p>
                                        </td>

                                        <th className="flex flex-col gap-3">
                                            
                                                    <label
                                                        onClick={() => handleDelete(user._id)}
                                                        htmlFor="my-modal-5"
                                                        className="btn btn-xs border-none text-white bg-red-500 hover:bg-orange-secondary"
                                                    >
                                                        Delete
                                                    </label>
                                                <label
                                                    onClick={() => handlePay(user.email)}
                                                    htmlFor="my-modal-5"
                                                    className="btn btn-xs border-none text-white bg-bandOrange hover:bg-orange-secondary"
                                                >
                                                    Pay
                                                </label>

                                        </th>
                                    </tr>
                                )
                            })
                        }
                        {/* table row finished */}
                    </tbody>
                </table>
        </div>
    );
};

export default SelectedClass;