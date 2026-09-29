import { useEffect } from 'react';
import { ArrowLeft, ShieldCheck, Scale, Terminal } from 'lucide-react';
import { sounds } from '../utils/audio';
import FlareRedFooter from '../components/FlareRedFooter';
import logoImg from '../assets/logo.png';

export default function RulesPage() {
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
            <span className="hidden md:inline">GOVERNANCE // 2026</span>
            <span className="inline-block w-2 h-2 rounded-full bg-[#0038ff]" />
            <span className="text-[#0038ff] font-bold">COMMUNITY RULES</span>
          </div>
        </div>
      </header>

      {/* Main Editorial Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-12 sm:pt-20 pb-24">
        
        {/* ========================================================================= */}
        {/* HEADER SPREAD: CRISP BOLD ELECTRIC BLUE TYPOGRAPHY */}
        {/* ========================================================================= */}
        <section className="border-b border-[#0A0A0A]/20 pb-16 sm:pb-24">
          {/* Metadata Specs Bar */}
          <div className="flex flex-wrap items-center justify-between gap-y-2 text-[11px] font-mono uppercase tracking-widest text-[#0A0A0A]/50 mb-8 border-b border-[#0A0A0A]/10 pb-3">
            <div>STANDARD: LC-RULEBOOK-v2.6 // STATUS: MANDATORY</div>
            <div>SCOPE: EVENTS, HACKATHONS, REPOSITORIES & CHANNELS</div>
            <div className="hidden sm:block">LOOSECODE GOVERNANCE COUNCIL © 2026</div>
          </div>

          {/* Giant Editorial Title: Sharp, Solid, Bold Electric Blue */}
          <div className="mb-12 sm:mb-16 select-none">
            <h1 className="font-['Space_Grotesk'] text-5xl sm:text-7xl md:text-8xl lg:text-[120px] xl:text-[145px] font-extrabold uppercase leading-[0.88] tracking-tight text-[#0038ff]">
              COMMUNITY
              <br />
              RULES & ETHICS <span className="font-sans font-normal text-3xl sm:text-5xl md:text-7xl align-top">©</span>
            </h1>

            {/* Crisp Editorial Subhead */}
            <div className="mt-4 sm:mt-6 flex items-center gap-3">
              <span className="text-[#0038ff] text-xs sm:text-sm font-mono uppercase tracking-widest font-bold">
                // PROFESSIONAL STANDARDS, HACKATHON PROTOCOLS & BUILDER INTEGRITY
              </span>
            </div>
          </div>

          {/* Two-Column Editorial Preamble */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 pt-4 text-[#0A0A0A]">
            <div className="space-y-5 text-base sm:text-lg leading-relaxed font-sans font-normal">
              <p>
                LooseCode is founded on absolute freedom of technical expression paired with uncompromising professional accountability. High velocity and bold ambition require high trust.
              </p>
              <p>
                These rules govern our Discord server, WhatsApp communities, online hackathons, in-person sprint rooms, open-source repositories, and official events. By participating in any LooseCode space, you pledge to adhere to these foundational principles.
              </p>
            </div>

            <div className="space-y-5 text-base sm:text-lg leading-relaxed font-sans font-normal flex flex-col justify-between">
              <div>
                <p className="mb-4">
                  We maintain zero tolerance for harassment, intellectual theft, gatekeeping, and destructive conduct. Our mission is to protect builders, foster genuine meritocracy, and ensure that every creator has an equal, safe arena to showcase their proof of work.
                </p>
              </div>

              <div className="pt-4 border-t border-[#0A0A0A]/15">
                <span className="text-[#0038ff] font-['Space_Grotesk'] text-xl sm:text-2xl font-bold uppercase tracking-tight block">
                  HIGH STANDARDS. ZERO POLITICS. TOTAL INTEGRITY.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 01 / HACKATHON & SPRINT INTEGRITY */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 border-b border-[#0A0A0A]/20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4">
              <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-[#0038ff] block mb-2">
                01 // INTEGRITY
              </span>
              <h2 className="font-['Space_Grotesk'] text-4xl sm:text-6xl font-bold uppercase tracking-tighter leading-[0.95] text-[#0A0A0A]">
                HACKATHON
                <br />
                PROTOCOLS.
              </h2>
              <div className="mt-4 text-xs font-mono text-[#0A0A0A]/50">
                [ENFORCEMENT: STRICT // CODE REVIEWS APPLIED]
              </div>
            </div>

            <div className="lg:col-span-8 space-y-6">
              <div className="space-y-4">
                <div className="p-6 bg-white border border-[#0A0A0A]/15 rounded-xl space-y-2">
                  <div className="flex items-center gap-3 mb-1">
                    <Terminal className="w-5 h-5 text-[#0038ff]" />
                    <span className="font-mono text-xs font-bold text-[#0038ff] uppercase">RULE 1.1 // FRESH CODE PRINCIPLE</span>
                  </div>
                  <h4 className="font-['Space_Grotesk'] font-bold text-xl text-[#0A0A0A]">
                    WORK MUST BE AUTHORED DURING THE SPRINT
                  </h4>
                  <p className="text-sm text-[#0A0A0A]/80 leading-relaxed font-sans">
                    Projects submitted for hackathon evaluation must be conceived and coded during the designated sprint window. Using open-source libraries, UI kits, templates, and public APIs is encouraged, provided they are explicitly credited. Submitting pre-built proprietary software as freshly developed work results in immediate disqualification.
                  </p>
                </div>

                <div className="p-6 bg-white border border-[#0A0A0A]/15 rounded-xl space-y-2">
                  <div className="flex items-center gap-3 mb-1">
                    <Scale className="w-5 h-5 text-[#0038ff]" />
                    <span className="font-mono text-xs font-bold text-[#0038ff] uppercase">RULE 1.2 // GENERATIVE AI & ASSISTED CODING</span>
                  </div>
                  <h4 className="font-['Space_Grotesk'] font-bold text-xl text-[#0A0A0A]">
                    AI AS A MULTIPLIER, NOT A PROXY
                  </h4>
                  <p className="text-sm text-[#0A0A0A]/80 leading-relaxed font-sans">
                    Modern builders use modern tools. LLMs, Copilot, and code assistants are completely permitted. However, the architecture, integration, problem-solving, and original creative value must stem from the team. Builders must be able to defend, explain, and walk through every segment of their submission during evaluation.
                  </p>
                </div>

                <div className="p-6 bg-white border border-[#0A0A0A]/15 rounded-xl space-y-2">
                  <div className="flex items-center gap-3 mb-1">
                    <ShieldCheck className="w-5 h-5 text-[#0038ff]" />
                    <span className="font-mono text-xs font-bold text-[#0038ff] uppercase">RULE 1.3 // PROOF OF DEPLOYMENT</span>
                  </div>
                  <h4 className="font-['Space_Grotesk'] font-bold text-xl text-[#0A0A0A]">
                    VERIFIABLE REPOSITORIES & LIVE DEMOS
                  </h4>
                  <p className="text-sm text-[#0A0A0A]/80 leading-relaxed font-sans">
                    Every project must provide an accessible code repository (GitHub/GitLab) with transparent commit histories and a live, working URL or functional local walkthrough video. Proof of work is our only criteria.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 02 // CODE OF CONDUCT & COMMUNITY ETHICS */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 border-b border-[#0A0A0A]/20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4">
              <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-[#0038ff] block mb-2">
                02 // CONDUCT
              </span>
              <h2 className="font-['Space_Grotesk'] text-4xl sm:text-6xl font-bold uppercase tracking-tighter leading-[0.95] text-[#0A0A0A]">
                CODE OF
                <br />
                CONDUCT.
              </h2>
              <div className="mt-4 text-xs font-mono text-[#0A0A0A]/50">
                [SAFEGUARDING: ALL MEMBERS EQUAL]
              </div>
            </div>

            <div className="lg:col-span-8 space-y-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pb-6 border-b border-[#0A0A0A]/10 items-baseline">
                  <span className="md:col-span-3 font-mono text-xs uppercase font-bold text-[#0038ff]">
                    CONDUCT 2.1 // ZERO HARASSMENT
                  </span>
                  <div className="md:col-span-9 space-y-2">
                    <h3 className="font-['Space_Grotesk'] text-xl font-bold uppercase text-[#0A0A0A]">
                      INCLUSIVE, HOSTILITY-FREE ENVIRONMENT
                    </h3>
                    <p className="text-sm text-[#0A0A0A]/80 font-sans leading-relaxed">
                      LooseCode is dedicated to providing a harassment-free experience for everyone regardless of gender, sexual orientation, disability, physical appearance, race, age, or religion. Offensive comments, unwelcome sexual attention, intimidation, stalking, and continuous disruption of events will not be tolerated.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pb-6 border-b border-[#0A0A0A]/10 items-baseline">
                  <span className="md:col-span-3 font-mono text-xs uppercase font-bold text-[#0038ff]">
                    CONDUCT 2.2 // CRITIQUE
                  </span>
                  <div className="md:col-span-9 space-y-2">
                    <h3 className="font-['Space_Grotesk'] text-xl font-bold uppercase text-[#0A0A0A]">
                      CRITIQUE CODE, RESPECT THE PERSON
                    </h3>
                    <p className="text-sm text-[#0A0A0A]/80 font-sans leading-relaxed">
                      Technical debate is the lifeblood of great software. Challenge assumptions, analyze algorithms, and dissect architecture with precision—but always with respect. Disagreements must never degenerate into personal insults, mocking, or gatekeeping.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline">
                  <span className="md:col-span-3 font-mono text-xs uppercase font-bold text-[#0038ff]">
                    CONDUCT 2.3 // FAIR ATTRIBUTION
                  </span>
                  <div className="md:col-span-9 space-y-2">
                    <h3 className="font-['Space_Grotesk'] text-xl font-bold uppercase text-[#0A0A0A]">
                      PROPER RECOGNITION OF CONTRIBUTIONS
                    </h3>
                    <p className="text-sm text-[#0A0A0A]/80 font-sans leading-relaxed">
                      Give credit where credit is due. In team projects, clearly specify the contributions of developers, designers, product strategists, and researchers. Never erase or obscure co-builders' contributions from commit histories, submission forms, or presentations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 03 // INTELLECTUAL PROPERTY & OPEN SOURCE STANDARDS */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 border-b border-[#0A0A0A]/20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4">
              <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-[#0038ff] block mb-2">
                03 // OWNERSHIP
              </span>
              <h2 className="font-['Space_Grotesk'] text-4xl sm:text-6xl font-bold uppercase tracking-tighter leading-[0.95] text-[#0A0A0A]">
                INTELLECTUAL
                <br />
                PROPERTY.
              </h2>
              <div className="mt-4 text-xs font-mono text-[#0A0A0A]/50">
                [IP GUARANTEE: 100% BUILDER-OWNED]
              </div>
            </div>

            <div className="lg:col-span-8 space-y-6">
              <div className="border-l-4 border-[#0038ff] pl-6 py-2">
                <p className="font-['Space_Grotesk'] text-2xl sm:text-4xl font-bold uppercase text-[#0A0A0A] leading-tight">
                  YOU OWN 100% OF WHAT YOU BUILD. LOOSECODE CLAIMS ZERO EQUITY OR IP RIGHTS.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 text-sm sm:text-base leading-relaxed text-[#0A0A0A]/85">
                <div className="p-6 bg-white border border-[#0A0A0A]/15 rounded-xl space-y-2">
                  <h4 className="font-mono text-xs uppercase tracking-widest text-[#0038ff] font-bold">
                    // BUILDER RETENTION
                  </h4>
                  <p className="text-sm font-sans">
                    Any product, brand, patentable logic, or code developed during a LooseCode challenge belongs exclusively to the creators. LooseCode functions as an arena, not an incubator taxing your equity.
                  </p>
                </div>

                <div className="p-6 bg-white border border-[#0A0A0A]/15 rounded-xl space-y-2">
                  <h4 className="font-mono text-xs uppercase tracking-widest text-[#0038ff] font-bold">
                    // OPEN SOURCE RESPONSIBILITY
                  </h4>
                  <p className="text-sm font-sans">
                    If releasing code publicly, attach standard Open Source licenses (MIT, Apache 2.0, GPL). Respect dependency licenses, avoid embedding leaked credentials or copyrighted datasets without proper authorization.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 04 // CHANNEL PROTOCOLS (DISCORD & WHATSAPP) */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 border-b border-[#0A0A0A]/20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4">
              <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-[#0038ff] block mb-2">
                04 // COMMUNICATION
              </span>
              <h2 className="font-['Space_Grotesk'] text-4xl sm:text-6xl font-bold uppercase tracking-tighter leading-[0.95] text-[#0A0A0A]">
                CHANNELS &
                <br />
                COMMUNITY.
              </h2>
              <div className="mt-4 text-xs font-mono text-[#0A0A0A]/50">
                [DISCORD • WHATSAPP • SOCIALS]
              </div>
            </div>

            <div className="lg:col-span-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs sm:text-sm font-mono">
                <div className="p-5 border border-[#0A0A0A]/15 bg-white rounded-xl space-y-2">
                  <span className="font-bold text-[#0038ff] block">01 // NO UNSOLICITED SPAM</span>
                  <p className="text-[#0A0A0A]/75 font-sans">
                    No mass DMing, cold commercial sales, or cryptocurrency shills. Keep public channel conversations centered on building, projects, and tech.
                  </p>
                </div>

                <div className="p-5 border border-[#0A0A0A]/15 bg-white rounded-xl space-y-2">
                  <span className="font-bold text-[#0038ff] block">02 // SECURE DATA & SECRETS</span>
                  <p className="text-[#0A0A0A]/75 font-sans">
                    Never share API keys, private tokens, passwords, or personal identifying information in community discussions.
                  </p>
                </div>

                <div className="p-5 border border-[#0A0A0A]/15 bg-white rounded-xl space-y-2">
                  <span className="font-bold text-[#0038ff] block">03 // USE DESIGNATED CHANNELS</span>
                  <p className="text-[#0A0A0A]/75 font-sans">
                    Share projects in #showcase, team requests in #find-a-team, and code queries in technical channels for optimal clarity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 05 // ENFORCEMENT & REPORTING */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 border-b border-[#0A0A0A]/20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4">
              <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-[#0038ff] block mb-2">
                05 // RESOLUTION
              </span>
              <h2 className="font-['Space_Grotesk'] text-4xl sm:text-6xl font-bold uppercase tracking-tighter leading-[0.95] text-[#0A0A0A]">
                REPORTING &
                <br />
                ENFORCEMENT.
              </h2>
              <div className="mt-4 text-xs font-mono text-[#0A0A0A]/50">
                [CONTACT: loosecodeofficial@gmail.com]
              </div>
            </div>

            <div className="lg:col-span-8 space-y-6">
              <p className="font-['Space_Grotesk'] text-xl sm:text-2xl font-bold uppercase text-[#0A0A0A]">
                PROGRESSIVE DISCIPLINE & REMOVAL PROTOCOLS
              </p>
              <div className="space-y-4 text-sm sm:text-base font-sans text-[#0A0A0A]/85 leading-relaxed">
                <p>
                  Participants who violate these rules face proportional action depending on the severity of the infraction:
                </p>
                <div className="space-y-3 font-mono text-xs sm:text-sm">
                  <div className="p-4 bg-white border border-[#0A0A0A]/15 rounded-lg flex items-start gap-3">
                    <span className="font-bold text-[#0038ff] shrink-0">LEVEL 1:</span>
                    <span>Direct warning and removal of offending message or content.</span>
                  </div>
                  <div className="p-4 bg-white border border-[#0A0A0A]/15 rounded-lg flex items-start gap-3">
                    <span className="font-bold text-[#0038ff] shrink-0">LEVEL 2:</span>
                    <span>Temporary suspension from hackathons, challenges, and public channels.</span>
                  </div>
                  <div className="p-4 bg-white border border-[#0A0A0A]/15 rounded-lg flex items-start gap-3">
                    <span className="font-bold text-[#0038ff] shrink-0">LEVEL 3:</span>
                    <span>Permanent ban from LooseCode collective events, platform access, and partner challenges.</span>
                  </div>
                </div>
                <p className="pt-2 text-xs font-mono text-[#0A0A0A]/60">
                  To report an incident confidentially, ping any Core Builder with the @Moderator role on Discord or email <span className="font-bold text-[#0038ff]">loosecodeofficial@gmail.com</span>. All reports are handled with discretion and urgency.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* FINAL CLOSING STATEMENT */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-28 text-center flex flex-col items-center justify-center">
          <span className="font-mono text-xs uppercase tracking-widest text-[#0038ff] font-bold mb-4">
            // THE BUILDER PLEDGE
          </span>

          <h2 className="font-['Space_Grotesk'] text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold uppercase tracking-tight text-[#0A0A0A] leading-[0.92] max-w-5xl">
            BUILD WITH PRIDE.
            <br />
            <span className="text-[#0038ff]">RESPECT THE CRAFT.</span>
          </h2>

          <p className="font-sans text-base sm:text-xl text-[#0A0A0A]/70 max-w-2xl mt-8 mb-10 leading-relaxed">
            By upholding these standards, we ensure LooseCode remains the most electrifying and trusted launchpad for creators across the globe.
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

      {/* Retain Existing LooseCode Footer */}
      <FlareRedFooter />
    </div>
  );
}
