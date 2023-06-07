import logo from "../../../assets/logo.png"
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer p-10 bg-bandBlue text-white font-bold">
        <div>
            <img className="w-32" src={logo} alt="" />
            <p>Heroverse Toy Industries Ltd.<br />Providing best toy for kids</p>
        </div>
        <div>
            <span className="text-white text-xl">About</span>
            <Link to="/courses" className="link link-hover">Courses</Link>
            <Link to="/gallery" className="link link-hover">Gallery</Link>
            <Link to="/marketing" className="link link-hover">Marketing</Link>
            <Link to="/teachers" className="link link-hover">Teachers</Link>
        </div>
        <div>
            <span className="text-white text-xl">Camp</span>
            <Link to="/blogs" className="link link-hover">Blogs</Link>
            <Link to="/contact" className="link link-hover">Contact</Link>
            <Link to="/" className="link link-hover">Jobs</Link>
            <Link to="/login" className="link link-hover">Login</Link>
            <Link to="/register" className="link link-hover">register</Link>
        </div>
        <div>
            <span className="text-white text-xl">Legal</span>
            <Link to="/" className="link link-hover">Home</Link>
            <Link to="/" className="link link-hover">Terms of use</Link>
            <Link to="/" className="link link-hover">Privacy policy</Link>
            <Link to="/" className="link link-hover">Cookie policy</Link>
        </div>
    </footer>
    );
};

export default Footer;