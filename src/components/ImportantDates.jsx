import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import ScrollTextReveal from './ScrollTextReveal';
import ScrollRevealItem from './ScrollRevealItem';

export default function ImportantDates() {
  const datesData = [
    {
      intake: 'January Intake',
      deadline: '9th January 2027, 11:59 PM',
      nsetDate: '10th January 2027',
      fee: '₹100/-',
    },
  ];

  return (
    <section
      id="important-dates"
      className="relative w-full bg-white text-slate-800 py-14 sm:py-20 lg:py-24 border-t border-gray-100"
    >
      <div className="max-w-[1248px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Description with Continuous Scroll-Based Reveal */}
        <div className="mb-8 sm:mb-12">
          <ScrollTextReveal
            as="h2"
            startOffset={0.92}
            endOffset={0.55}
            className="text-2xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0B1842] tracking-tight leading-tight block mb-3"
          >
            Important Dates
          </ScrollTextReveal>

          <ScrollTextReveal
            as="p"
            startOffset={0.90}
            endOffset={0.45}
            className="text-sm sm:text-lg lg:text-[20px] text-slate-600 leading-relaxed max-w-5xl font-normal block"
          >
            Admissions to OD AI HUB will happen across three rounds. Scholarships are limited and applying early increases the chances of receiving one since these are awarded to select students upon qualification.
          </ScrollTextReveal>
        </div>

        {/* Important Dates Table with Continuous Scroll Entrance & Elevation */}
        <ScrollRevealItem
          yOffset={24}
          scaleInitial={0.97}
          initialOpacity={0.35}
          startOffset={0.94}
          endOffset={0.62}
          className="w-full"
        >
          <div className="w-full overflow-hidden rounded-xl sm:rounded-2xl border border-blue-400/90 shadow-md">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full min-w-[700px] sm:min-w-[760px] border-collapse text-center">
                
                {/* Table Header: Light blue background, thin bright-blue column dividers */}
                <thead>
                  <tr className="bg-[#EAF1FD] text-[#0B1842] h-14 sm:h-16 divide-x divide-blue-300/80 border-b border-blue-300/80">
                    <th scope="col" className="px-3 sm:px-4 py-3 text-xs sm:text-base font-bold tracking-wide">
                      Intake
                    </th>
                    <th scope="col" className="px-3 sm:px-4 py-3 text-xs sm:text-base font-bold tracking-wide">
                      Deadline
                    </th>
                    <th scope="col" className="px-3 sm:px-4 py-3 text-xs sm:text-base font-bold tracking-wide">
                      NSET Date
                    </th>
                    <th scope="col" className="px-3 sm:px-4 py-3 text-xs sm:text-base font-bold tracking-wide">
                      Application Fee
                    </th>
                    <th scope="col" className="px-3 sm:px-4 py-3 text-xs sm:text-base font-bold tracking-wide">
                      Apply Now
                    </th>
                  </tr>
                </thead>

                {/* Table Data Row: White/light background, center-aligned, ~70px height */}
                <tbody className="bg-white divide-y divide-blue-200/60">
                  {datesData.map((row, index) => (
                    <tr
                      key={index}
                      className="h-16 sm:h-[70px] divide-x divide-blue-200/70 text-[#0B1842] text-xs sm:text-[15px] font-medium transition-colors hover:bg-blue-50/40"
                    >
                      <td className="px-3 sm:px-4 py-3 whitespace-nowrap font-bold text-slate-900">
                        {row.intake}
                      </td>
                      <td className="px-3 sm:px-4 py-3 whitespace-nowrap">
                        {row.deadline}
                      </td>
                      <td className="px-3 sm:px-4 py-3 whitespace-nowrap">
                        {row.nsetDate}
                      </td>
                      <td className="px-3 sm:px-4 py-3 whitespace-nowrap font-semibold">
                        {row.fee}
                      </td>
                      <td className="px-3 sm:px-4 py-3 whitespace-nowrap">
                        <button
                          type="button"
                          className="group inline-flex items-center justify-center gap-1.5 px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#1949D8] hover:bg-[#153ca8] active:scale-[0.98] rounded-lg shadow-sm hover:shadow-md transition-all duration-150"
                        >
                          <span>Apply Now</span>
                          <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ScrollRevealItem>
      </div>
    </section>
  );
}
