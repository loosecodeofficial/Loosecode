import { motion, MotionValue, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { sounds } from '../utils/audio';

const bentoTracks = [
  {
    id: '01',
    title: 'CREATIVE CODE',
    classes: '26 SPRINTS',
    color: '#6C47FF',
    textColor: '#ffffff',
  },
  {
    id: '02',
    title: 'AI AGENTS',
    classes: '18 SPRINTS',
    color: '#0038FF',
    textColor: '#ffffff',
  },
  {
    id: '03',
    title: 'WASM & 3D',
    classes: '32 SPRINTS',
    color: '#99CCFF',
    textColor: '#080808',
  },
  {
    id: '04',
    title: 'FULL-STACK',
    classes: '14 SPRINTS',
    color: '#B5E853',
    textColor: '#080808',
  },
];

export default function FeaturedEvent({
  scrollYProgress,
}: {
  scrollYProgress?: MotionValue<number>;
}) {
  const rotate = useTransform(scrollYProgress || ({} as any), [0, 1], [5, 0]);
  const scale = useTransform(scrollYProgress || ({} as any), [0, 1], [0.8, 1]);

  return (
    <motion.div
      style={scrollYProgress ? { scale, rotate } : {}}
      id="events"
      className="w-full min-h-screen bg-[#1C1C1C] text-white sticky top-0 left-0 z-20 pt-20 sm:pt-24 md:pt-28 pb-10 sm:pb-14 px-4 sm:px-8 md:px-12 lg:px-16 flex flex-col justify-center border-t-2 border-white/10 origin-center select-none"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col justify-center">
        {/* Top Header: EVENTS + Editorial Subtitle */}
        <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 pb-4 sm:pb-6 mb-4 sm:mb-6 border-b border-white/10">
          <span className="flex text-[110px] sm:text-[150px] md:text-[180px] lg:text-[210px] uppercase leading-[0.8] font-humane font-normal text-white overflow-hidden">
            {'events'.split('').map((item: string, i: number) => (
              <div key={i} className="overflow-hidden">
                <motion.p
                  initial={{ y: '100%' }}
                  whileInView={{ y: 0 }}
                  transition={{
                    delay: i * 0.05,
                    duration: 0.5,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  viewport={{ once: true }}
                >
                  {item}
                </motion.p>
              </div>
            ))}
          </span>

          <h2 className="text-sm sm:text-base md:text-xl font-helvetica uppercase text-left lg:text-right max-w-sm sm:max-w-md leading-tight text-white">
            Our virtual hackathons & sprints feature the{' '}
            <span className="text-xl sm:text-2xl md:text-3xl font-bodoni lowercase text-[#bfff0a]">
              top talent{' '}
            </span>
            in the design & development{' '}
            <span className="text-xl sm:text-2xl md:text-3xl font-bodoni lowercase text-[#ff7bca]">
              space.
            </span>
          </h2>
        </div>

        {/* Bento Grid: Fitted to screen height with matching left/right card heights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
          {/* Left Master Card (Yellow / Gold) - Fits perfectly in viewport */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="lg:col-span-6 bg-[#FFCC4D] text-[#080808] rounded-[24px] sm:rounded-[32px] p-5 sm:p-7 md:p-8 flex flex-col justify-between shadow-2xl relative border-2 border-black min-h-[280px] sm:h-[340px] md:h-[370px]"
          >
            {/* Main Headline with exact reference styling & circled badge */}
            <div className="mt-1">
              <h3 className="text-2xl sm:text-4xl md:text-[2.8rem] font-bold uppercase tracking-tight leading-[0.92] text-black font-['Oswald',sans-serif] select-none">
                EXPLORE{' '}
                <span className="relative inline-block px-2.5 sm:px-3 py-0.5 border-2 sm:border-3 border-black rounded-full italic font-sans text-xl sm:text-3xl align-middle mx-1">
                  48H+
                </span>
                <br />
                SHIP-A-THONS
                <br />
                AND GAIN NEW
                <br />
                SKILLS
              </h3>
            </div>

            {/* Bottom Action Arrow Button */}
            <div className="flex items-center justify-between pt-3">
              <span className="text-[11px] sm:text-xs font-mono font-bold uppercase text-black/70">
                ACTIVE SEASON 04 • $15,000 IN GRANTS
              </span>
              <a
                href="#contact"
                onClick={() => sounds.playPop()}
                onMouseEnter={() => sounds.playHover()}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black text-white flex items-center justify-center hover:bg-[#0038ff] hover:scale-110 transition-all shadow-xl cursor-pointer"
                aria-label="Register for event"
              >
                <ArrowUpRight size={20} />
              </a>
            </div>
          </motion.div>

          {/* Right 4 Bento Track Cards (2x2 Grid) matching exact reference height */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-3 sm:gap-4 min-h-[280px] sm:h-[340px] md:h-[370px]">
            {bentoTracks.map((track) => (
              <motion.div
                key={track.id}
                whileHover={{ y: -3, scale: 1.02 }}
                onMouseEnter={() => sounds.playHover()}
                className="rounded-[20px] sm:rounded-[26px] p-4 sm:p-5 flex flex-col justify-between shadow-xl border-2 border-black cursor-pointer transition-all min-h-[132px] sm:h-[162px] md:h-[177px]"
                style={{
                  backgroundColor: track.color,
                  color: track.textColor,
                }}
              >
                {/* Title & Subtitle in clean Oswald font */}
                <div>
                  <h4 className="text-base sm:text-xl md:text-2xl font-bold uppercase tracking-tight leading-tight font-['Oswald',sans-serif] mb-0.5 sm:mb-1">
                    {track.title}
                  </h4>
                  <p className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider opacity-80">
                    {track.classes}
                  </p>
                </div>

                {/* Bottom Action Arrow Button */}
                <div className="flex items-end justify-end">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black text-white flex items-center justify-center transition-transform hover:scale-110 shadow-md">
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
