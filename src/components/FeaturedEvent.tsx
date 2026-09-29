import { useState } from 'react';
import { motion, AnimatePresence, MotionValue, useTransform } from 'framer-motion';
import { ExternalLink, Zap, Trophy, Calendar, Sparkles } from 'lucide-react';
import { sounds } from '../utils/audio';
import { ShinyButton } from '@/components/ui/shiny-button';

export default function FeaturedEvent({
  scrollYProgress,
}: {
  scrollYProgress?: MotionValue<number>;
}) {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  const rotate = useTransform(scrollYProgress || ({} as any), [0, 1], [5, 0]);
  const scale = useTransform(scrollYProgress || ({} as any), [0, 1], [0.8, 1]);

  return (
    <motion.div
      style={scrollYProgress ? { scale, rotate } : {}}
      id="events"
      className="w-full min-h-screen bg-[#0d0d0d] text-white sticky top-0 left-0 z-20 pt-20 sm:pt-24 md:pt-28 pb-16 px-4 sm:px-8 md:px-12 lg:px-16 flex flex-col justify-center border-t border-white/10 origin-center select-none overflow-hidden"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col justify-center">
        {/* Top Header: EVENTS + Subtitle */}
        <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10">
          <span className="flex text-[110px] sm:text-[140px] md:text-[170px] lg:text-[190px] uppercase leading-[0.78] font-humane font-normal text-white tracking-tight">
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

          <h2 className="text-xs sm:text-sm md:text-base font-helvetica uppercase text-left lg:text-right max-w-sm sm:max-w-md leading-relaxed text-gray-300">
            Our virtual hackathons & sprints feature the{' '}
            <span className="text-lg sm:text-xl font-bodoni lowercase text-[#bfff0a]">
              top talent{' '}
            </span>
            in the design & development{' '}
            <span className="text-lg sm:text-xl font-bodoni lowercase text-[#ff7bca]">
              space.
            </span>
          </h2>
        </div>

        {/* Toggle Switch Bar: UPCOMING vs PAST (Minimalist Editorial Style) */}
        <div className="flex items-center justify-between mb-8">
          <div className="inline-flex items-center p-1.5 bg-[#121214] border-2 border-white/20 rounded-full shadow-2xl backdrop-blur-md">
            <button
              onClick={() => {
                sounds.playPop();
                setActiveTab('upcoming');
              }}
              onMouseEnter={() => sounds.playHover()}
              className={`relative px-6 sm:px-8 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-medium transition-colors duration-200 cursor-pointer select-none ${activeTab === 'upcoming' ? 'text-black' : 'text-white hover:text-white/80'
                }`}
            >
              {activeTab === 'upcoming' && (
                <motion.div
                  layoutId="activeEventTabPill"
                  className="absolute inset-0 bg-white rounded-full shadow-md"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}
              <span className="relative z-10 inline-flex items-start tracking-tight">
                Upcoming
                <span className="text-[10px] sm:text-[11px] font-mono font-medium -top-1.5 relative ml-0.5">
                  01
                </span>
              </span>
            </button>

            <button
              onClick={() => {
                sounds.playPop();
                setActiveTab('past');
              }}
              onMouseEnter={() => sounds.playHover()}
              className={`relative px-6 sm:px-8 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-medium transition-colors duration-200 cursor-pointer select-none ${activeTab === 'past' ? 'text-black' : 'text-white hover:text-white/80'
                }`}
            >
              {activeTab === 'past' && (
                <motion.div
                  layoutId="activeEventTabPill"
                  className="absolute inset-0 bg-white rounded-full shadow-md"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}
              <span className="relative z-10 inline-flex items-start tracking-tight">
                Past
                <span className="text-[10px] sm:text-[11px] font-mono font-medium -top-1.5 relative ml-0.5">
                  02
                </span>
              </span>
            </button>
          </div>

          <span className="hidden sm:inline-block font-mono text-[11px] text-gray-400 uppercase tracking-widest">
            {activeTab === 'upcoming' ? '// 1 LIVE EVENT' : '// 0 PAST EVENTS'}
          </span>
        </div>

        {/* Tab Content Display */}
        <AnimatePresence mode="wait">
          {activeTab === 'upcoming' ? (
            /* Upcoming Events Card (Rizz & Code) */
            <motion.div
              key="upcoming-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full bg-[#141417] border border-white/15 rounded-[32px] sm:rounded-[40px] p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden group"
            >
              {/* Ambient Glows */}
              <div className="absolute -top-32 -left-32 w-80 h-80 bg-[#0052FF]/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-[#0052FF]/25 rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                {/* Left Column: Banner Image */}
                <div className="lg:col-span-5 flex justify-center">
                  <a
                    href="https://luma.com/2tu7l2wx"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => sounds.playBlip(700)}
                    onMouseEnter={() => sounds.playHover()}
                    className="relative block w-full max-w-[360px] aspect-square rounded-[24px] sm:rounded-[28px] overflow-hidden border border-white/20 shadow-2xl group/img cursor-pointer"
                  >
                    <img
                      src="/images/rizzcode_banner.jpg"
                      alt="Rizz & Code 2026 Event Banner"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                    />
                  </a>
                </div>

                {/* Right Column: Event Details & Action */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                  <div>
                    {/* Compact Badges */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0052FF] text-white font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider border border-white/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                        ONLINE HACKATHON
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white/90 font-mono text-[10px] sm:text-[11px] font-bold uppercase border border-white/10">
                        OCT 1 - OCT 17
                      </span>
                    </div>

                    {/* Event Title & Tagline */}
                    <h3 className="text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-white font-['Oswald',sans-serif] leading-none">
                      RIZZ & CODE 2026
                    </h3>
                    <p className="text-sm sm:text-base font-mono font-bold text-white mt-2 tracking-wide uppercase">
                      "Code Hard. Rizz Harder."
                    </p>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-gray-300 font-sans mt-3 leading-relaxed max-w-xl">
                      An online hackathon for engineering students, developers, freshers, and early-career builders. Identify a problem, design a solution, and build a functional project with AI, Web, Mobile, Cloud, Automation, or any stack of your choice.
                    </p>

                    {/* Highlights */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-5 pt-5 border-t border-white/10 text-xs font-mono text-white">
                      <div className="flex items-center gap-2">
                        <Zap size={15} className="text-white shrink-0" />
                        <span>48H+ Sprint</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy size={15} className="text-white shrink-0" />
                        <span>Revealed Soon</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={15} className="text-white shrink-0" />
                        <span>Virtual & Global</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button - Shiny Button */}
                  <div className="pt-2">
                    <ShinyButton
                      href="https://luma.com/2tu7l2wx"
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => sounds.playBlip(700)}
                      className="uppercase tracking-wider font-mono font-bold text-xs sm:text-sm"
                    >
                      REGISTER ON LUMA
                      <ExternalLink size={16} />
                    </ShinyButton>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Clean Empty State for Past Events */
            <motion.div
              key="past-empty-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full bg-[#141417] border border-white/15 rounded-[32px] sm:rounded-[40px] p-8 sm:p-12 text-center flex flex-col items-center justify-center min-h-[320px] relative overflow-hidden shadow-2xl"
            >
              <div className="absolute -top-32 -left-32 w-80 h-80 bg-[#0052FF]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#B3EB16] mb-4">
                <Sparkles size={28} />
              </div>
              <span className="text-xs font-mono text-[#B3EB16] font-bold uppercase tracking-widest mb-1">
                // ARCHIVE STATUS
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white font-['Oswald',sans-serif]">
                NO PAST EVENTS YET
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 font-sans mt-2 max-w-md leading-relaxed">
                LooseCode is just getting started! Our upcoming hackathons, sprint showcases, and winner archives will appear here after completion.
              </p>
              <button
                onClick={() => {
                  sounds.playPop();
                  setActiveTab('upcoming');
                }}
                onMouseEnter={() => sounds.playHover()}
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#B3EB16] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-white transition-all cursor-pointer shadow-lg"
              >
                <span>VIEW UPCOMING EVENT</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
