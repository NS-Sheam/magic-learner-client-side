import SectionTitle from "../../../components/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import useClasses from "../../../hooks/useClasses";
import { handleDeleteClass } from "../../../utilities/handleDeleteClass";

const MyClasses = () => {
    const [classes, classLoading, refetch] = useClasses();
    const { user, loading } = useAuth();
    const filterMyClasses = classes?.filter(singleClass => singleClass.instructor === user.displayName)
    if (loading || classLoading) {
        return <div className='flex justify-center items-center'>
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }
    return (
        <div>
            <SectionTitle heading={"All your Classes"}
                description={"All your added classes are Here. You can edit the classes."} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {
                    filterMyClasses?.map(singleClass => <div
                        key={singleClass._id}
                        className="card card-compact bg-base-100 shadow-xl p-4">
                        <div><img className='lg:h-48 w-full' src={singleClass.image} alt={singleClass.title} /></div>
                        <div className="card-body text-center">
                            <h2 className="text-2xl text-center">{singleClass.title}</h2>
                            <p>Enrolled: {singleClass.enrolledStudents} students</p>
                            <p className="font-bold">{singleClass.availableSeat} seats are available</p>
                            <p>Fees: ${singleClass.price}</p>

                            <div className="card-actions justify-end gap-2">
                                <button
                                    className={
                                        `cursor-auto px-2 py-1 rounded-md border-2 font-bold ${singleClass?.status === "pending" ?
                                            "text-yellow-400 border-yellow-400" : singleClass?.status === "approved" ?
                                                "text-green-400 border-green-400" :
                                                singleClass?.status === "denied" ? "text-red-400 border-red-400" : ""}`
                                    }
                                >
                                    {
                                        singleClass?.status === "pending" ?
                                            "Pending" : singleClass?.status === "approved" ?
                                                "Approved" :
                                                singleClass?.status === "denied" ? "Denied" : ""
                                    }
                                </button>
                                <button onClick={() => handleDeleteClass(singleClass._id, refetch)} className="text-white font-bold px-2 py-1 rounded-md bg-red-500">Delete Class</button>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default MyClasses;