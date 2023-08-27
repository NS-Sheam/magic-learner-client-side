import React from "react";

const InstructorCard = ({ instructor }) => {
  return (
    <>
      <div className="">
        <img
          className="h-60 w-full"
          src={instructor.image}
          alt={instructor.name}
        />
      </div>
      <div className="text-center space-y-4">
        <h2 className="text-2xl text-center">{instructor.name}</h2>
        <p className="font-bold">{instructor.classes?.length} classes taken</p>
        {instructor.classes?.slice(0, 2).map((cl, i) => (
          <p key={i}>{cl}</p>
        ))}
        <p className="font-bold">{instructor.email}</p>

        <div className="card-actions justify-end">
          <button className="btn btn-xs bg-bandOrange text-white">
            Details
          </button>
        </div>
      </div>
    </>
  );
};

export default InstructorCard;
