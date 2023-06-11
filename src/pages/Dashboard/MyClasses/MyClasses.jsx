import { Link, useNavigate } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import useClasses from "../../../hooks/useClasses";
import { handleDeleteClass } from "../../../utilities/handleDeleteClass";
import { useState } from "react";
import FeedBackModal from "../../../components/FeedBackModal";
import SingleMyClass from "./SingleMyClass";

const MyClasses = () => {
    const [classes, classLoading, refetch] = useClasses();
    const { user, loading } = useAuth();
    const filterMyClasses = classes?.filter(singleClass => singleClass.instructor === user.displayName);
    const [selectedClass, setSelectedClass] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();
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
                    filterMyClasses?.map(singleClass => <SingleMyClass
                        key={singleClass._id}
                        singleClass={singleClass}
                         navigate={navigate}
                          setModalOpen={setModalOpen}
                           setSelectedClass={setSelectedClass}
                            handleDeleteClass={handleDeleteClass}
                             refetch={refetch}
                             />)
                }
                {
                    modalOpen &&
                    <FeedBackModal
                        setModalOpen={setModalOpen}
                        selectedClass={selectedClass}
                    />
                }
            </div>
        </div>
    );
};

export default MyClasses;