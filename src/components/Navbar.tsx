import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sounds } from '../utils/audio';
import logoImg from '../assets/logo.png';

interface NavItem {
  id: number;
  title: string;
  href: string;
}

const navItems: NavItem[] = [
  { id: 1, title: 'EVENTS', href: '#events' },
  { id: 2, title: 'WHO WE ARE', href: '#manifesto' },
  { id: 3, title: 'FOUR PILLARS', href: '#pillars' },
  { id: 4, title: 'CORE BUILDERS', href: '#builders' },
  { id: 5, title: 'ON DEMAND & SPRINTS', href: '#contact' },
];

const socialItems = [
  { id: 'discord', src: '/icons/discord.svg', alt: 'Discord', href: 'https://discord.com' },
  { id: 'twitter', src: '/icons/twitter.svg', alt: 'Twitter / X', href: 'https://x.com' },
  { id: 'insta', src: '/icons/insta.svg', alt: 'Instagram', href: 'https://instagram.com' },
  { id: 'youtube', src: '/icons/yoututbe.svg', alt: 'YouTube', href: 'https://youtube.com' },
];

// Double Text Hover Effect
function LooseCodeTextHover({ title }: { title: string }) {
  return (
    <div className="w-full group overflow-hidden cursor-pointer py-1">
      <div className="relative h-6 overflow-hidden">
        <span className="block text-sm sm:text-base font-bold uppercase tracking-wider text-[#1c1c1c] transition-transform duration-300 ease-out group-hover:-translate-y-full">
          {title}
        </span>
        <span className="absolute top-0 left-0 block text-sm sm:text-base font-bold uppercase tracking-wider text-[#1c1c1c] transition-transform duration-300 ease-out translate-y-full group-hover:translate-y-0 italic font-serif">
          {title}
        </span>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      sounds.playBlip(600);
      setIsOpen(false);
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 pointer-events-none">
      {/* Top Bar matching Flow Party structure */}
      <div
        className={`w-full flex justify-between items-center py-4 sm:py-5 px-5 sm:px-10 transition-all duration-300 ${
          isScrolled ? 'bg-[#080808]/40 backdrop-blur-sm' : 'bg-transparent'
        }`}
      >
        {/* Left Side: LooseCode Brand Logo */}
        <div className="pointer-events-auto flex items-center gap-3">
          <a
            href="#"
            onMouseEnter={() => sounds.playHover()}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden flex items-center justify-center shadow-lg border border-white/20 group-hover:scale-105 transition-transform duration-300 shrink-0 bg-[#0038ff]">
              <img
                src={logoImg}
                alt="LooseCode Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-['Space_Grotesk',sans-serif] font-bold tracking-tight text-xl sm:text-2xl text-white select-none flex items-center">
              LOOSECODE<span className="text-white/70 text-xs font-medium ml-1">™</span>
            </span>
          </a>
        </div>

        {/* Center: Exact Hanging Flow Party Lime Dropdown Menu */}
        <div className="pointer-events-auto absolute left-1/2 -translate-x-1/2 top-0 z-[100]">
          <motion.div
            initial={{ y: -430 }}
            animate={{ y: isOpen ? -20 : -430 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-[92vw] max-w-[520px] flex flex-col items-center"
          >
            {/* Top Menu Card with lime background */}
            <div className="bg-[#B3EB16] p-8 sm:p-10 w-full rounded-[45px] -mb-24 z-10 shadow-2xl">
              <div className="flex flex-col pt-6 pb-2">
                {navItems.map((item) => (
                  <div key={item.id} className="flex py-2 flex-col">
                    <a
                      href={item.href}
                      onClick={(e) => handleLinkClick(e, item.href)}
                      onMouseEnter={() => sounds.playHover()}
                    >
                      <LooseCodeTextHover title={item.title} />
                    </a>
                    <span className="w-full border-b border-[#1c1c1c]/20" />
                  </div>
                ))}
              </div>

              {/* Social Icons row */}
              <div className="w-full flex items-center justify-center py-3 gap-3">
                {socialItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => sounds.playHover()}
                    className="p-1 opacity-60 hover:opacity-100 transition-all duration-200 hover:-translate-y-1 cursor-pointer"
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-6 h-6"
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Bottom SVG Tab that matches the width of the card */}
            <div
              onClick={() => {
                sounds.playPop();
                setIsOpen(!isOpen);
              }}
              className="relative w-full cursor-pointer select-none"
            >
              <img
                src="/icons/menuDrop.svg"
                alt="Menu Tab"
                className="w-full h-auto object-contain block drop-shadow-lg pointer-events-auto"
              />

              {/* Animated Hamburger / Close Lines inside the hanging drop tab */}
              <div className="absolute left-1/2 bottom-5 sm:bottom-6 -translate-x-1/2">
                <button
                  type="button"
                  aria-label="Toggle Navigation Menu"
                  className="cursor-pointer flex flex-col items-center justify-center p-1"
                >
                  <div
                    className={`w-[26px] h-[2.5px] rounded-full transition-all duration-300 bg-[#1c1c1c] ${
                      isOpen ? 'rotate-45 translate-y-[2.5px]' : 'rotate-0 mb-1'
                    }`}
                  />
                  <div
                    className={`w-[26px] h-[2.5px] rounded-full transition-all duration-200 bg-[#1c1c1c] ${
                      isOpen ? 'opacity-0 scale-0 my-0' : 'opacity-100 mb-1'
                    }`}
                  />
                  <div
                    className={`w-[26px] h-[2.5px] rounded-full transition-all duration-300 bg-[#1c1c1c] ${
                      isOpen ? '-rotate-45 -translate-y-[2.5px]' : 'rotate-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Outline Action Buttons */}
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
          <a
            href="https://discord.com"
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => sounds.playHover()}
            onClick={() => sounds.playBlip(700)}
            className="hidden sm:inline-flex px-4 py-2 border-2 border-white rounded-full text-xs sm:text-sm text-white uppercase font-bold tracking-tight hover:bg-white hover:text-black transition-all duration-300 cursor-pointer shadow-sm"
          >
            JOIN COMMUNITY
          </a>
          <a
            href="#contact"
            onMouseEnter={() => sounds.playHover()}
            onClick={(e) => handleLinkClick(e, '#contact')}
            className="px-4 py-2 border-2 border-white bg-white text-black sm:bg-transparent sm:text-white rounded-full text-xs sm:text-sm uppercase font-bold tracking-tight hover:bg-white hover:text-black transition-all duration-300 cursor-pointer shadow-sm"
          >
            ENROLL NOW
          </a>
        </div>
      </div>
    </header>
  );
}
