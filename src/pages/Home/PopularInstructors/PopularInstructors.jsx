import SectionTitle from "../../../components/SectionTitle";
import useInstructor from "../../../hooks/useInstructor";

const PopularInstructors = () => {
    const [instructors, refetch] = useInstructor();
    return (
        <div>
            <SectionTitle
            heading={"our popular instructor"}
            description={"Meet our Popular Instructors - experts who inspire, guide, and empower. With industry experience and exceptional teaching skills, they bring passion to our learning community. Join their engaging classes, unlock your potential, and learn from the best."}/>
        </div>
    );
};

export default PopularInstructors;