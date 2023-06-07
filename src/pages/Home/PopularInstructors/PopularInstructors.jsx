import SectionTitle from "../../../components/SectionTitle";
import useInstructor from "../../../hooks/useInstructor";

const PopularInstructors = () => {
    const [instructors, refetch] = useInstructor();
    return (
        <div className="my-container">
            <SectionTitle
            heading={"our popular instructor"}
            description={"Meet our Popular Instructors - experts who inspire, guide, and empower. With industry experience and exceptional teaching skills, they bring passion to our learning community. Join their engaging classes, unlock your potential, and learn from the best."}/>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {
                    instructors?.slice(0, 4).map(instructor => <div 
                    key={instructor.id} 
                    className="card card-compact bg-base-100 shadow-xl">
                    <figure><img src={instructor.image} alt="Shoes" /></figure>
                    <div className="card-body text-center">
                      <h2 className="text-2xl text-center">{instructor.name}</h2>
                     {
                        instructor.classes.map((cl, i) => <p key={i}>
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