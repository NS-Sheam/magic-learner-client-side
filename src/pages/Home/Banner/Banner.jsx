
import bannerImg from "../../../assets/banner.jpg"
import { Parallax } from "react-parallax";
import img from "../../../assets/banner-image.jpg"
const Banner = () => {
    return (
        <div>
            <Parallax
                blur={{ min: -50, max: 50 }}
                bgImage={bannerImg}
                bgImageAlt="the menu"
                strength={-200}
            >
                <div className="hero h-[700px]">
                    <div className="hero-overlay bg-opacity-60"></div>
                    <div className="hero-content text-neutral-content">
                        <div
                            className="w-1/2 space-y-4"
                            data-aos="fade-right"
                            data-aos-anchor-placement="top-bottom"
                            data-aos-duration="1000"
                        >
                            <h3 className="lg:text-6xl text-bandOrange font-bold">Start Music School Summer Camp!</h3>
                            <p>Discover the rhythm of summer at our Music School Summer Camp! Unleash your musical potential, make new friends, and have a blast with instrument lessons, ensemble rehearsals, and exciting activities. Join us for an unforgettable musical journey</p>
                        </div>
                        <div className="w-1/2 rounded-3xl">
                            <img className="rounded-3xl" src={img} alt="" />
                        </div>
                    </div>
                </div>
            </Parallax>
        </div>
    );
};

export default Banner;