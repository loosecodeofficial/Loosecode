import { motion, MotionValue, useTransform } from 'framer-motion';
import heroBg from '../assets/herosectionbg.png';
import mobileHeroBg from '../assets/mobileheroimage.png';

export default function Hero({
  scrollYProgress,
}: {
  scrollYProgress?: MotionValue<number>;
}) {
  const scale = useTransform(scrollYProgress || ({} as any), [0, 0.5], [1, 0.85]);
  const rotate = useTransform(scrollYProgress || ({} as any), [0, 0.5], [0, -5]);

  return (
    <motion.div
      style={scrollYProgress ? { scale, rotate } : {}}
      id="manifesto"
      className="w-full h-screen relative text-white overflow-hidden flex flex-col justify-between p-6 sm:p-10 md:p-12 select-none sticky top-0 left-0 z-10 origin-center bg-black"
    >
      {/* Desktop Hero Image - Preserved exactly as it is */}
      <img
        src={heroBg}
        alt="Hero Background"
        className="hidden md:block absolute inset-0 w-full h-full object-cover object-left md:object-[15%_center] translate-x-4 sm:translate-x-8 md:translate-x-14 pointer-events-none z-0 scale-90 sm:scale-[0.92] transition-all duration-300"
      />

      {/* Mobile Hero Image - Only for mobile devices (< 768px) */}
      <img
        src={mobileHeroBg}
        alt="Mobile Hero Background"
        className="block md:hidden absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-0 transition-all duration-300"
      />

      {/* Top Spacer for Navbar */}
      <div className="pt-20 md:pt-24 relative z-10" />

      {/* Spacer to push content to the bottom cleanly */}
      <div className="flex-1 relative z-10" />

      {/* Bottom Hero Subtext with Editorial Accents */}
      <div className="relative z-20 w-full flex flex-col md:flex-row items-center justify-between gap-6 pt-6 pb-2 sm:pb-4 text-white border-t border-white/20 mt-auto">
        {/* Editorial Builder Tagline */}
        <h2 className="text-base sm:text-lg md:text-xl font-helvetica uppercase text-center md:text-left max-w-xl leading-relaxed text-white drop-shadow-md">
          LooseCode is a{' '}
          <span className="font-bodoni lowercase text-2xl sm:text-3xl text-[#bfff0a]">
            community
          </span>{' '}
          for builders and creators, powered by hackathons, challenges, and{' '}
          <span className="font-bodoni lowercase text-2xl sm:text-3xl text-[#ff7bca]">
            events
          </span>{' '}
          to collaborate, compete, and{' '}
          <span className="font-bodoni lowercase text-2xl sm:text-3xl text-[#bfff0a]">
            ship.
          </span>
        </h2>
      </div>
    </motion.div>
  );
}

