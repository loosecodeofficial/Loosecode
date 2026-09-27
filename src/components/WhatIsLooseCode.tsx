import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useScroll, useTransform } from 'framer-motion';
import { sounds } from '../utils/audio';

gsap.registerPlugin(ScrollTrigger);

const serviceCards = [
  {
    id: '1',
    title: 'BUILD TOGETHER',
    description: 'Find developers, designers, and creators to turn ideas into real products.',
    bgColor: '#ed6a5a', // var(--accent1)
    textColor: '#141414',
    img: '/images/services/service-1.jpg',
  },
  {
    id: '2',
    title: 'HACK. SHIP. REPEAT.',
    description: 'Build through hackathons, challenges, and fast-paced experiences designed for makers.',
    bgColor: '#f4f1bb', // var(--accent2)
    textColor: '#141414',
    img: '/images/services/service-2.jpg',
  },
  {
    id: '3',
    title: 'SHOW YOUR WORK',
    description: 'Launch your projects, share what you built, and get discovered by the builder community.',
    bgColor: '#9bc1bc', // var(--accent3)
    textColor: '#141414',
    img: '/images/services/service-3.jpg',
  },
  {
    id: '4',
    title: 'LEVEL UP',
    description: 'Learn from other builders, collaborate on ambitious ideas, and grow through real-world building.',
    bgColor: '#141414', // var(--fg)
    textColor: '#edf1e8',
    img: '/images/services/service-4.jpg',
  },
];

export default function WhatIsLooseCode() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Parallax motion for the header text entering from the above section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'center start'],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.5], [100, -30]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.25], [0.3, 1]);

  useLayoutEffect(() => {
    let scrollTriggerInstances: ScrollTrigger[] = [];

    const initAnimations = () => {
      scrollTriggerInstances.forEach((instance) => {
        if (instance) instance.kill();
      });
      scrollTriggerInstances = [];

      if (window.innerWidth <= 1000) return;

      const services = gsap.utils.toArray<HTMLElement>('.service-card');
      if (!services.length) return;

      const mainTrigger = ScrollTrigger.create({
        trigger: services[0],
        start: 'top 50%',
        endTrigger: services[services.length - 1],
        end: 'top 150%',
      });
      scrollTriggerInstances.push(mainTrigger);

      services.forEach((service, index) => {
        const isLastServiceCard = index === services.length - 1;
        const serviceCardInner = service.querySelector<HTMLElement>('.service-card-inner');

        if (!isLastServiceCard && serviceCardInner) {
          const pinTrigger = ScrollTrigger.create({
            trigger: service,
            start: 'top 90px',
            endTrigger: '#after-services-end',
            end: 'top 85%',
            pin: true,
            pinSpacing: false,
            invalidateOnRefresh: true,
          });
          scrollTriggerInstances.push(pinTrigger);

          const scrollAnimation = gsap.to(serviceCardInner, {
            y: `-${(services.length - index) * 2.5}vh`,
            ease: 'none',
            scrollTrigger: {
              trigger: service,
              start: 'top 90px',
              endTrigger: '#after-services-end',
              end: 'top 85%',
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
          if (scrollAnimation.scrollTrigger) {
            scrollTriggerInstances.push(scrollAnimation.scrollTrigger);
          }
        }
      });
    };

    initAnimations();

    const handleResize = () => {
      initAnimations();
    };

    window.addEventListener('resize', handleResize);
    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener('resize', handleResize);
      scrollTriggerInstances.forEach((instance) => {
        if (instance) instance.kill();
      });
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="pillars"
      className="relative z-30 bg-[#080808] text-[#141414] select-none overflow-visible"
    >

      {/* Services Header with Text Parallax Entry */}
      <motion.div
        ref={headerRef}
        style={{ y: headerY, opacity: headerOpacity }}
        className="services-header relative z-10 pt-10 sm:pt-16 pb-14 max-w-6xl mx-auto text-center flex flex-col items-center justify-center px-4"
      >
        <p className="font-formula text-xs sm:text-sm font-bold uppercase tracking-widest text-[#bfff0a] mb-3 drop-shadow-md">
          // 03 // WHAT WE DO
        </p>

        <div className="services-header-title mb-6">
          <h1 className="font-rader text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] italic font-bold uppercase leading-[0.9] text-white tracking-tight drop-shadow-2xl">
            WHAT WE DO
          </h1>
        </div>

        <div className="services-header-arrow-icon text-2xl sm:text-3xl text-white font-rader font-bold animate-bounce">
          ↓
        </div>
      </motion.div>

      {/* LooseCode Pillars Pinning & Stacking Deck */}
      <div className="services relative z-20 w-full">
        {serviceCards.map((card) => (
          <div
            key={card.id}
            id={`service-card-${card.id}`}
            className="service-card relative w-full min-h-[380px] md:min-h-[420px] mb-8"
          >
            <div
              onMouseEnter={() => sounds.playHover()}
              style={{
                backgroundColor: card.bgColor,
                color: card.textColor,
              }}
              className="service-card-inner relative will-change-transform w-[calc(100vw-3em)] sm:w-[calc(100vw-4em)] max-w-5xl mx-auto p-5 sm:p-7 md:p-8 rounded-[1.8em] shadow-[0_25px_60px_rgba(0,0,0,0.6)] border-2 border-black/10 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 min-h-[280px] sm:min-h-[320px] md:min-h-[350px] max-h-[390px]"
            >
              {/* Left Column: Huge Rader Title */}
              <div className="service-card-content flex-[3] flex flex-col justify-center">
                <h1 className="font-rader text-3xl sm:text-5xl md:text-6xl lg:text-[4.2rem] italic font-bold uppercase leading-[0.88] tracking-tight text-inherit select-none">
                  {card.title}
                </h1>
                {card.description && (
                  <p className="font-formula text-sm sm:text-base md:text-lg opacity-85 mt-2 sm:mt-3 max-w-xl font-medium leading-snug tracking-normal">
                    {card.description}
                  </p>
                )}
              </div>

              {/* Right Column: Character Artwork Thumbnail */}
              <div className="service-card-img flex-1 max-w-[180px] sm:max-w-[220px] md:max-w-[250px] h-[180px] sm:h-[220px] md:h-[250px] rounded-[1.4em] overflow-hidden border-2 border-black/10 shadow-xl shrink-0 bg-black/5 flex items-center justify-center">
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-contain select-none transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Target for GSAP ScrollTrigger to cleanly end pinning */}
      <div id="after-services-end" className="h-24 w-full" />
    </section>
  );
}
