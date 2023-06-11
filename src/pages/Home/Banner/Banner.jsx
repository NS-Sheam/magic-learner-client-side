
import bannerImg from "../../../assets/banner.jpg"
import { Parallax } from "react-parallax";
import img from "../../../assets/banner-image.jpg"
import img2 from "../../../assets/banner-image2.jpg"
import img3 from "../../../assets/banner-image3.jpg"
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
const Banner = () => {
    const bannerLeft = (img) => <div className="hero h-[700px]">
        {/* TODO: make small banner for mobile devices */}
        <div className="hero-content text-neutral-content">
            <div
                className="my-container w-1/2 space-y-4 text-left"
                data-aos="fade-right"
                data-aos-anchor-placement="top-bottom"
                data-aos-duration="1000"
            >
                <h3 className="lg:text-6xl text-bandOrange font-bold">Start Music School Summer Camp!</h3>
                <p>Discover the rhythm of summer at our Music School Summer Camp! Unleash your musical potential, make new friends, and have a blast with instrument lessons, ensemble rehearsals, and exciting activities. Join us for an unforgettable musical journey</p>
                <button className="text-xl px-6 py-3 bg-bandOrange hover:bg-orange-300 hover:text-black font-bold rounded-lg">Enroll now!</button>
            </div>
            <div
                data-aos="fade-left"
                data-aos-anchor-placement="top-bottom"
                data-aos-duration="1000"
                className="w-1/2 rounded-3xl">
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