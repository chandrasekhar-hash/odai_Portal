import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import ScrollTextReveal from './ScrollTextReveal';
import ScrollRevealItem from './ScrollRevealItem';
import heroBg from '../assets/hero-image.png';

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const [canParallax, setCanParallax] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setCanParallax(!prefersReducedMotion);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tableData = [
    {
      intake: 'January Intake',
      lastDate: '9th January 2027, 11:59 PM',
      nsetDate: '10th January 2027',
      nsetResult: '13th January 2027',
      interviewDate: '14th January 2027 onwards',
      finalOffer: 'Post Interview',
    },
  ];

  return (
    <section 
      id="home"
      className="relative w-full overflow-hidden bg-[#020512] text-white pt-8 pb-14 sm:pb-16 lg:pt-10 lg:pb-20 min-h-[500px] scroll-mt-28"
    >
      {/* Cinematic Hero Background Image with Enhanced Contrast, Rich Saturation & Subtle Parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <img
          src={heroBg}
          alt="OD AI HUB Admission Hero"
          className="w-full h-full object-cover object-center will-change-transform filter brightness-[0.80] contrast-[1.16] saturate-[1.25]"
          style={{
            transform: canParallax
              ? `scale(1.05) translate3d(0, ${Math.min(50, scrollY * 0.1)}px, 0)`
              : 'scale(1)',
            transition: 'transform 0.1s ease-out',
          }}
          loading="eager"
        />

        {/* Deep Navy/Blue-Black Overlay (~65% density) for Premium Contrast & Rich Colors */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-[#03081D]/72 via-[#07133B]/62 to-[#020615]/82"
          aria-hidden="true"
        />
        {/* Subtle radial vignette for cinematic depth */}
        <div 
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,transparent_25%,rgba(2,5,18,0.5)_100%)]"
          aria-hidden="true"
        />
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 w-full">
        {/* Breadcrumb: Home > Admission Process */}
        <nav aria-label="Breadcrumb" className="mb-3 sm:mb-5">
          <ol className="flex items-center space-x-1.5 sm:space-x-2 text-[12px] sm:text-[13px] text-blue-100 font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]">
            <li>
              <a
                href="#home"
                className="hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded px-0.5"
              >
                Home
              </a>
            </li>
            <li className="flex items-center text-blue-300">
              <ChevronRight className="w-3.5 h-3.5" />
            </li>
            <li className="text-white font-semibold truncate" aria-current="page">
              Admission Process
            </li>
          </ol>
        </nav>

        {/* Main Heading with Continuous Scroll-Based Reveal & Bright White Presence */}
        <div className="mb-3 sm:mb-4">
          <ScrollTextReveal
            as="h1"
            startOffset={0.95}
            endOffset={0.65}
            className="text-2xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-white leading-tight sm:leading-snug block drop-shadow-[0_2px_14px_rgba(0,0,0,0.75)]"
          >
            Admissions Open for 2027
          </ScrollTextReveal>
        </div>

        {/* Description in Soft White for High-End Readability */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <ScrollTextReveal
            as="p"
            startOffset={0.90}
            endOffset={0.50}
            className="text-sm sm:text-base text-slate-100 leading-relaxed font-normal block drop-shadow-[0_1px_8px_rgba(0,0,0,0.7)]"
          >
            Welcome! Our 5-step holistic selection process is designed to identify and nurture future leaders in AI and Computer Science. This page covers everything you need to secure your spot at OD AI HUB.
          </ScrollTextReveal>
        </div>

        {/* January Intake Dates Section with Refined Glass-like Appearance */}
        <div className="w-full">
          {/* Heading + Thin horizontal divider alongside */}
          <div className="flex items-center gap-3 sm:gap-6 mb-4 sm:mb-5">
            <ScrollTextReveal
              as="h2"
              startOffset={0.92}
              endOffset={0.58}
              className="text-base sm:text-xl md:text-[22px] font-bold text-white whitespace-nowrap tracking-wide inline-block drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]"
            >
              January Intake Dates
            </ScrollTextReveal>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-blue-400/40 via-white/20 to-transparent"></div>
          </div>

          {/* Six-column Responsive Table with Darker Premium Glassmorphic Treatment */}
          <ScrollRevealItem
            yOffset={24}
            scaleInitial={0.97}
            initialOpacity={0.35}
            startOffset={0.94}
            endOffset={0.62}
            className="w-full"
          >
            <div className="w-full overflow-hidden rounded-xl border border-white/20 bg-white/[0.04] shadow-[0_16px_48px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300 hover:border-white/35">
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full min-w-[760px] lg:min-w-[850px] border-collapse text-left">
                  {/* Table Header: Crisp Light background with clean dividers */}
                  <thead>
                    <tr className="bg-[#EDF3FD]/95 backdrop-blur-sm text-[#071330] divide-x divide-blue-200/80 border-b border-blue-200/70">
                      <th scope="col" className="px-3.5 sm:px-4 py-3 sm:py-3.5 text-xs sm:text-sm font-bold tracking-wide">
                        Intake
                      </th>
                      <th scope="col" className="px-3.5 sm:px-4 py-3 sm:py-3.5 text-xs sm:text-sm font-bold tracking-wide">
                        Last Date to Apply
                      </th>
                      <th scope="col" className="px-3.5 sm:px-4 py-3 sm:py-3.5 text-xs sm:text-sm font-bold tracking-wide">
                        NSET Date
                      </th>
                      <th scope="col" className="px-3.5 sm:px-4 py-3 sm:py-3.5 text-xs sm:text-sm font-bold tracking-wide">
                        NSET Result
                      </th>
                      <th scope="col" className="px-3.5 sm:px-4 py-3 sm:py-3.5 text-xs sm:text-sm font-bold tracking-wide">
                        Date of Interview
                      </th>
                      <th scope="col" className="px-3.5 sm:px-4 py-3 sm:py-3.5 text-xs sm:text-sm font-bold tracking-wide">
                        Final Offer
                      </th>
                    </tr>
                  </thead>

                  {/* Table Body: Darker deep navy glass row with crisp white text */}
                  <tbody className="bg-[#03091B]/90 backdrop-blur-xl divide-y divide-white/[0.08]">
                    {tableData.map((row, index) => (
                      <tr
                        key={index}
                        className="divide-x divide-white/[0.08] text-white font-bold text-xs sm:text-[13.5px] transition-colors hover:bg-blue-600/15"
                      >
                        <td className="px-3.5 sm:px-4 py-3.5 sm:py-4 whitespace-nowrap">
                          {row.intake}
                        </td>
                        <td className="px-3.5 sm:px-4 py-3.5 sm:py-4 whitespace-nowrap">
                          {row.lastDate}
                        </td>
                        <td className="px-3.5 sm:px-4 py-3.5 sm:py-4 whitespace-nowrap">
                          {row.nsetDate}
                        </td>
                        <td className="px-3.5 sm:px-4 py-3.5 sm:py-4 whitespace-nowrap">
                          {row.nsetResult}
                        </td>
                        <td className="px-3.5 sm:px-4 py-3.5 sm:py-4 whitespace-nowrap">
                          {row.interviewDate}
                        </td>
                        <td className="px-3.5 sm:px-4 py-3.5 sm:py-4 whitespace-nowrap">
                          {row.finalOffer}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollRevealItem>
        </div>
      </div>
    </section>
  );
}
