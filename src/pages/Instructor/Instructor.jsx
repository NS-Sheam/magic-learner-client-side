import React from 'react';
import SectionTitle from '../../components/SectionTitle';
import useInstructor from '../../hooks/useInstructor';

const Instructor = () => {
    const [instructors] = useInstructor();
    return (
        <div>
            <SectionTitle
            heading={"Our Instructors"}
            description={"Meet our skilled instructors"}
            />
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {
                    instructors?.map(instructor => <div 
                    key={instructor.id} 
                    className="card card-compact bg-base-100 shadow-xl p-4">
                    <div className="">
                      <img className="h-24 lg:h-56 w-full" src={instructor.image} alt={instructor.name} />
                    </div>
                    <div className="text-center space-y-4">
                      <h2 className="text-2xl text-center">{instructor.name}</h2>
                     {
                        instructor.classes?.map((cl, i) => <p key={i}>
                            {cl}
                        </p>)
                     }
                     <p className="font-bold">{instructor.email}</p>
                     
                      <div className="card-actions justify-end">
                        <button className="btn btn-xs bg-bandOrange">Details</button>
                      </div>
                    </div>
                  </div>)
                }
            </div>
        </div>
    );
};

export default Instructor;