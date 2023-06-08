import SectionTitle from "../../components/SectionTitle";
import useClasses from "../../hooks/useClasses";

const AllClasses = () => {
    const [classes, refetch] = useClasses();
    // console.log(classes);
    return (
        <div>
            <SectionTitle
            heading={"All Classes are here"}
            description={"All classe of the school are here"}
            />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {
                    classes?.map(cl => <div
                        key={cl.id}
                        className="card card-compact bg-base-100 shadow-xl p-4">
                        <div><img className='lg:h-48 w-full' src={cl.image} alt={cl.title} /></div>
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

export default AllClasses;