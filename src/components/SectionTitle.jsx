import { motion } from "framer-motion";
import logo from "../assets/logo.png";

const SectionTitle = ({ heading, description }) => {
  // console.log(head);
  return (
    <div className="text-center lg:my-8 space-y-4 mx-auto">
      <h2 className="lg:text-3xl font-bold text-bandOrange uppercase">{heading}</h2>
      <motion.img
        className="h-10 w-10 mx-auto"
        src={logo}
        alt=""
        animate={{
          scale: [1, 1.2, 1.2, 1, 1],
          rotate: [0, 0, 360, 360, 0],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
          repeatDelay: 1,
        }}
      />
      <p className="lg:w-2/3 mx-auto">{description}</p>
    </div>
  );
};

export default SectionTitle;
