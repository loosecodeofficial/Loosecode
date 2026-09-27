import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, cubicBezier } from 'framer-motion';
import { sounds } from '../utils/audio';

// Action Arrow SVG
function ActionArrow({ className = '', fill = '#080808' }: { className?: string; fill?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 22 19"
      width="22"
      height="19"
      fill={fill}
      className={className}
    >
      <path d="m10.392 16.88 7.232-7.264-7.264-7.232 1.696-1.76 8.992 8.992-8.96 8.992zM.568 8.304h18.4v2.656H.568z" />
    </svg>
  );
}

export default function ClosingSkewBanner({ onLetsBuildClick }: { onLetsBuildClick?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseIn, setMouseIn] = useState(false);

  // Angular scroll transform: translate 0 -> -14%, rotate 0 -> -12deg
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['1 1', '1 0'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-14%']);
  const rotate = useTransform(scrollYProgress, [0, 1], ['0deg', '-12deg']);

  const text = "Let's build";
  const xDuration = 0.08;

  return (
    <div ref={containerRef} className="relative z-20 overflow-visible">
      <motion.div
        style={{ x, rotate }}
        className="origin-[0%_50%] bg-[#f8f8f8] text-[#080808] will-change-transform shadow-2xl pb-10 sm:pb-16"
      >
        {/* "Let's Build" Call To Action Bar */}
        <motion.div
          initial="initial"
          whileHover="whileHover"
          onMouseEnter={() => {
            sounds.playHover();
            setMouseIn(true);
          }}
          onMouseLeave={() => setMouseIn(false)}
          onClick={() => {
            sounds.playPop();
            onLetsBuildClick?.();
          }}
          className="relative flex cursor-pointer items-center justify-between pt-24 sm:pt-36 lg:pt-44 px-8 sm:px-16 lg:px-24 mb-10 sm:mb-16"
        >
          {/* Left Arrow */}
          <motion.div
            variants={{
              initial: { x: '-100%', opacity: 0 },
              whileHover: { x: '0%', opacity: 1 },
            }}
            transition={{ duration: 0.8, ease: cubicBezier(0.19, 1, 0.22, 1) }}
            className="absolute left-8 sm:left-16 lg:left-24"
          >
            <ActionArrow className="h-10 w-12 sm:h-14 sm:w-16 lg:h-20 lg:w-24" fill="#080808" />
          </motion.div>

          {/* Letter Flicker Typography with explicit clean readable Sans font */}
          <div className="w-full flex justify-center">
            <div className="relative w-fit">
              <motion.div
                variants={{
                  initial: { x: '0px' },
                  whileHover: { x: 'clamp(20px, 4vw, 50px)' },
                }}
                transition={{ duration: 0.5, ease: cubicBezier(0.19, 1, 0.22, 1) }}
                style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                className="text-4xl sm:text-6xl md:text-7xl lg:text-[6.5vw] font-black leading-tight tracking-[-0.03em] text-[#080808] uppercase select-none flex items-center"
              >
                {text.split('').map((letter, i) => (
                  <motion.span
                    key={i}
                    initial="initial"
                    animate={mouseIn ? 'animate' : 'initial'}
                    variants={{
                      initial: { opacity: 1 },
                      animate: {
                        opacity: [1, 1, 0, 0, 1, 1],
                        transition: {
                          duration: (text.length - 1) * (xDuration / 2) + 2 * xDuration,
                          times: [
                            0,
                            i * (xDuration / 2),
                            i * (xDuration / 2) + xDuration / 2,
                            i * (xDuration / 2) + xDuration / 2 + xDuration,
                            i * (xDuration / 2) + 2 * xDuration,
                            1,
                          ],
                          repeat: 1,
                        },
                      },
                    }}
                    className="inline-block"
                  >
                    {letter === ' ' ? '\u00A0' : letter}
                  </motion.span>
                ))}
              </motion.div>

              {/* Animated Underline */}
              <motion.div
                className="absolute bottom-0 h-[2px] md:h-[4px] bg-[#080808]"
                variants={{
                  initial: { width: '100%', left: '0px', right: 'auto' },
                  whileHover: { width: '0%', right: '0%', left: 'auto' },
                }}
                transition={{ duration: 0.8, ease: cubicBezier(0.19, 1, 0.22, 1) }}
              />
            </div>
          </div>

          {/* Right Arrow */}
          <motion.div
            variants={{
              initial: { x: '0%', opacity: 1 },
              whileHover: { x: '100%', opacity: 0 },
            }}
            transition={{ duration: 0.8, ease: cubicBezier(0.19, 1, 0.22, 1) }}
            className="right-8 sm:right-16 lg:right-24"
          >
            <ActionArrow className="h-10 w-12 sm:h-14 sm:w-16 lg:h-20 lg:w-24" fill="#080808" />
          </motion.div>
        </motion.div>

        {/* Giant LOOSECODE Brutalist Trademark Logo Block */}
        <div className="w-full px-4 sm:px-8 select-none flex items-center justify-center">
          <div className="relative inline-flex items-center justify-center">
            
            {/* Wide, bold LOOSECODE Title */}
            <h2 className="text-[25vw] sm:text-[23vw] md:text-[20vw] font-black uppercase leading-[0.72] font-humane tracking-[0.06em] text-[#080808] whitespace-nowrap text-center select-none pl-[0.06em]">
              LOOSECODE
            </h2>

            {/* Trademark Symbol locked next to top right of the word */}
            <div className="absolute -top-3 -right-6 sm:-top-5 sm:-right-10 md:-top-8 md:-right-14 w-7 h-7 sm:w-10 sm:h-10 md:w-14 md:h-14 rounded-full border-2 sm:border-4 border-[#080808] flex items-center justify-center font-bold text-xs sm:text-sm md:text-xl font-mono text-[#080808]">
              R
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}
