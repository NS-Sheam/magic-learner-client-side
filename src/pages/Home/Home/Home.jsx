import Banner from "../Banner/Banner";
import GurdianMessage from "../GurdianMessage/GurdianMessage";
import PopularClasses from "../PopularClasses/PopularClasses";
import PopularInstructors from "../PopularInstructors/PopularInstructors";

const Home = () => {
    return (
        <div>
            <Banner />
            <PopularClasses />
            <PopularInstructors />
            <GurdianMessage />
        </div>
    );
};

export default Home;