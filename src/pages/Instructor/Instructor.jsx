import React from 'react';
import SectionTitle from '../../components/SectionTitle';
import useInstructor from '../../hooks/useInstructor';
import InstructorCard from '../../components/InstructorCard';

const Instructor = () => {
  const [instructors] = useInstructor();
  // console.log(instructors);
  return (
    <div>
      <SectionTitle
        heading={"Our Instructors"}
        description={"Meet our skilled instructors"}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {
          instructors?.map(instructor => <div
            key={instructor._id}
            className="card card-compact bg-base-100 shadow-xl p-4">
            <InstructorCard instructor={instructor} />
          </div>)
        }
      </div>
    </div>
  );
};

export default Instructor;