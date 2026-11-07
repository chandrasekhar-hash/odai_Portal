import React from 'react';
import { Home, Laptop, Trophy, Coffee, Compass, BookOpen } from 'lucide-react';
import ScrollTextReveal from './ScrollTextReveal';
import ScrollRevealItem from './ScrollRevealItem';
import TiltCard from './TiltCard';

export default function CampusLife() {
  const features = [
    {
      icon: Laptop,
      title: '24/7 AI Compute Labs',
      description:
        'Dedicated high-performance GPU clusters, workstation pods, and Gigabit optical fiber connectivity for training deep learning models day and night.',
    },
    {
      icon: Trophy,
      title: 'Hackathons & AI Sprints',
      description:
        'Frequent internal and national hackathons, coding leagues, and open-source contributions with mentorship from alumni and engineering leaders.',
    },
    {
      icon: Home,
      title: 'Modern Residential Campus',
      description:
        'Fully furnished residences with collaborative student lounges, study pods, indoor recreation zones, high-speed WiFi, and 24/7 campus security.',
    },
    {
      icon: Coffee,
      title: 'Vibrant Cafeteria & Mess',
      description:
        'Hygienic multi-cuisine dining with balanced vegetarian, non-vegetarian, and Jain food options managed collaboratively with student food councils.',
    },
    {
      icon: Compass,
      title: 'Student-Led Tech Clubs',
      description:
        'Active societies across Robotics, Competitive Programming, Generative AI, Web3, Cyber Security, and product entrepreneurship incubation.',
    },
    {
      icon: BookOpen,
      title: 'Digital & Physical Library',
      description:
        'Extensive collection of modern CS literature, research journals, IEEE/ACM digital access, and quiet private study enclaves.',
    },
  ];

  return (
    <section
      id="campus-life"
      className="relative w-full bg-[#F8FAFC] text-slate-800 py-16 sm:py-20 lg:py-24 border-t border-gray-200/80 scroll-mt-24"
    >
      <div className="max-w-[1248px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 sm:mb-14">
          <div className="mb-3">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#1949D8] bg-[#EBF2FE] px-3.5 py-1 rounded-full shadow-sm">
              Community & Infrastructure
            </span>
          </div>

          <ScrollTextReveal
            as="h2"
            startOffset={0.96}
            yTravel={22}
            className="text-2xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0B1842] tracking-tight block mb-3"
          >
            Campus Life & Culture
          </ScrollTextReveal>

          <ScrollTextReveal
            as="p"
            startOffset={0.94}
            delay={0.06}
            yTravel={20}
            className="text-sm sm:text-lg lg:text-[19px] text-slate-600 leading-relaxed max-w-4xl font-normal block"
          >
            A vibrant, immersive campus ecosystem that pairs high-intensity learning with sports, creative exploration, and lasting friendships.
          </ScrollTextReveal>
        </div>

        {/* 6-Grid Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <ScrollRevealItem
                key={item.title}
                staggerIndex={index}
                staggerDelay={0.06}
                yOffset={24}
                scaleInitial={0.98}
                initialOpacity={0.2}
                startOffset={0.96}
                endOffset={0.7}
                className="h-full"
              >
                <TiltCard maxTilt={5} scale={1.02} className="h-full">
                  <div className="bg-white border border-gray-200/80 rounded-2xl p-6 flex flex-col justify-between h-full shadow-sm hover:border-blue-300 hover:shadow-md transition-all group">
                    <div>
                      <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#1949D8] border border-blue-200 flex items-center justify-center mb-4 group-hover:bg-[#1949D8] group-hover:text-white transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-[#0B1842] mb-2 leading-snug group-hover:text-[#1949D8] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                        {item.description}
                      </p>
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

