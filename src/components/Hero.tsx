import { motion, MotionValue, useTransform } from 'framer-motion';
import { ArrowDown, Terminal } from 'lucide-react';
import heroBg from '../assets/herosectionbg.png';
import { sounds } from '../utils/audio';

export default function Hero({
  scrollYProgress,
}: {
  scrollYProgress?: MotionValue<number>;
}) {
  const scale = useTransform(scrollYProgress || ({} as any), [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress || ({} as any), [0, 1], [0, -5]);

  return (
    <motion.div
      style={scrollYProgress ? { scale, rotate } : {}}
      id="manifesto"
      className="w-full h-screen relative text-white overflow-hidden flex flex-col justify-between p-6 sm:p-10 md:p-12 select-none sticky top-0 left-0 z-10 origin-center bg-black"
    >
      {/* Background Hero Image - Positioned to show full LOOSECODE text & Earth */}
      <img
        src={heroBg}
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover object-left md:object-[15%_center] translate-x-4 sm:translate-x-8 md:translate-x-14 pointer-events-none z-0 scale-90 sm:scale-[0.92] transition-all duration-300"
      />

      {/* Top Spacer for Navbar */}
      <div className="pt-20 md:pt-24 relative z-10" />

      {/* Spacer to push content to the bottom cleanly */}
      <div className="flex-1 relative z-10" />

      {/* Bottom Hero Subtext with Editorial Accents & Action Buttons */}
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

        {/* Action Button & Scroll Trigger */}
        <div className="flex items-center gap-4">
          <a
            href="#events"
            onClick={() => sounds.playBlip(550)}
            onMouseEnter={() => sounds.playHover()}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-[#bfff0a] hover:text-black transition-all shadow-xl cursor-pointer"
          >
            <Terminal size={14} />
            <span>Explore Sprints</span>
          </a>

          <a
            href="#events"
            aria-label="Scroll to events"
            className="p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/20 hover:bg-white hover:text-black transition-all group"
          >
            <ArrowDown size={16} className="animate-bounce" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

