import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScroll } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedEvent from './components/FeaturedEvent';
import WhatIsLooseCode from './components/WhatIsLooseCode';
import WhatsHappening from './components/WhatsHappening';
import FlowFooter from './components/FlowFooter';
import FlareRedFooter from './components/FlareRedFooter';

export default function App() {
  const heroEventContainer = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroEventContainer,
    offset: ['start start', 'end end'],
  });

  // Initialize Lenis smooth scroll and connect with GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCb = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#080808] text-[#f8f8f8] selection:bg-[#0038ff] selection:text-white">
      {/* Scroll-Triggered Floating Pill Navigation */}
      <Navbar />

      {/* Hero & Featured Event 3D Deck Overlay Transition */}
      <div ref={heroEventContainer} className="relative bg-[#080808]">
        <Hero scrollYProgress={scrollYProgress} />
        <FeaturedEvent scrollYProgress={scrollYProgress} />
      </div>

      {/* What Is LooseCode: The 4 Pillars */}
      <WhatIsLooseCode />

      {/* What's Happening FAQ Section */}
      <WhatsHappening />

      {/* Giant Join Curve & Animated Rotating Badge */}
      <FlowFooter />

      {/* LooseCode Signature Blue Footer with Integrated Skew Banner & Crew Mascot */}
      <FlareRedFooter />
    </div>
  );
}
