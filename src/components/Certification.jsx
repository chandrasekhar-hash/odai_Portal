import React from 'react';
import { Award, ShieldCheck, CheckCircle2, Globe, ExternalLink } from 'lucide-react';
import ScrollTextReveal from './ScrollTextReveal';
import ScrollRevealItem from './ScrollRevealItem';
import TiltCard from './TiltCard';

export default function Certification() {
  const certifications = [
    {
      title: 'Advanced AI & Systems Engineering Certification',
      issuer: 'OD AI HUB Academic Council',
      badge: 'Institution Credential',
      description:
        'A rigorous diploma verifying 2000+ hours of software design, algorithmic complexity, neural architecture engineering, and production system delivery.',
      points: [
        'Verified transcript of completed engineering projects',
        'Demonstrated proficiency in modern AI frameworks (PyTorch, Triton)',
        'Signed evaluation by industry tech leaders and faculty',
      ],
    },
    {
      title: 'Industry Co-Certifications & Specializations',
      issuer: 'Global Tech & Cloud Partners',
      badge: 'Industry Verified',
      description:
        'Direct certification pathways covering Cloud Infrastructure, Large Language Model Engineering, Distributed Systems, and MLOps deployment.',
      points: [
        'Recognized across top-tier multinational product companies',
        'Real-world capstone portfolio published on GitHub',
        'Direct alignment with tech interview and recruitment standards',
      ],
    },
  ];

  return (
    <section
      id="certification"
      className="relative w-full bg-[#F8FAFC] text-slate-800 py-16 sm:py-20 lg:py-24 border-t border-gray-200/80 scroll-mt-24"
    >
      <div className="max-w-[1248px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 sm:mb-14">
          <div className="mb-3">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#1949D8] bg-[#EBF2FE] px-3.5 py-1 rounded-full shadow-sm">
              Credentials & Recognition
            </span>
          </div>

          <ScrollTextReveal
            as="h2"
            startOffset={0.96}
            yTravel={22}
            className="text-2xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0B1842] tracking-tight block mb-3"
          >
            Certification & Validation
          </ScrollTextReveal>

          <ScrollTextReveal
            as="p"
            startOffset={0.94}
            delay={0.06}
            yTravel={20}
            className="text-sm sm:text-lg lg:text-[19px] text-slate-600 leading-relaxed max-w-4xl font-normal block"
          >
            Your accomplishments at OD AI HUB are validated through rigorous, project-driven certifications recognized by global tech employers and academic leaders.
          </ScrollTextReveal>
        </div>

        {/* 2-Column Certification Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {certifications.map((item, index) => (
            <ScrollRevealItem
              key={index}
              staggerIndex={index}
              staggerDelay={0.08}
              yOffset={26}
              scaleInitial={0.98}
              initialOpacity={0.2}
              startOffset={0.96}
              endOffset={0.7}
              className="h-full"
            >
              <TiltCard maxTilt={5} scale={1.02} className="h-full">
                <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-full shadow-sm hover:border-blue-300 hover:shadow-md transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1949D8] border border-blue-200 flex items-center justify-center">
                        <Award className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold text-[#1949D8] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-[#0B1842] mb-1.5 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#1949D8] mb-4">
                      {item.issuer}
                    </p>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-5 border-t border-gray-100 space-y-2.5">
                    {item.points.map((pt, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-[13.5px] text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#1949D8] mt-0.5 flex-shrink-0" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </ScrollRevealItem>
          ))}
        </div>
      </div>
    </section>
  );
}

