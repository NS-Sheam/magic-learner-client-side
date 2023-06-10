import React from 'react';
import SectionTitle from '../../../components/SectionTitle';
import { useState } from 'react';
import { useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';

const EnrolledClasses = () => {
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
    return (
        <div>
            <div>
                <SectionTitle heading={"Enrolled Classes"}
                    description={"All your enrolled classes are Here"} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {
                    enrollClass?.map(cl => <div
                        key={cl._id}
                        className="card card-compact bg-base-100 shadow-xl p-4">
                        <div><img className='lg:h-48 w-full' src={cl.image} alt={cl.title} /></div>
                        <div className="card-body text-center">
                            <h2 className="text-xl text-center font-bold">{cl.title}</h2>
                            <p>Instructor:{cl.instructor}</p>
                            <p className="">{cl.description}</p>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default EnrolledClasses;