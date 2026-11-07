import React from 'react';
import {
  Brain,
  Code2,
  CheckCircle2,
  Clock,
  FileCheck2,
  ArrowUpRight,
  Layers,
  Sparkles,
  Users2,
  Binary,
} from 'lucide-react';
import ScrollTextReveal from './ScrollTextReveal';
import ScrollRevealItem from './ScrollRevealItem';
import TiltCard from './TiltCard';

export default function ExaminationModes() {
  const handleApplyClick = () => {
    const el = document.getElementById('important-dates');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const examModes = [
    {
      id: 'odat',
      title: 'ODAT (Odisha Domain & Aptitude Test)',
      trackBadge: 'DOMAIN & APTITUDE',
      badgeColor: 'text-[#1949D8] bg-[#EBF2FE] border-blue-200/80',
      icon: Brain,
      iconGradient: 'from-[#1949D8] to-blue-500 shadow-blue-500/25',
      accentBorder: 'border-blue-200/80 hover:border-[#1949D8]/60',
      subheading: 'You should appear for ODAT if...',
      criteria: [
        'You have a strong foundation in Mathematics.',
        'You are comfortable with Physics and Chemistry concepts from Classes 11 and 12.',
        'You enjoy analytical thinking, aptitude and logical reasoning.',
      ],
      focusTitle: 'Assessment Focus',
      focusEvaluates: [
        'Advanced Mathematics',
        'Physics (Class 11 & 12)',
        'Chemistry (Class 11 & 12)',
        'Analytical & Logical Reasoning',
      ],
      pattern: [
        {
          title: 'MCQ-based assessment',
          desc: null,
        },
        {
          title: 'Group-Based Applied Problem-Solving Assessment (GAPSA)',
          desc: null,
        },
      ],
      duration: {
        total: '180 Minutes',
        tag: '3 Hours',
        split: [
          { label: 'MCQ Examination', time: '90 minutes' },
          { label: 'GAPSA Assessment', time: '90 minutes' },
        ],
      },
      buttonText: 'Apply for ODAT',
      buttonVariant: 'bg-[#1949D8] hover:bg-[#153ca8] text-white shadow-blue-600/25',
    },
    {
      id: 'coding-odat',
      title: 'Coding ODAT',
      trackBadge: 'COMPUTATIONAL & CODING',
      badgeColor: 'text-indigo-700 bg-indigo-50 border-indigo-200/80',
      icon: Code2,
      iconGradient: 'from-[#0B1842] to-[#1949D8] shadow-indigo-500/25',
      accentBorder: 'border-blue-200/80 hover:border-indigo-500/60',
      subheading: 'You should appear for Coding ODAT if...',
      criteria: [
        'You enjoy solving logical and computational problems.',
        'You have an interest in programming and algorithmic thinking.',
        'You enjoy translating real-world problems into structured solutions.',
      ],
      focusTitle: 'Assessment Focus',
      focusEvaluates: [
        'Coding Proficiency',
        'Pseudocode Understanding',
        'Algorithmic & Logical Problem-Solving',
        'Group-Based Assessment (GAPSA)',
      ],
      pattern: [
        {
          title: 'Coding MCQs',
          desc: 'Multiple-choice questions testing programming concepts, logic and problem-solving.',
        },
        {
          title: 'Coding Questions',
          desc: 'Practical coding problems to evaluate programming ability, algorithmic thinking and implementation.',
        },
        {
          title: 'GAPSA',
          desc: 'Group-Based Applied Problem-Solving Assessment.',
        },
      ],
      duration: {
        total: '180 Minutes',
        tag: '3 Hours',
        split: [
          { label: 'Component 1', name: 'Coding MCQs', sub: 'Logic & Concepts' },
          { label: 'Component 2', name: 'Coding Questions', sub: 'Hands-on Coding' },
          { label: 'Component 3', name: 'GAPSA', sub: 'Applied Assessment' },
        ],
      },
      buttonText: 'Apply for Coding ODAT',
      buttonVariant: 'bg-[#0B1842] hover:bg-[#15255a] text-white shadow-slate-900/20',
    },
  ];

  return (
    <section
      id="examination-modes"
      className="relative w-full bg-white text-slate-800 py-14 sm:py-18 lg:py-20 border-t border-gray-200/70 scroll-mt-24"
    >
      <div className="max-w-[1248px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <div className="mb-3">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#1949D8] bg-[#EBF2FE] px-3.5 py-1 rounded-full shadow-sm">
              Entrance Assessment
            </span>
          </div>

          <ScrollTextReveal
            as="h2"
            startOffset={0.96}
            yTravel={20}
            className="text-2xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0B1842] tracking-tight block mb-3"
          >
            Choose Your Examination Path
          </ScrollTextReveal>

          <ScrollTextReveal
            as="p"
            startOffset={0.94}
            delay={0.05}
            yTravel={18}
            className="text-sm sm:text-base lg:text-lg text-slate-600 font-normal leading-relaxed block"
          >
            Two examination modes, one goal. Candidates can appear for either or both examinations. Qualifying in at least one examination is required to proceed in the admission process.
          </ScrollTextReveal>
        </div>

        {/* Two-Card Grid (Side-by-side on desktop, stacked on mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {examModes.map((exam, index) => {
            const Icon = exam.icon;
            const isCodingOdat = exam.id === 'coding-odat';

            return (
              <div key={exam.id} className="h-full">
                <TiltCard
                  maxTilt={4.5}
                  perspective={1100}
                  scale={1.012}
                  liftZ={14}
                  staggerIndex={index}
                  lightColor="rgba(25, 73, 216, 0.08)"
                  className="h-full"
                >
                  <div
                    className={`h-full flex flex-col justify-between bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border ${exam.accentBorder} shadow-[0_4px_20px_rgba(11,24,66,0.05)] hover:shadow-[0_16px_36px_rgba(25,73,216,0.12)] transition-all duration-300 relative overflow-hidden`}
                  >
                    {/* Subtle Top-Right Ambient Glow */}
                    <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-br from-blue-100/30 via-blue-50/10 to-transparent rounded-full blur-2xl pointer-events-none -mr-12 -mt-12" />

                    <div>
                      {/* Top Header Row: Icon + Track Badge */}
                      <div className="flex items-center justify-between gap-3 mb-5">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center text-white bg-gradient-to-tr ${exam.iconGradient} shadow-md`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>

                        <span
                          className={`text-[11px] font-bold px-3 py-1 rounded-full border uppercase tracking-wider ${exam.badgeColor}`}
                        >
                          {exam.trackBadge}
                        </span>
                      </div>

                      {/* Examination Title */}
                      <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B1842] tracking-tight mb-4">
                        {exam.title}
                      </h3>

                      {/* Subheading: "You should appear for ... if..." */}
                      <div className="mb-6 pb-6 border-b border-gray-100">
                        <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
                          <span>{exam.subheading}</span>
                        </h4>
                        <ul className="space-y-2.5">
                          {exam.criteria.map((item, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-xs sm:text-[14.5px] text-slate-700 leading-snug">
                              <CheckCircle2 className="w-4 h-4 text-[#1949D8] mt-0.5 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Assessment Focus Section */}
                      <div className="mb-6 pb-6 border-b border-gray-100">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900">
                            {exam.focusTitle}
                          </h4>
                          <span className="text-[11px] font-semibold text-slate-500 uppercase">
                            Evaluates
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {exam.focusEvaluates.map((topic, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-2 bg-[#F6F9FE] border border-blue-100/80 rounded-lg px-3 py-2 text-xs sm:text-[13px] font-medium text-slate-800"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-[#1949D8] flex-shrink-0" />
                              <span className="truncate">{topic}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Examination Pattern & Duration Container */}
                      <div className="space-y-3 mb-6">
                        {/* Examination Pattern */}
                        <div className="bg-[#FAFBFD] border border-gray-200/80 rounded-xl p-3.5 sm:p-4">
                          <div className="flex items-center gap-2 mb-2.5 text-xs font-bold uppercase tracking-wider text-slate-800">
                            <FileCheck2 className="w-4 h-4 text-[#1949D8]" />
                            <span>Examination Pattern</span>
                          </div>

                          {isCodingOdat ? (
                            /* Coding ODAT Pattern: 3 Distinct Components with Descriptions */
                            <ol className="space-y-2 text-xs sm:text-[13.5px] text-slate-700">
                              {exam.pattern.map((p, idx) => (
                                <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                                  <span className="w-5 h-5 rounded-md bg-indigo-100 text-indigo-700 text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                                    {idx + 1}
                                  </span>
                                  <div>
                                    <strong className="font-bold text-[#0B1842]">{p.title}</strong>
                                    {p.desc && <span className="text-slate-600"> – {p.desc}</span>}
                                  </div>
                                </li>
                              ))}
                            </ol>
                          ) : (
                            /* ODAT Pattern: Unchanged */
                            <ul className="space-y-1.5 pl-6 list-disc text-xs sm:text-[13.5px] text-slate-700 marker:text-[#1949D8]">
                              {exam.pattern.map((p, idx) => (
                                <li key={idx} className="leading-snug">{p.title}</li>
                              ))}
                            </ul>
                          )}
                        </div>

                        {/* Duration Block */}
                        <div className="bg-[#F0F5FE]/60 border border-blue-200/70 rounded-xl p-3.5 sm:p-4">
                          <div className="flex items-center justify-between mb-2.5">
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0B1842]">
                              <Clock className="w-4 h-4 text-[#1949D8]" />
                              <span>Duration: {exam.duration.total}</span>
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wide bg-[#1949D8] text-white px-2 py-0.5 rounded-md">
                              {exam.duration.tag}
                            </span>
                          </div>

                          {isCodingOdat ? (
                            /* Coding ODAT: 3 Individual Visual Blocks */
                            <div className="grid grid-cols-3 gap-2 text-center">
                              {exam.duration.split.map((splitItem, sIdx) => (
                                <div
                                  key={sIdx}
                                  className="bg-white border border-indigo-100/90 rounded-lg py-2 px-1.5 shadow-2xs flex flex-col justify-between"
                                >
                                  <span className="block text-[10px] font-bold text-indigo-700 uppercase tracking-wider">
                                    {splitItem.label}
                                  </span>
                                  <span className="block text-xs sm:text-[13px] font-bold text-[#0B1842] leading-tight my-1">
                                    {splitItem.name}
                                  </span>
                                  <span className="block text-[10px] text-slate-500 font-medium">
                                    {splitItem.sub}
                                  </span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            /* ODAT: Original 2-Block 90 + 90 Layout (Unchanged) */
                            <div className="grid grid-cols-2 gap-2 text-center">
                              {exam.duration.split.map((splitItem, sIdx) => (
                                <div
                                  key={sIdx}
                                  className="bg-white border border-blue-100 rounded-lg py-1.5 px-2 shadow-2xs"
                                >
                                  <span className="block text-[11px] font-medium text-slate-500">
                                    {splitItem.label}
                                  </span>
                                  <span className="block text-xs sm:text-sm font-bold text-[#1949D8]">
                                    {splitItem.time}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Button */}
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleApplyClick}
                        className={`w-full group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm sm:text-base font-semibold transition-all duration-200 active:scale-[0.99] shadow-md hover:shadow-lg ${exam.buttonVariant}`}
                      >
                        <span>{exam.buttonText}</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </button>
                    </div>
                  </div>
                </TiltCard>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
