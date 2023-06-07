
import logo from "../assets/logo.png"
const SectionTitle = ({ heading, description }) => {
    const head = heading.split(' ');
    // console.log(head);
    return (
        <div className="text-center lg:my-8 space-y-4 mx-auto">
            <h2 className="lg:text-3xl font-bold text-bandOrange uppercase">{heading}</h2>
            <img className="h-10 w-10 mx-auto" src={logo} alt="" />
            <p className="lg:w-2/3 mx-auto">{description}</p>
        </div>
    );
};

export default SectionTitle;