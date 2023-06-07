import React from 'react';
import SectionTitle from '../../../components/SectionTitle';
import useClasses from '../../../hooks/useClasses';

const PopularClasses = () => {
    const [classes, refetch] = useClasses();
    // console.log(classes);
    return (
        <div className="my-container lg:py-14">
            <SectionTitle
                heading={"our popular classes"}
                description={"Know about our Popular Classes - experts who inspire, guide, and empower. With industry experience and exceptional teaching skills, they bring passion to our learning community. Join their engaging classes, unlock your potential, and learn from the best."} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {
                    classes?.slice(0, 6).map(cl => <div
                        key={cl.id}
                        className="card card-compact bg-base-100 shadow-xl">
                        <figure><img src={cl.image} alt="Shoes" /></figure>
                        <div className="card-body text-center">
                            <h2 className="text-2xl text-center">{cl.title}</h2>
                            <p>Enrolled: {cl.enrolledStudents} students</p>
                            <p className="font-bold">{cl.availableSeat} seats are available</p>
                            <p>Fees: ${cl.price}</p>

                            <div className="card-actions justify-end">
                                <button className="btn btn-xs bg-bandOrange">Enroll Now</button>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default PopularClasses;