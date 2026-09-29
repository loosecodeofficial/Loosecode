import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { sounds } from '../utils/audio';
import FlareRedFooter from '../components/FlareRedFooter';
import logoImg from '../assets/logo.png';

export default function ManifestoPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    sounds.playBlip(700);
    window.location.href = '/';
  };

  return (
    <div className="relative min-h-screen bg-[#F4F3EE] text-[#0A0A0A] font-sans selection:bg-[#0038ff] selection:text-white">
      {/* Editorial Top Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#F4F3EE]/95 backdrop-blur-md border-b border-[#0A0A0A]/15 px-4 sm:px-8 lg:px-12 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Back button */}
          <button
            onClick={handleBack}
            onMouseEnter={() => sounds.playHover()}
            className="group flex items-center gap-2.5 text-xs sm:text-sm font-mono uppercase tracking-wider font-bold text-[#0A0A0A] hover:text-[#0038ff] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>BACK TO LOOSECODE</span>
          </button>

          {/* Center Brand Identity */}
          <div
            onClick={handleBack}
            onMouseEnter={() => sounds.playHover()}
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <div className="w-6 h-6 rounded-full overflow-hidden bg-[#0038ff] border border-black/20 flex items-center justify-center shrink-0">
              <img src={logoImg} alt="LooseCode Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-['Space_Grotesk'] font-bold text-sm tracking-tight hidden sm:inline-block">
              LOOSECODE<span className="text-xs text-[#0038ff] ml-0.5">™</span>
            </span>
          </div>

          {/* Right metadata specs */}
          <div className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#0A0A0A]/60 flex items-center gap-3">
            <span className="hidden md:inline">VOL. 01 / DOC 2026</span>
            <span className="inline-block w-2 h-2 rounded-full bg-[#0038ff]" />
            <span className="text-[#0038ff] font-bold">MANIFESTO</span>
          </div>
        </div>
      </header>

      {/* Main Editorial Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-12 sm:pt-20 pb-24">
        
        {/* ========================================================================= */}
        {/* OPENING SPREAD: CRISP BOLD ELECTRIC BLUE TYPOGRAPHY (NO GLOW / NO BLUR) */}
        {/* ========================================================================= */}
        <section className="border-b border-[#0A0A0A]/20 pb-16 sm:pb-24">
          {/* Metadata Specs Bar */}
          <div className="flex flex-wrap items-center justify-between gap-y-2 text-[11px] font-mono uppercase tracking-widest text-[#0A0A0A]/50 mb-8 border-b border-[#0A0A0A]/10 pb-3">
            <div>HEADLINE: 140/115 // PROTOCOL: LC-MANIFESTO-01</div>
            <div>BODY COPY: 13/18 // GRID: 12-COL EDITORIAL</div>
            <div className="hidden sm:block">LOOSECODE DEVELOPER COLLECTIVE © 2026</div>
          </div>

          {/* Giant Editorial Title: Sharp, Solid, Bold Electric Blue */}
          <div className="mb-12 sm:mb-16 select-none">
            <h1 className="font-['Space_Grotesk'] text-6xl sm:text-8xl md:text-9xl lg:text-[135px] xl:text-[160px] font-extrabold uppercase leading-[0.88] tracking-tight text-[#0038ff]">
              LOOSECODE
              <br />
              MANIFESTO <span className="font-sans font-normal text-4xl sm:text-6xl md:text-8xl align-top">©</span>
            </h1>

            {/* Crisp Editorial Tagline */}
            <div className="mt-4 sm:mt-6 flex items-center gap-3">
              <span className="text-[#0038ff] text-xs sm:text-sm font-mono uppercase tracking-widest font-bold">
                // A TESTAMENT FOR BUILDERS WHO SHIP WITHOUT PERMISSION
              </span>
            </div>
          </div>

          {/* Two-Column Editorial Opening Statement */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 pt-4 text-[#0A0A0A]">
            <div className="space-y-5 text-base sm:text-lg leading-relaxed font-sans font-normal">
              <p>
                At <strong className="font-bold text-[#0038ff]">LooseCode</strong>, we believe that software is the most potent medium of human expression since the printed word. Every builder possesses a distinct spark—an instinct to create, to test boundaries, to dismantle the theoretical and forge real, working products.
              </p>
              <p>
                In a world crowded with passive consumption and endless talk, our mission is to uncover that builder essence and transform raw ambition into production-ready software. We balance artistic creative vision with merciless engineering rigor to <strong className="font-bold text-[#0038ff]">ensure a lasting cultural impact</strong>.
              </p>
            </div>

            <div className="space-y-5 text-base sm:text-lg leading-relaxed font-sans font-normal flex flex-col justify-between">
              <div>
                <p className="mb-4">
                  We are a collective of developers, designers, founders, and creative technologists united in shipping projects that leave an indelible mark on the digital universe. Through intense hackathons, high-velocity sprints, and unfiltered collaboration, we bridge raw curiosity with mastery.
                </p>
                <p>
                  LooseCode is not an agency. It is not an audience. It is an engine of momentum, pushing builders past comfort zones to create software that thrives and stands out.
                </p>
              </div>

              {/* Crisp Highlighted Statement (No Glow / No Blur) */}
              <div className="pt-4 border-t border-[#0A0A0A]/15">
                <span className="text-[#0038ff] font-['Space_Grotesk'] text-xl sm:text-2xl font-bold uppercase tracking-tight block">
                  TURNING LOOSE IDEAS INTO REAL CODE.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 01 / WHO WE ARE */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 border-b border-[#0A0A0A]/20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Number & Metadata */}
            <div className="lg:col-span-4">
              <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-[#0038ff] block mb-2">
                01 / IDENTITY
              </span>
              <h2 className="font-['Space_Grotesk'] text-4xl sm:text-6xl font-bold uppercase tracking-tighter leading-[0.95] text-[#0A0A0A]">
                WHO WE
                <br />
                ARE.
              </h2>
              <div className="mt-4 text-xs font-mono text-[#0A0A0A]/50">
                [COHORT: BUILDERS // STATUS: ACTIVE]
              </div>
            </div>

            {/* Right Column: Editorial Body & Bold Statement */}
            <div className="lg:col-span-8 space-y-6">
              <h3 className="font-['Space_Grotesk'] text-2xl sm:text-4xl font-bold uppercase text-[#0038ff] leading-tight">
                "WE ARE NOT SPECTATORS IN THE TECHNOLOGY BOOM. WE ARE THE ARCHITECTS AT THE KEYBOARD."
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm sm:text-base leading-relaxed text-[#0A0A0A]/90">
                <p>
                  LooseCode is a community built specifically for developers, designers, students, founders, and creators. We were born out of fatigue with hollow networking events where nothing gets built.
                </p>
                <p>
                  We are individuals who find joy in terminal windows, responsive layouts, distributed backends, and pixel perfection. When we see a problem, our reflexive answer isn't a 40-slide presentation—it's <strong className="font-bold text-[#0038ff]">git commit -m "initial prototype"</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 02 / WHAT WE BELIEVE */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 border-b border-[#0A0A0A]/20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Number & Metadata */}
            <div className="lg:col-span-4">
              <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-[#0038ff] block mb-2">
                02 / ETHOS
              </span>
              <h2 className="font-['Space_Grotesk'] text-4xl sm:text-6xl font-bold uppercase tracking-tighter leading-[0.95] text-[#0A0A0A]">
                WHAT WE
                <br />
                BELIEVE.
              </h2>
              <div className="mt-4 text-xs font-mono text-[#0A0A0A]/50">
                [PHILOSOPHY: PROOF_OF_WORK]
              </div>
            </div>

            {/* Right Column: Statements */}
            <div className="lg:col-span-8 space-y-8">
              <div className="border-l-4 border-[#0038ff] pl-6 py-2">
                <p className="font-['Space_Grotesk'] text-2xl sm:text-4xl lg:text-5xl font-bold uppercase text-[#0A0A0A] leading-tight">
                  PROOF OF WORK IS THE ULTIMATE CURRENCY. DEGREES DON'T COMPILE CODE.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm sm:text-base leading-relaxed text-[#0A0A0A]/90">
                <div className="space-y-3">
                  <h4 className="font-mono text-xs uppercase tracking-widest text-[#0038ff] font-bold">
                    // EXECUTION OVER SPECULATION
                  </h4>
                  <p>
                    An idea stored in your notebook is worth zero. An idea deployed on a live domain, tested by real users, is a reality. We believe that shipping early and suffering honest feedback is the only genuine education in technology.
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-mono text-xs uppercase tracking-widest text-[#0038ff] font-bold">
                    // MERITOCRACY OF CRAFT
                  </h4>
                  <p>
                    It doesn't matter where you went to school, how many followers you have, or how long you've been coding. If you build something remarkable, the LooseCode community will rally behind you and elevate your craft.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 03 / HOW WE BUILD (CLEAN EDITORIAL LAYOUT MATCHING SCREENSHOT 3) */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 border-b border-[#0A0A0A]/20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Number & Metadata */}
            <div className="lg:col-span-4">
              <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-[#0038ff] block mb-2">
                03 / METHODOLOGY
              </span>
              <h2 className="font-['Space_Grotesk'] text-4xl sm:text-6xl font-bold uppercase tracking-tighter leading-[0.95] text-[#0A0A0A]">
                HOW WE
                <br />
                BUILD.
              </h2>
              <div className="mt-4 text-xs font-mono text-[#0A0A0A]/50">
                [CADENCE: SPRINT // PRESSURE: CRITICAL]
              </div>
            </div>

            {/* Right Column: Clean Editorial Content */}
            <div className="lg:col-span-8 space-y-8">
              <div className="border-b border-[#0A0A0A]/15 pb-6">
                <span className="text-[#0038ff] font-mono text-xs uppercase tracking-widest font-bold block mb-2">
                  // THE PRESSURE PRINCIPLE
                </span>
                <h3 className="font-['Space_Grotesk'] text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#0A0A0A] leading-tight mb-4">
                  SPEED FORCES CLARITY.
                </h3>
                <p className="font-sans text-sm sm:text-base leading-relaxed text-[#0A0A0A]/85 max-w-3xl">
                  We don't take six months to launch an MVP. We build through 24-hour and 48-hour hackathons, rapid sprints, and fast-paced challenges. When time is scarce, perfectionist hesitation evaporates. You are forced to focus purely on the core value: does this solve the problem? Does this thrill the user?
                </p>
              </div>

              {/* Step Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs sm:text-sm font-mono">
                <div className="p-5 border border-[#0A0A0A]/15 bg-white rounded-xl">
                  <span className="font-bold text-[#0038ff] block mb-1">01 // DISSECT</span>
                  <p className="text-[#0A0A0A]/75 font-sans mt-2">
                    Strip the idea down to its irreducible primitive.
                  </p>
                </div>
                <div className="p-5 border border-[#0A0A0A]/15 bg-white rounded-xl">
                  <span className="font-bold text-[#0038ff] block mb-1">02 // PROTOTYPE</span>
                  <p className="text-[#0A0A0A]/75 font-sans mt-2">
                    Write the code. Break things. Make the engine turn over.
                  </p>
                </div>
                <div className="p-5 border border-[#0A0A0A]/15 bg-white rounded-xl">
                  <span className="font-bold text-[#0038ff] block mb-1">03 // SHIP</span>
                  <p className="text-[#0A0A0A]/75 font-sans mt-2">
                    Deploy to production without waiting for validation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 04 / THE COMMUNITY */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 border-b border-[#0A0A0A]/20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Number & Metadata */}
            <div className="lg:col-span-4">
              <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-[#0038ff] block mb-2">
                04 / COLLECTIVE
              </span>
              <h2 className="font-['Space_Grotesk'] text-4xl sm:text-6xl font-bold uppercase tracking-tighter leading-[0.95] text-[#0A0A0A]">
                OUR
                <br />
                COMMUNITY.
              </h2>
              <div className="mt-4 text-xs font-mono text-[#0A0A0A]/50">
                [MEMBERSHIP: OPEN TO ALL WHO SHIP]
              </div>
            </div>

            {/* Right Column: Roles Breakdown */}
            <div className="lg:col-span-8 space-y-6">
              <h3 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold uppercase text-[#0A0A0A] leading-snug">
                FOUR VITAL TRIBES UNITED INTO ONE COMBUSTIBLE ECOSYSTEM:
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="p-6 bg-white border border-[#0A0A0A]/15 rounded-xl space-y-2">
                  <span className="font-mono text-xs font-bold text-[#0038ff] uppercase">01 // DEVELOPERS</span>
                  <h4 className="font-['Space_Grotesk'] font-bold text-lg text-[#0A0A0A]">THE ARCHITECTS & ENGINEERS</h4>
                  <p className="text-xs sm:text-sm text-[#0A0A0A]/75 leading-relaxed">
                    Full-stack wizards, smart contract devs, AI practitioners, and backend tuners who turn logic into lightning.
                  </p>
                </div>

                <div className="p-6 bg-white border border-[#0A0A0A]/15 rounded-xl space-y-2">
                  <span className="font-mono text-xs font-bold text-[#0038ff] uppercase">02 // DESIGNERS</span>
                  <h4 className="font-['Space_Grotesk'] font-bold text-lg text-[#0A0A0A]">THE VISUAL & MOTION MASTERS</h4>
                  <p className="text-xs sm:text-sm text-[#0A0A0A]/75 leading-relaxed">
                    Typographic obsessives, motion artists, and UI innovators who ensure the software feels tactile and electric.
                  </p>
                </div>

                <div className="p-6 bg-white border border-[#0A0A0A]/15 rounded-xl space-y-2">
                  <span className="font-mono text-xs font-bold text-[#0038ff] uppercase">03 // CREATORS & STUDENTS</span>
                  <h4 className="font-['Space_Grotesk'] font-bold text-lg text-[#0A0A0A]">THE NEXT WAVE</h4>
                  <p className="text-xs sm:text-sm text-[#0A0A0A]/75 leading-relaxed">
                    Hungry newcomers and self-taught tinkerers eager to bypass traditional gatekeepers and prove their mettle.
                  </p>
                </div>

                <div className="p-6 bg-white border border-[#0A0A0A]/15 rounded-xl space-y-2">
                  <span className="font-mono text-xs font-bold text-[#0038ff] uppercase">04 // FOUNDERS</span>
                  <h4 className="font-['Space_Grotesk'] font-bold text-lg text-[#0A0A0A]">THE PRODUCT INSTIGATORS</h4>
                  <p className="text-xs sm:text-sm text-[#0A0A0A]/75 leading-relaxed">
                    Makers who don't just write scripts, but construct sustainable products and launch them into the open market.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 05 / THE FOUR PILLARS */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 border-b border-[#0A0A0A]/20">
          <div className="mb-12">
            <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-[#0038ff] block mb-2">
              05 / CORE FOUNDATIONS
            </span>
            <h2 className="font-['Space_Grotesk'] text-4xl sm:text-7xl font-bold uppercase tracking-tighter leading-[0.9] text-[#0A0A0A]">
              THE FOUR PILLARS.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pillar 1 */}
            <div className="border border-[#0A0A0A]/15 bg-white p-8 sm:p-10 rounded-2xl flex flex-col justify-between hover:border-[#0038ff] transition-colors group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-[#0038ff] uppercase tracking-widest">
                    PILLAR 01 // FOUNDATION
                  </span>
                  <span className="font-mono text-xl font-bold text-[#0A0A0A]/30 group-hover:text-[#0038ff] transition-colors">
                    #01
                  </span>
                </div>
                <h3 className="font-['Space_Grotesk'] text-2xl sm:text-4xl font-bold uppercase tracking-tight text-[#0A0A0A] mb-3">
                  BUILD TOGETHER
                </h3>
                <p className="text-sm sm:text-base text-[#0A0A0A]/80 leading-relaxed font-sans">
                  Find developers, designers, and creators to turn ideas into real products. Solo building is powerful, but collaborative alchemy is exponential. We pair visionary engineers with obsessive designers to create software that cannot be ignored.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#0A0A0A]/10 text-xs font-mono text-[#0A0A0A]/60 font-semibold">
                TEAM FORMATION • CO-FOUNDER DISCOVERY • SYNERGY
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="border border-[#0A0A0A]/15 bg-white p-8 sm:p-10 rounded-2xl flex flex-col justify-between hover:border-[#0038ff] transition-colors group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-[#0038ff] uppercase tracking-widest">
                    PILLAR 02 // VELOCITY
                  </span>
                  <span className="font-mono text-xl font-bold text-[#0A0A0A]/30 group-hover:text-[#0038ff] transition-colors">
                    #02
                  </span>
                </div>
                <h3 className="font-['Space_Grotesk'] text-2xl sm:text-4xl font-bold uppercase tracking-tight text-[#0A0A0A] mb-3">
                  HACK. SHIP. REPEAT.
                </h3>
                <p className="text-sm sm:text-base text-[#0A0A0A]/80 leading-relaxed font-sans">
                  Build through hackathons, challenges, and fast-paced experiences designed for makers. The habit of finishing is a superpower. Every event is a testing ground where you push past technical boundaries and ship real demos before the clock expires.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#0A0A0A]/10 text-xs font-mono text-[#0A0A0A]/60 font-semibold">
                24H SPRINTS • HACKATHONS • DEMO DAYS
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="border border-[#0A0A0A]/15 bg-white p-8 sm:p-10 rounded-2xl flex flex-col justify-between hover:border-[#0038ff] transition-colors group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-[#0038ff] uppercase tracking-widest">
                    PILLAR 03 // VISIBILITY
                  </span>
                  <span className="font-mono text-xl font-bold text-[#0A0A0A]/30 group-hover:text-[#0038ff] transition-colors">
                    #03
                  </span>
                </div>
                <h3 className="font-['Space_Grotesk'] text-2xl sm:text-4xl font-bold uppercase tracking-tight text-[#0A0A0A] mb-3">
                  SHOW YOUR WORK
                </h3>
                <p className="text-sm sm:text-base text-[#0A0A0A]/80 leading-relaxed font-sans">
                  Launch your projects, share what you built, and get discovered by the builder community. No hiding in private repos. Put your code on the line, publish the repository, demonstrate the live link, and let your craftsmanship speak for itself.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#0A0A0A]/10 text-xs font-mono text-[#0A0A0A]/60 font-semibold">
                PUBLIC LAUNCHES • OPEN SOURCE • REPUTATION
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="border border-[#0A0A0A]/15 bg-white p-8 sm:p-10 rounded-2xl flex flex-col justify-between hover:border-[#0038ff] transition-colors group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-[#0038ff] uppercase tracking-widest">
                    PILLAR 04 // EVOLUTION
                  </span>
                  <span className="font-mono text-xl font-bold text-[#0A0A0A]/30 group-hover:text-[#0038ff] transition-colors">
                    #04
                  </span>
                </div>
                <h3 className="font-['Space_Grotesk'] text-2xl sm:text-4xl font-bold uppercase tracking-tight text-[#0A0A0A] mb-3">
                  LEVEL UP
                </h3>
                <p className="text-sm sm:text-base text-[#0A0A0A]/80 leading-relaxed font-sans">
                  Learn from other builders, collaborate on ambitious ideas, and grow through real-world building. Iron sharpens iron. When you're surrounded by builders who refuse to accept mediocre standards, your own ceiling becomes your baseline.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#0A0A0A]/10 text-xs font-mono text-[#0A0A0A]/60 font-semibold">
                PEER CODE REVIEW • ARCHITECTURE DEEP DIVES • MASTERY
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 06 / THE CORE BUILDERS */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 border-b border-[#0A0A0A]/20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Number & Metadata */}
            <div className="lg:col-span-4">
              <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-[#0038ff] block mb-2">
                06 / LEADERSHIP
              </span>
              <h2 className="font-['Space_Grotesk'] text-4xl sm:text-6xl font-bold uppercase tracking-tighter leading-[0.95] text-[#0A0A0A]">
                CORE
                <br />
                BUILDERS.
              </h2>
              <div className="mt-4 text-xs font-mono text-[#0A0A0A]/50">
                [ROLE: MENTORS & ARCHITECTS]
              </div>
            </div>

            {/* Right Column: Core Builder Narrative */}
            <div className="lg:col-span-8 space-y-6">
              <p className="font-['Space_Grotesk'] text-2xl sm:text-4xl font-bold uppercase text-[#0038ff] leading-tight">
                "NOT INFLUENCERS. NOT COMMENTATORS. BUILDERS WHO WRITE THE CODE THAT KEEPS THE COMMUNITY MOVING FORWARD."
              </p>
              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#0A0A0A]/90 font-sans">
                <p>
                  LooseCode Core Builders are the vanguard. They are seasoned engineers and creative leads who stay up till sunrise in Discord channels helping newcomers debug stubborn dependency issues.
                </p>
                <p>
                  They lead hackathon tracks, architect open-source templates, host teardown sessions, and model the LooseCode ethos: <strong className="font-bold text-[#0038ff]">CODE HARD. RIZZ HARDER.</strong> They demonstrate that technical excellence and magnetic cultural energy are not mutually exclusive.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 07 / WHAT WE STAND FOR (THE EXACT STYLE PRAISED IN SCREENSHOT 3) */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 border-b border-[#0A0A0A]/20">
          <div className="mb-12">
            <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-[#0038ff] block mb-2">
              07 / PRINCIPLES
            </span>
            <h2 className="font-['Space_Grotesk'] text-4xl sm:text-7xl font-bold uppercase tracking-tighter leading-[0.9] text-[#0A0A0A]">
              WHAT WE STAND FOR.
            </h2>
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pb-8 border-b border-[#0A0A0A]/10 items-baseline">
              <span className="md:col-span-2 font-mono text-xs uppercase font-bold text-[#0038ff]">
                RULE 01 // ACCESSIBILITY
              </span>
              <h3 className="md:col-span-4 font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold uppercase text-[#0A0A0A]">
                NO GATEKEEPING
              </h3>
              <p className="md:col-span-6 text-sm sm:text-base text-[#0A0A0A]/80 font-sans leading-relaxed">
                Knowledge belongs to anyone hungry enough to ask for it. We do not gatekeep tech stacks, libraries, or architectural patterns. When one of us learns, the entire collective levels up.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pb-8 border-b border-[#0A0A0A]/10 items-baseline">
              <span className="md:col-span-2 font-mono text-xs uppercase font-bold text-[#0038ff]">
                RULE 02 // AESTHETICS
              </span>
              <h3 className="md:col-span-4 font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold uppercase text-[#0A0A0A]">
                CODE WITH SOUL
              </h3>
              <p className="md:col-span-6 text-sm sm:text-base text-[#0A0A0A]/80 font-sans leading-relaxed">
                We reject ugly, soulless interfaces. Great software is not just functional; it is tactile, responsive, and aesthetically thrilling. Design is not frosting—it is how the system behaves.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pb-8 border-b border-[#0A0A0A]/10 items-baseline">
              <span className="md:col-span-2 font-mono text-xs uppercase font-bold text-[#0038ff]">
                RULE 03 // AUTONOMY
              </span>
              <h3 className="md:col-span-4 font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold uppercase text-[#0A0A0A]">
                BUILD WITHOUT PERMISSION
              </h3>
              <p className="md:col-span-6 text-sm sm:text-base text-[#0A0A0A]/80 font-sans leading-relaxed">
                Do not wait for an employer, an accelerator, or an institution to sanction your ambition. The modern web is an open canvas. Register the domain, write the code, and launch it to the world.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline">
              <span className="md:col-span-2 font-mono text-xs uppercase font-bold text-[#0038ff]">
                RULE 04 // SIGNATURE
              </span>
              <h3 className="md:col-span-4 font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold uppercase text-[#0A0A0A]">
                CODE HARD. RIZZ HARDER.
              </h3>
              <p className="md:col-span-6 text-sm sm:text-base text-[#0A0A0A]/80 font-sans leading-relaxed">
                Back up your charisma with ruthless engineering, and back up your technical genius with magnetic communication. Don't just build in the dark—make the world care about what you created.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* FINAL CLOSING STATEMENT: SHARP, BOLD, HIGH-IMPACT */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-28 text-center flex flex-col items-center justify-center">
          <span className="font-mono text-xs uppercase tracking-widest text-[#0038ff] font-bold mb-4">
            // FINAL TRANSMISSION
          </span>

          <h2 className="font-['Space_Grotesk'] text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold uppercase tracking-tight text-[#0A0A0A] leading-[0.92] max-w-5xl">
            THE FUTURE BELONGS TO THOSE WHO{' '}
            <span className="text-[#0038ff] underline decoration-[#0038ff]/30 underline-offset-8">
              PRESS DEPLOY.
            </span>
          </h2>

          <p className="font-sans text-base sm:text-xl text-[#0A0A0A]/70 max-w-2xl mt-8 mb-10 leading-relaxed">
            Stop waiting for the perfect moment or the flawless stack. Join the collective, register for the next hackathon, and turn your loose code into a product.
          </p>

          <button
            onClick={handleBack}
            onMouseEnter={() => sounds.playHover()}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-[#0038ff] text-white rounded-full font-mono text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-[#0A0A0A] transition-colors shadow-lg cursor-pointer"
          >
            <span>← RETURN TO LOOSECODE HOMEPAGE</span>
          </button>
        </section>

      </main>

      {/* Keep the Existing LooseCode Footer on the Manifesto Page */}
      <FlareRedFooter />
    </div>
  );
}
