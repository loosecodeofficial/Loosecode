import React from 'react';
import { motion } from 'framer-motion';
import { sounds } from '../utils/audio';
import footerImg from '../assets/loosefooterr.png';
import ClosingSkewBanner from './ClosingSkewBanner';

// Custom Underline on Hover
function UnderlineLink({
  children,
  href = '#',
  className = '',
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
}) {
  return (
    <motion.a
      href={href}
      initial="initial"
      whileHover="whileHover"
      onMouseEnter={() => sounds.playHover()}
      className={`relative inline-block w-fit text-[#f8f8f8] no-underline leading-snug cursor-pointer ${className}`}
    >
      {children}
      <motion.div
        className="absolute bottom-0 h-[1.5px] bg-[#f8f8f8]"
        variants={{
          initial: { width: '0%', left: '0%' },
          whileHover: { width: '100%', left: '0%' },
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      />
    </motion.a>
  );
}

export default function FlareRedFooter() {
  const socialLinks = [
    { name: 'Discord Server', href: 'https://discord.gg/kjswHJhNwF' },
    { name: 'WhatsApp Group', href: 'https://chat.whatsapp.com/FlTVlEFRyQA3ofrkmT42It' },
    { name: 'GitHub Org', href: 'https://github.com' },
    { name: 'X / Twitter', href: 'https://x.com' },
    { name: 'YouTube Live', href: 'https://youtube.com' },
    { name: 'Substack Weekly', href: 'https://substack.com' },
    { name: 'Figma Community', href: 'https://figma.com' },
  ];

  const navLinks = [
    { label: 'Manifesto', href: '#manifesto' },
    { label: 'Hackathons', href: '#events' },
    { label: 'Four Pillars', href: '#pillars' },
    { label: 'Core Builders', href: '#builders' },
  ];

  const scrollToTop = () => {
    sounds.playBlip(800);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative w-full overflow-clip bg-[#0038ff] font-sans selection:bg-[#f8f8f8] selection:text-[#0038ff]">
      {/* 1. Skew Scroll "LET'S BUILD" & "LOOSECODE" white animated banner on blue */}
      <ClosingSkewBanner />

      {/* 2. Blue Content Footer */}
      <footer
        id="contact"
        className="relative z-10 bg-[#0038ff] text-[#f8f8f8] px-4 md:px-10 pt-10 pb-8 overflow-hidden font-sans"
      >
      <div className="w-full relative z-20">
        
        {/* Exact Grid Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-9 gap-y-12 lg:gap-y-0">
          
          {/* Column 1-4: Reach Out */}
          <div className="lg:col-span-4">
            <span className="flex items-center text-xs font-mono uppercase tracking-widest opacity-90 mb-3">
              <span className="font-light">/</span>&nbsp; Reach Out & Join
            </span>
            <div className="flex flex-col text-[18px] sm:text-[22px] lg:text-[1.7vw] font-bold tracking-tight leading-tight space-y-2">
              <UnderlineLink href="mailto:loosecodeofficial@gmail.com">
                loosecodeofficial@gmail.com
              </UnderlineLink>
              <div className="flex items-center">
                <span>/&nbsp;</span>
                <UnderlineLink href="https://discord.gg/kjswHJhNwF">
                  Discord Server
                </UnderlineLink>
              </div>
              <div className="flex items-center">
                <span>/&nbsp;</span>
                <UnderlineLink href="https://chat.whatsapp.com/FlTVlEFRyQA3ofrkmT42It">
                  WhatsApp Group
                </UnderlineLink>
              </div>
            </div>
          </div>

          {/* Column 7-9: Channels & Navigation on the right side */}
          <div className="lg:col-span-3 lg:col-start-7 flex justify-between gap-x-8 text-[13px] lg:text-[1.15vw] leading-relaxed font-medium">
            
            {/* Channels */}
            <div className="space-y-3">
              <span className="flex items-center text-xs font-mono uppercase tracking-widest opacity-90">
                <span className="font-light">/</span>&nbsp; Channels
              </span>
              <div className="flex flex-col space-y-0.5">
                {socialLinks.map((item) => (
                  <UnderlineLink key={item.name} href={item.href}>
                    {item.name}
                  </UnderlineLink>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="space-y-3">
              <span className="flex items-center text-xs font-mono uppercase tracking-widest opacity-90">
                <span className="font-light">/</span>&nbsp; Navigation
              </span>
              <div className="flex flex-col space-y-0.5">
                {navLinks.map((item) => (
                  <UnderlineLink key={item.label} href={item.href}>
                    {item.label}
                  </UnderlineLink>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom Row: Copyright, Links, UP Button */}
          <div className="col-span-1 lg:col-span-9 mt-16 lg:mt-24 flex flex-wrap items-end justify-between gap-x-4 gap-y-2 text-[11px] lg:text-[1.2vw] font-bold uppercase tracking-tight">
            <span>© 2026 LOOSECODE DEVELOPER COLLECTIVE</span>
            <div className="flex items-center gap-4">
              <UnderlineLink href="#manifesto">Manifesto</UnderlineLink>
              <span className="font-light">/</span>
              <UnderlineLink href="#rules">Rules</UnderlineLink>
              <span className="font-light">/</span>
              <button
                onClick={scrollToTop}
                className="cursor-pointer uppercase tracking-widest hover:text-[#bfff0a] transition-colors font-mono font-bold"
              >
                [ UP ↑ ]
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Center Background Graphic Illustration positioned accurately in column 3-5 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-[18%] lg:left-[28%] z-10 w-[68vw] lg:w-[28vw] max-w-[480px] select-none"
      >
        <img
          src={footerImg}
          alt="LooseCode Crew"
          className="h-auto w-full object-contain drop-shadow-2xl"
        />
      </div>
    </footer>
    </div>
  );
}
