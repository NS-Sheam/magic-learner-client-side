
import bannerImg from "../../../assets/banner.jpg"
import { Parallax } from "react-parallax";
import img from "../../../assets/banner-image.jpg"
import img2 from "../../../assets/banner-image2.jpg"
import img3 from "../../../assets/banner-image3.jpg"
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
const Banner = () => {
    const bannerLeft = (img) => <div className="lg:h-[700px]  bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
        {/* TODO: make small banner for mobile devices */}
        <div className="lg:flex lg:flex-row justify-between items-center text-center text-neutral-content p-4 space-y-4">
            <div
                className="my-container lg:w-1/2 space-y-4 text-center lg:text-left"
                data-aos="fade-right"
                data-aos-anchor-placement="top-bottom"
                data-aos-duration="1000"
            >
                <h3 className="text-2xl lg:text-6xl text-bandOrange font-bold">Start Music School Summer Camp!</h3>
                <p className="text-xl font-semibold">Discover the rhythm of summer at our Music School Summer Camp! Unleash your musical potential, make new friends, and have a blast with instrument lessons, ensemble rehearsals, and exciting activities. Join us for an unforgettable musical journey</p>
                <Link to="/allclass">
                    <button className="text-xl px-6 py-3 bg-bandOrange hover:bg-orange-300 hover:text-black font-bold rounded-lg">Enroll now!</button>
                </Link>
            </div>
            <div
                data-aos="fade-left"
                data-aos-anchor-placement="top-bottom"
                data-aos-duration="1000"
                className="lg:w-1/2 rounded-3xl">
                <img className="rounded-3xl" src={img} alt="" />
            </div>
        </div>
    </div>
    return (
        <div>
            <Parallax
                blur={{ min: -50, max: 50 }}
                bgImage={bannerImg}
                bgImageAlt="the menu"
                strength={-200}
            >
                <Carousel
                    autoPlay={true}
                    infiniteLoop={true}
                    interval={5000}
                    showThumbs={false}
                >

                    {
                        bannerLeft(img)
                    }
                    {
                        bannerLeft(img2)
                    }
                    {
                        bannerLeft(img3)
                    }
                </Carousel>
            </Parallax>
        </div>
    );
};

export default Banner;