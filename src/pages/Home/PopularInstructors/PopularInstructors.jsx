import SectionTitle from "../../../components/SectionTitle";
import useInstructor from "../../../hooks/useInstructor";

const PopularInstructors = () => {
    const [instructors] = useInstructor();
    console.log(instructors);
    return (
        <div className="my-container lg:py-14">
            <SectionTitle
            heading={"our popular instructor"}
            description={"Meet our Popular Instructors - experts who inspire, guide, and empower. With industry experience and exceptional teaching skills, they bring passion to our learning community. Join their engaging classes, unlock your potential, and learn from the best."}/>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {
                    instructors?.slice(0, 8).map(instructor => <div 
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

export default PopularInstructors;