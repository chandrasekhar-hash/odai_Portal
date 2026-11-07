import React from 'react';
import { ScrollText, Trophy, BookOpen, ArrowUpRight } from 'lucide-react';
import TiltCard from './TiltCard';
import ScrollTextReveal from './ScrollTextReveal';
import ScrollRevealItem from './ScrollRevealItem';
import ScrollImage from './ScrollImage';

export default function BenefitsEarly() {
  const cards = [
    {
      id: 'scholarship',
      icon: ScrollText,
      heading: 'Higher Scholarship Opportunities',
      description:
        'Early applicants are twice as likely to secure scholarships - Apply Now for the best chance!',
      placeholderLabel: '3D graduation cap illustration placeholder',
    },
    {
      id: 'attempts',
      icon: Trophy,
      heading: 'Multiple Attempts for Success',
      description:
        'Apply early and get up to 3 attempts, giving you more opportunities to learn from your mistakes and succeed.',
      placeholderLabel: '3D trophy illustration placeholder',
    },
    {
      id: 'prep',
      icon: BookOpen,
      heading: 'Special Prep Material',
      description:
        'Get priority access to exclusive preparation material.',
      placeholderLabel: '3D play-button illustration placeholder',
    },
  ];

  return (
    <section
      id="benefits-early"
      className="relative w-full bg-[#111111] text-white pt-14 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 lg:pb-18"
    >
      <div className="max-w-[1248px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading with Continuous Scroll-Based Reveal */}
        <div className="mb-8 sm:mb-12">
          <ScrollTextReveal
            as="h2"
            startOffset={0.92}
            endOffset={0.60}
            className="text-2xl sm:text-4xl lg:text-[42px] font-extrabold text-white tracking-tight leading-tight block"
          >
            Benefits of Applying Early
          </ScrollTextReveal>
        </div>

        {/* Three Benefit Cards Grid with Continuous Staggered Entrance & 3D Layered Depth */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {cards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <ScrollRevealItem
                key={card.id}
                staggerIndex={index}
                staggerDelay={0.08}
                yOffset={32}
                scaleInitial={0.98}
                initialOpacity={0.05}
                className="h-full"
              >
                <TiltCard
                  maxTilt={10}
                  perspective={900}
                  scale={1.03}
                  liftZ={22}
                  darkTheme={true}
                  className="h-full"
                >
                  <div className="bg-[#171717] border border-[#333333] rounded-[10px] p-5 sm:p-6 flex flex-col justify-between h-full transition-colors hover:border-[#555555]">
                    {/* Top Content with 3D Layered Depth */}
                    <div>
                      {/* Small Icon Container floating above */}
                      <div 
                        style={{ transform: 'translateZ(28px)' }}
                        className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white mb-4 shadow-sm transition-transform"
                      >
                        <IconComponent className="w-5 h-5 text-blue-400" />
                      </div>

                      <h3 
                        style={{ transform: 'translateZ(22px)' }}
                        className="text-base sm:text-xl font-bold text-white mb-2 sm:mb-2.5 leading-snug transition-transform"
                      >
                        {card.heading}
                      </h3>

                      <p 
                        style={{ transform: 'translateZ(14px)' }}
                        className="text-xs sm:text-[14.5px] text-gray-300 leading-relaxed font-normal transition-transform"
                      >
                        {card.description}
                      </p>
                    </div>

                    {/* Bottom: Large EMPTY Visual Placeholder with Scroll Scale & Parallax */}
                    <ScrollImage
                      scaleFrom={0.94}
                      opacityFrom={0.35}
                      parallaxDistance={14}
                      className="mt-5 sm:mt-6 rounded-md"
                    >
                      <div
                        style={{ transform: 'translateZ(10px)' }}
                        className="w-full h-44 sm:h-56 rounded-md bg-transparent border border-dashed border-[#2a2a2a] flex items-center justify-center transition-transform hover:border-gray-600"
                        title={card.placeholderLabel}
                        aria-label={card.placeholderLabel}
                      >
                        {/* EMPTY PLACEHOLDER: Insert illustration asset here */}
                      </div>
                    </ScrollImage>
                  </div>
                </TiltCard>
              </ScrollRevealItem>
            );
          })}
        </div>

        {/* How to Apply? Section with 3D Hover & Continuous Text Reveal */}
        <ScrollRevealItem
          yOffset={24}
          scaleInitial={0.97}
          initialOpacity={0.35}
          startOffset={0.94}
          endOffset={0.65}
          className="mt-8 sm:mt-10"
        >
          <TiltCard
            maxTilt={6}
            perspective={950}
            scale={1.015}
            liftZ={14}
            darkTheme={true}
          >
            <div className="bg-[#171717] border border-[#333333] rounded-[10px] p-5 sm:p-8 hover:border-[#444444] transition-colors">
              <div 
                style={{ transform: 'translateZ(20px)' }}
                className="mb-4 transition-transform"
              >
                <span className="inline-block bg-[#1949D8] text-white text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider shadow-sm">
                  How to Apply?
                </span>
              </div>

              <ul 
                style={{ transform: 'translateZ(12px)' }}
                className="space-y-3 sm:space-y-3.5 text-xs sm:text-[15px] text-gray-300 leading-relaxed pl-1 transition-transform"
              >
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#1949D8] mt-2 flex-shrink-0" />
                  <span>
                    While registering for NSET, make sure you fill the detailed profile form on the dashboard with all academic and financial details. This will form the basis of the amount of scholarship being given to you.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#1949D8] mt-2 flex-shrink-0" />
                  <span>
                    At OD AI HUB you can <strong className="font-bold text-white">get upto 100% scholarship</strong>. Applying early increases the chances of receiving a scholarship.
                  </span>
                </li>
              </ul>
            </div>
          </TiltCard>
        </ScrollRevealItem>

        {/* Bottom Application Banner with Continuous Entrance & 3D Depth */}
        <ScrollRevealItem
          yOffset={20}
          scaleInitial={0.98}
          initialOpacity={0.4}
          startOffset={0.94}
          endOffset={0.68}
          className="mt-6 sm:mt-8"
        >
          <TiltCard
            maxTilt={5}
            perspective={1000}
            scale={1.012}
            liftZ={10}
            darkTheme={true}
          >
            <div className="bg-[#202020] border border-[#333333] rounded-[10px] p-5 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <ScrollTextReveal
                as="div"
                startOffset={0.92}
                endOffset={0.65}
                style={{ transform: 'translateZ(18px)' }}
                className="text-base sm:text-xl font-bold text-white transition-transform"
              >
                Apply now for 2026 Admissions
              </ScrollTextReveal>

              <button
                type="button"
                style={{ transform: 'translateZ(24px)' }}
                className="group inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm sm:text-base font-semibold text-white bg-[#1949D8] hover:bg-[#153ca8] active:scale-[0.98] rounded-lg shadow-sm hover:shadow-md transition-all duration-150 whitespace-nowrap"
              >
                <span>Apply Now</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </TiltCard>
        </ScrollRevealItem>

      </div>
    </section>
  );
}
