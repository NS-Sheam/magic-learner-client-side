import React from 'react';
import SectionTitle from '../../../components/SectionTitle';
import { useState } from 'react';
import { useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import useMyClasses from '../../../hooks/useMyClasses';

const EnrolledClasses = () => {
    const { user, loading } = useAuth();
    
    const [myClassData, classLoading, refetch] = useMyClasses();
    return (
        <div>
            <div>
                <SectionTitle heading={"Enrolled Classes"}
                    description={"All your enrolled classes are Here"} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {
                    myClassData?.map(cl => <div
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