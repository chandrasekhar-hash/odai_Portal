import React from 'react';
import { Cpu, Code, Layers, Sparkles, CheckCircle2 } from 'lucide-react';
import ScrollTextReveal from './ScrollTextReveal';
import ScrollRevealItem from './ScrollRevealItem';
import TiltCard from './TiltCard';

export default function Programs() {
  const tracks = [
    {
      id: 'ai-core',
      icon: Cpu,
      badge: 'Core Program',
      title: '4-Year B.Tech in Artificial Intelligence & Computer Science',
      description:
        'A comprehensive foundation covering neural networks, deep learning, algorithmic problem solving, and modern distributed systems designed by premier AI researchers.',
      highlights: [
        'Advanced Machine Learning & LLM Systems',
        'Data Structures & High-Performance Computing',
        'Applied Mathematics, Linear Algebra & Probability',
      ],
    },
    {
      id: 'full-stack-systems',
      icon: Code,
      badge: 'Systems Specialization',
      title: 'AI Systems & Cloud Architecture Track',
      description:
        'Hands-on engineering focusing on scalable cloud computing, microservices, AI inference pipelines, GPU computing, and real-time data streaming.',
      highlights: [
        'GPU Cluster Architecture & PyTorch Optimization',
        'Scalable Backend Architecture & Cloud Infrastructure',
        'Production AI Deployment & Edge Computing',
      ],
    },
    {
      id: 'industry-immersion',
      icon: Layers,
      badge: 'Year 4 Immersion',
      title: '1-Year Full-Time Industry Immersion',
      description:
        'Spend your entire final year working full-time at top tech companies, venture-backed startups, or research labs with dedicated mentorship and stipend.',
      highlights: [
        'Full-Time Paid Industry Apprenticeship',
        '1-on-1 Mentorship with Senior Tech Leaders',
        'Direct Conversion to Full-Time Offers (PPO)',
      ],
    },
  ];

  return (
    <section
      id="programs"
      className="relative w-full bg-white text-slate-800 py-16 sm:py-20 lg:py-24 border-t border-gray-100 scroll-mt-24"
    >
      <div className="max-w-[1248px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 sm:mb-14">
          <div className="mb-3">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#1949D8] bg-[#EBF2FE] px-3.5 py-1 rounded-full shadow-sm">
              Academic Offerings
            </span>
          </div>

          <ScrollTextReveal
            as="h2"
            startOffset={0.96}
            yTravel={22}
            className="text-2xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0B1842] tracking-tight block mb-3"
          >
            Undergraduate Programs in AI
          </ScrollTextReveal>

          <ScrollTextReveal
            as="p"
            startOffset={0.94}
            delay={0.06}
            yTravel={20}
            className="text-sm sm:text-lg lg:text-[19px] text-slate-600 leading-relaxed max-w-4xl font-normal block"
          >
            Crafted for aspiring engineers and innovators. Learn computer science and cutting-edge artificial intelligence through rigorous, hands-on, industry-aligned engineering.
          </ScrollTextReveal>
        </div>

        {/* 3-Column Program Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {tracks.map((track, index) => {
            const Icon = track.icon;
            return (
              <ScrollRevealItem
                key={track.id}
                staggerIndex={index}
                staggerDelay={0.08}
                yOffset={28}
                scaleInitial={0.98}
                initialOpacity={0.2}
                startOffset={0.96}
                endOffset={0.7}
                className="h-full"
              >
                <TiltCard maxTilt={6} scale={1.02} className="h-full">
                  <div className="bg-[#F8FAFC] border border-gray-200/90 rounded-2xl p-6 sm:p-7 flex flex-col justify-between h-full hover:border-blue-300 hover:shadow-lg transition-all duration-300 group">
                    <div>
                      {/* Top icon and badge */}
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-12 h-12 rounded-xl bg-[#1949D8] text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-[11px] font-bold text-[#1949D8] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200 uppercase tracking-wide">
                          {track.badge}
                        </span>
                      </div>

                      {/* Heading */}
                      <h3 className="text-lg sm:text-xl font-bold text-[#0B1842] mb-3 leading-snug group-hover:text-[#1949D8] transition-colors">
                        {track.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                        {track.description}
                      </p>
                    </div>

                    {/* Highlights list */}
                    <div className="pt-4 border-t border-gray-200/80 space-y-2.5">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                        Key Curriculum Pillars
                      </span>
                      {track.highlights.map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs sm:text-[13px] text-slate-700 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-[#1949D8] mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </ScrollRevealItem>
            );
          })}
        </div>
      </div>
    </section>
  );
}

