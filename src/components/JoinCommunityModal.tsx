import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { sounds } from '../utils/audio';

interface JoinCommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function JoinCommunityModal({ isOpen, onClose }: JoinCommunityModalProps) {
  // Lock background scroll and close on Escape
  useEffect(() => {
    if (isOpen) {
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      (window as any).lenis?.stop();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          sounds.playPop();
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
        (window as any).lenis?.start();
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-[#0e0e0e] border border-white/20 rounded-3xl p-6 sm:p-8 text-white shadow-2xl z-10 overflow-hidden"
        >
          {/* Ambient Background Blur Accent */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#B3EB16]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#0038ff]/30 rounded-full blur-3xl pointer-events-none" />

          {/* Header & Close */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#B3EB16]">
                // CONNECT WITH BUILDERS
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight mt-1">
                JOIN COMMUNITY
              </h3>
            </div>
            <button
              onClick={() => {
                sounds.playPop();
                onClose();
              }}
              onMouseEnter={() => sounds.playHover()}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-white/70 my-5 font-sans leading-relaxed">
            Select your platform to join the LooseCode builder collective directly:
          </p>

          {/* Platform Options */}
          <div className="flex flex-col gap-4">
            {/* Discord Option */}
            <a
              href="https://discord.gg/kjswHJhNwF"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => sounds.playHover()}
              onClick={() => sounds.playBlip(700)}
              className="group relative flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#5865F2] hover:bg-[#5865F2]/10 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#5865F2]/20 border border-[#5865F2]/40 flex items-center justify-center text-[#5865F2] group-hover:scale-110 transition-transform shrink-0">
                  {/* Discord SVG */}
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-white group-hover:text-[#5865F2] transition-colors flex items-center gap-2">
                    Discord Server
                  </h4>
                  <p className="text-xs text-white/60">
                    Buildathons, channels, & team matching
                  </p>
                </div>
              </div>
              <div className="px-3.5 py-1.5 rounded-full bg-[#5865F2] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1 group-hover:scale-105 transition-transform shrink-0">
                <span>Join</span>
                <ExternalLink size={12} />
              </div>
            </a>

            {/* WhatsApp Option */}
            <a
              href="https://chat.whatsapp.com/FlTVlEFRyQA3ofrkmT42It"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => sounds.playHover()}
              onClick={() => sounds.playBlip(700)}
              className="group relative flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#25D366] hover:bg-[#25D366]/10 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366] group-hover:scale-110 transition-transform shrink-0">
                  {/* WhatsApp SVG */}
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-white group-hover:text-[#25D366] transition-colors flex items-center gap-2">
                    WhatsApp Community
                  </h4>
                  <p className="text-xs text-white/60">
                    Instant announcements & builder updates
                  </p>
                </div>
              </div>
              <div className="px-3.5 py-1.5 rounded-full bg-[#25D366] text-black text-xs font-bold uppercase tracking-wider flex items-center gap-1 group-hover:scale-105 transition-transform shrink-0">
                <span>Join</span>
                <ExternalLink size={12} />
              </div>
            </a>
          </div>

          {/* Footer note */}
          <p className="text-center text-xs text-white/40 mt-6 font-mono">
            LOOSECODE COMMUNITY • FREE & OPEN TO ALL BUILDERS
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
