import { STATIC_IMAGES_URL } from "@hey/data/constants";
import { motion } from "motion/react";
import { H2 } from "../Shared/UI";

const Hero = () => {
  return (
    <div
      className="relative h-64 w-full gap-y-5 rounded-xl bg-black"
      style={{
        backgroundImage: `url(${STATIC_IMAGES_URL}/hero.webp)`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="absolute bottom-5 left-5">
        <H2 className="font-extrabold text-white">
          {"Welcome to Hey".split("").map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: index * 0.02 }}
            >
              {letter}
            </motion.span>
          ))}
        </H2>
        <div className="font-extrabold text-gray-200">
          a social network built on Lens
        </div>
      </div>
    </div>
  );
};

export default Hero;
