import React from 'react';
import SectionTitle from '../../../components/SectionTitle';
import { useState } from 'react';
import { useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import useMyClasses from '../../../hooks/useMyClasses';

const EnrolledClasses = () => {
    const { user, loading } = useAuth();
    const [responseData, classLoading, refetch] = useMyClasses();
    const { classesData: myClassData } = responseData;
    // console.log(myClassData);

    return (
        <div>
            <div>
                <SectionTitle heading={"Enrolled Classes"}
                    description={"All your enrolled classes are Here"} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* TODO: adding enrolled student with previous one */}
                {
                    myClassData?.length > 0 ? myClassData?.map(singleClass => <div
                        key={singleClass._id}
                        className="card card-compact bg-base-100 shadow-xl p-4">
                        <div><img className='lg:h-48 w-full' src={singleClass.image} alt={singleClass.title} /></div>
                        <div className="card-body text-center">
                            <h2 className="text-xl text-center font-bold">{singleClass.title}</h2>
                            <p>Instructor:{singleClass.instructor}</p>
                            <p className="">{singleClass.description}</p>
                        </div>
                    </div>) :
                        <h2 className="text-xl text-center font-bold">You do not enrolled any class yet.</h2>
                }
            </div>
        </div>
    );
};

export default EnrolledClasses;