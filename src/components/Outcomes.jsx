import React from 'react';
import { TrendingUp, Building2, Briefcase, Users, Star } from 'lucide-react';
import ScrollTextReveal from './ScrollTextReveal';
import ScrollRevealItem from './ScrollRevealItem';
import TiltCard from './TiltCard';

export default function Outcomes() {
  const stats = [
    { label: 'Average CTC', value: '₹21.6 LPA', detail: 'Across AI & core software engineering roles' },
    { label: 'Highest CTC', value: '₹50+ LPA', detail: 'Offered by leading multinational tech firms' },
    { label: 'Placement Support', value: '100%', detail: 'Dedicated career guidance & interview prep' },
    { label: 'Partner Companies', value: '300+', detail: 'Active recruiters and hiring partners' },
  ];

  const hiringPartners = [
    'Google',
    'Microsoft',
    'Amazon',
    'Atlassian',
    'Uber',
    'Swiggy',
    'Razorpay',
    'Adobe',
    'Goldman Sachs',
    'Flipkart',
  ];

  return (
    <section
      id="outcomes"
      className="relative w-full bg-white text-slate-800 py-16 sm:py-20 lg:py-24 border-t border-gray-100 scroll-mt-24"
    >
      <div className="max-w-[1248px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 sm:mb-14">
          <div className="mb-3">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#1949D8] bg-[#EBF2FE] px-3.5 py-1 rounded-full shadow-sm">
              Career Trajectory
            </span>
          </div>

          <ScrollTextReveal
            as="h2"
            startOffset={0.96}
            yTravel={22}
            className="text-2xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0B1842] tracking-tight block mb-3"
          >
            Placement & Career Outcomes
          </ScrollTextReveal>

          <ScrollTextReveal
            as="p"
            startOffset={0.94}
            delay={0.06}
            yTravel={20}
            className="text-sm sm:text-lg lg:text-[19px] text-slate-600 leading-relaxed max-w-4xl font-normal block"
          >
            Our students don't just learn theory; they enter the workforce with production-ready expertise, strong algorithmic problem solving, and top-tier placement offers.
          </ScrollTextReveal>
        </div>

        {/* 4 Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {stats.map((stat, index) => (
            <ScrollRevealItem
              key={stat.label}
              staggerIndex={index}
              staggerDelay={0.06}
              yOffset={24}
              scaleInitial={0.98}
              initialOpacity={0.2}
              startOffset={0.96}
              endOffset={0.7}
            >
              <TiltCard maxTilt={4} scale={1.02} className="h-full">
                <div className="bg-[#F8FAFC] border border-blue-100 rounded-2xl p-5 sm:p-6 text-center h-full flex flex-col justify-between shadow-sm hover:border-blue-300 transition-colors">
                  <span className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider mb-2 block">
                    {stat.label}
                  </span>
                  <div className="text-2xl sm:text-4xl font-extrabold text-[#1949D8] tracking-tight mb-2">
                    {stat.value}
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed font-medium">
                    {stat.detail}
                  </p>
                </div>
              </TiltCard>
            </ScrollRevealItem>
          ))}
        </div>

        {/* Hiring Partners Ticker / Grid */}
        <ScrollRevealItem
          yOffset={20}
          scaleInitial={0.99}
          initialOpacity={0.3}
          startOffset={0.96}
          endOffset={0.7}
        >
          <div className="bg-[#F8FAFC] border border-gray-200/90 rounded-2xl p-6 sm:p-8">
            <span className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider block text-center mb-6">
              Where Our Community Excels & Innovates
            </span>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {hiringPartners.map((partner) => (
                <div
                  key={partner}
                  className="bg-white border border-gray-200/80 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold text-[#0B1842] shadow-sm hover:border-[#1949D8] hover:text-[#1949D8] transition-all cursor-default select-none"
                >
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </ScrollRevealItem>
      </div>
    </section>
  );
}

