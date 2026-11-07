import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import ScrollTextReveal from './ScrollTextReveal';
import ScrollRevealItem from './ScrollRevealItem';

export default function Faqs() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'What is OD AI HUB and what programs are offered?',
      a: 'OD AI HUB is an advanced tech higher education institution dedicated to nurturing premier talent in Artificial Intelligence and Computer Science. We offer 4-year undergraduate B.Tech programs combining rigorous foundational computer science with specialized AI/ML engineering and a 1-year paid industry immersion phase.',
    },
    {
      q: 'What is the eligibility criteria for admissions?',
      a: 'Candidates must have completed or be appearing for their Class 12 (or equivalent) board examinations with Physics, Chemistry, and Mathematics (PCM). Selection is holistic, based on performance in our National Scholarship & Entrance Test (NSET), application profile, and interactive interview rounds.',
    },
    {
      q: 'How is the OD AI HUB NSET entrance exam structured?',
      a: 'NSET evaluates analytical reasoning, mathematical ability, and algorithmic thinking. Candidates with exceptional percentiles in JEE Main or high SAT scores can also qualify via the Fast Track application route.',
    },
    {
      q: 'What is the tuition fee and scholarship structure?',
      a: 'The annual tuition fee for the main program is ₹1.4 lakh per year across all 4 years, totaling ₹5.6 lakh for the complete program. Merit and need-based scholarships up to 100% are awarded based on NSET performance and profile evaluation.',
    },
    {
      q: 'Is hostel accommodation compulsory?',
      a: 'Hostel accommodation is highly encouraged during the first three years to immerse students in the campus learning culture, hackathons, and lab projects. In Year 4 (during the industry immersion phase), hostel accommodation is optional.',
    },
    {
      q: 'How does the 1-year Industry Immersion work?',
      a: 'During Year 4, students transition from campus coursework to full-time internships with partner technology companies and AI startups. Students receive market stipends and often receive Pre-Placement Offers (PPOs) prior to graduation.',
    },
  ];

  return (
    <section
      id="faqs"
      className="relative w-full bg-white text-slate-800 py-16 sm:py-20 lg:py-24 border-t border-gray-100 scroll-mt-24"
    >
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="mb-3">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#1949D8] bg-[#EBF2FE] px-3.5 py-1 rounded-full shadow-sm">
              Questions & Answers
            </span>
          </div>

          <ScrollTextReveal
            as="h2"
            startOffset={0.96}
            yTravel={22}
            className="text-2xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0B1842] tracking-tight block mb-3 text-center"
          >
            Frequently Asked Questions
          </ScrollTextReveal>

          <ScrollTextReveal
            as="p"
            startOffset={0.94}
            delay={0.06}
            yTravel={20}
            className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal block text-center"
          >
            Find quick answers to commonly asked questions about admissions, academic tracks, fees, and campus life at OD AI HUB.
          </ScrollTextReveal>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <ScrollRevealItem
                key={index}
                staggerIndex={index}
                staggerDelay={0.04}
                yOffset={16}
                scaleInitial={0.99}
                initialOpacity={0.2}
                startOffset={0.96}
                endOffset={0.75}
              >
                <div
                  className={`border rounded-xl transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'border-[#1949D8] bg-blue-50/20 shadow-sm'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1949D8]"
                    aria-expanded={isOpen}
                  >
                    <span className="font-bold text-sm sm:text-base text-[#0B1842] leading-snug">
                      {faq.q}
                    </span>
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? 'bg-[#1949D8] text-white rotate-180' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-4 sm:pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed animate-fadeIn">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              </ScrollRevealItem>
            );
          })}
        </div>
      </div>
    </section>
  );
}

