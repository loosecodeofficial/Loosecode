import { motion } from 'framer-motion';
import { sounds } from '../utils/audio';

export default function FlowFooter() {
  return (
    <footer className="w-full pt-28 sm:pt-36 md:pt-44 px-6 sm:px-10 bg-black text-white relative z-20 overflow-hidden select-none">
      {/* JOIN THE in Powerful Extended Typography */}
      <h1 className="text-[12vw] sm:text-[14vw] md:text-[15vw] uppercase leading-none text-center tracking-tight font-formula-extended font-bold text-white">
        JOIN THE
      </h1>

      {/* Giant Wavy Curve with Animated Spinning Badge */}
      <div className="relative w-full flex items-center justify-center my-4 sm:my-8">
        <img
          src="/images/buildCurveTextWhite.svg"
          alt="Build Curve"
          className="w-[92%] sm:w-[82%] md:w-[70%] h-auto object-contain select-none pointer-events-none"
        />

        {/* Rotating Circular Pink Badge */}
        <div className="absolute -bottom-8 sm:-bottom-14 md:-bottom-20 right-4 sm:right-16 md:right-36 lg:right-56 z-20">
          <div className="relative flex items-center justify-center">
            <motion.img
              animate={{ rotate: [0, 360] }}
              transition={{
                duration: 7,
                ease: 'linear',
                repeat: Infinity,
              }}
              src="/images/circlerotation.svg"
              alt="Party Badge"
              className="w-28 h-28 sm:w-40 sm:h-40 md:w-56 md:h-56 select-none"
            />
            <span className="text-3xl sm:text-5xl md:text-[60px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 uppercase leading-tight font-humane font-normal text-black pointer-events-none">
              party
            </span>
          </div>
        </div>
      </div>

      {/* Enroll / Join Button */}
      <div className="w-full flex items-center justify-center pt-16 pb-20 sm:pt-20 sm:pb-28">
        <a
          href="#manifesto"
          onClick={() => sounds.playBlip(650)}
          onMouseEnter={() => sounds.playHover()}
          className="px-8 sm:px-12 py-3.5 sm:py-4 border-2 border-white rounded-full text-xs sm:text-sm md:text-base text-white leading-tight tracking-wider uppercase font-medium font-helvetica hover:bg-white hover:text-black transition-all ease-in-out duration-300 shadow-2xl cursor-pointer"
        >
          enroll now
        </a>
      </div>
    </footer>
  );
}
