import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { sounds } from '../utils/audio';

const faqQuestions = [
  {
    id: '01',
    question: 'What is LooseCode?',
    answer:
      'LooseCode is a community for developers, designers, students, founders, and creators. We organize hackathons, buildathons, challenges, and events that bring builders together to collaborate, compete, and turn ideas into real projects.',
  },
  {
    id: '02',
    question: 'Who can join LooseCode?',
    answer:
      "Anyone who loves building can join LooseCode — whether you're a developer, designer, student, founder, or creator. Beginners and experienced builders are all welcome.",
  },
  {
    id: '03',
    question: 'How does LooseCode work?',
    answer:
      "LooseCode brings builders together through hackathons, challenges, and community events. Find an event, build with a team, meet other creators, and ship something you're proud of.",
  },
  {
    id: '04',
    question: 'What kind of events do you organize?',
    answer:
      'We organize hackathons, buildathons, coding challenges, community meetups, and other builder-focused events designed to encourage collaboration, creativity, and hands-on building.',
  },
  {
    id: '05',
    question: 'How can I participate in a hackathon?',
    answer:
      'Explore our upcoming events, choose a hackathon that interests you, register, form or join a team, and start building. Follow the event rules and submit your project before the deadline.',
  },
];

export default function WhatsHappening() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleQuestion = (id: string) => {
    sounds.playPop();
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="w-full py-16 sm:py-24 bg-[#7C9BFF] text-[#1c1c1c] select-none">
      {/* Top Header layout */}
      <div className="w-full flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pt-10 sm:pt-20 pb-8 sm:pb-12 px-6 sm:px-12 md:px-16 border-b border-[#1c1c1c]/20">
        {/* Animated Display Title: WHAT'S HAPPENING */}
        <div className="overflow-hidden">
          <span className="flex flex-wrap text-6xl sm:text-8xl md:text-9xl lg:text-[180px] xl:text-[210px] font-humane uppercase leading-[0.82] tracking-tight text-[#1c1c1c]">
            {"WHAT'S HAPPENING".split(' ').map((word, index) => (
              <motion.span
                initial={{ y: '100%' }}
                whileInView={{ y: 0 }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.8,
                  ease: [0.4, 0, 0.2, 1],
                }}
                viewport={{ once: true }}
                key={index}
                className="inline-block mr-4 sm:mr-8"
              >
                {word}
              </motion.span>
            ))}
          </span>
        </div>

        {/* Editorial Subtitle with Bodoni Italic Accent */}
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-helvetica uppercase leading-tight text-[#1c1c1c] text-left md:text-right max-w-xs sm:max-w-sm pb-2">
          frequently asked questions & <br className="hidden sm:block" />
          everything you need to{' '}
          <span className="text-2xl sm:text-3xl lg:text-4xl font-bodoni lowercase">
            know
          </span>
        </h2>
      </div>

      {/* Interactive FAQ Question List with translation hover animations */}
      <div className="w-full flex flex-col">
        {faqQuestions.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              onClick={() => toggleQuestion(item.id)}
              onMouseEnter={() => sounds.playHover()}
              className="w-full flex flex-col border-b border-[#1c1c1c] hover:bg-black/[0.06] transition-colors duration-200 cursor-pointer group px-6 sm:px-12 md:px-16 py-4 sm:py-6"
            >
              {/* Question Row */}
              <div className="w-full flex items-center justify-between gap-4">
                <h3 className="text-3xl sm:text-5xl md:text-6xl lg:text-[85px] font-humane leading-tight text-[#1c1c1c] uppercase group-hover:translate-x-4 sm:group-hover:translate-x-8 transition-transform duration-300 ease-out">
                  {item.question}
                </h3>

                <div className="flex-shrink-0">
                  <ArrowUpRight
                    className={`w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 text-[#1c1c1c] transition-all duration-300 ease-out group-hover:-translate-x-3 sm:group-hover:-translate-x-6 ${
                      isOpen ? 'rotate-90 scale-110' : 'group-hover:rotate-45'
                    }`}
                  />
                </div>
              </div>

              {/* Expandable Accordion Content */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 pb-3 max-w-3xl">
                      <p className="text-sm sm:text-base md:text-lg font-sans font-medium text-[#1c1c1c]/90 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
