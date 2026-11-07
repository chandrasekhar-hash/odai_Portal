import React from 'react';
import TiltCard from './TiltCard';
import ScrollTextReveal from './ScrollTextReveal';
import ScrollRevealItem from './ScrollRevealItem';

export default function FeeStructure() {

  return (
    <section
      id="fee-structure"
      className="relative w-full bg-white text-slate-800 py-14 sm:py-20 lg:py-24 border-t border-gray-100"
    >
      <div className="max-w-[1248px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Section Heading with Continuous Scroll Reveal */}
        <div className="mb-8 sm:mb-12">
          <ScrollTextReveal
            as="h2"
            startOffset={0.92}
            endOffset={0.60}
            className="text-2xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0B1842] tracking-tight leading-tight block"
          >
            Fee Structure
          </ScrollTextReveal>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* SUBSECTION 1: OD AI HUB Tuition Fees */}
        {/* ------------------------------------------------------------- */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 mb-6">
            <ScrollTextReveal
              as="h3"
              startOffset={0.92}
              endOffset={0.62}
              className="text-lg sm:text-2xl font-bold text-[#0B1842] inline-block"
            >
              OD AI HUB Tuition Fees
            </ScrollTextReveal>

            {/* Single Track Option: CS & AI */}
            <div className="inline-flex items-center bg-gray-100 p-1 rounded-lg border border-gray-200 self-start sm:self-auto shadow-inner">
              <span className="px-3.5 sm:px-4 py-1.5 rounded-md text-xs sm:text-sm font-semibold bg-[#0B1842] text-white shadow-sm">
                CS & AI
              </span>
            </div>
          </div>

          <ScrollRevealItem
            yOffset={22}
            scaleInitial={0.97}
            initialOpacity={0.35}
            startOffset={0.94}
            endOffset={0.65}
            className="w-full animate-fadeIn"
          >
            {/* Clean Horizontal Tuition Fee Table */}
            <div className="w-full overflow-hidden rounded-xl sm:rounded-2xl border border-blue-400/90 shadow-sm bg-white">
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full min-w-[680px] sm:min-w-[760px] border-collapse text-left">
                  <thead>
                    <tr className="bg-[#EAF1FD] text-[#0B1842] h-14 sm:h-16 divide-x divide-blue-300/80 border-b border-blue-300/80">
                      <th scope="col" className="px-4 sm:px-6 py-3.5 text-xs sm:text-sm font-bold tracking-wide w-[20%]">
                        Academic Year
                      </th>
                      <th scope="col" className="px-3 sm:px-4 py-3.5 text-xs sm:text-sm font-bold tracking-wide text-center w-[16%]">
                        Year 1
                      </th>
                      <th scope="col" className="px-3 sm:px-4 py-3.5 text-xs sm:text-sm font-bold tracking-wide text-center w-[16%]">
                        Year 2
                      </th>
                      <th scope="col" className="px-3 sm:px-4 py-3.5 text-xs sm:text-sm font-bold tracking-wide text-center w-[16%]">
                        Year 3
                      </th>
                      <th scope="col" className="px-3 sm:px-4 py-3.5 text-xs sm:text-sm font-bold tracking-wide text-center w-[16%]">
                        Year 4
                      </th>
                      <th scope="col" className="px-3 sm:px-5 py-3.5 text-xs sm:text-sm font-bold tracking-wide text-center w-[16%] bg-[#DCE8FC] text-[#1949D8]">
                        Total
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-blue-200/70 text-xs sm:text-[14.5px] text-[#0B1842]">
                    <tr className="divide-x divide-blue-200/70 hover:bg-blue-50/20 transition-colors">
                      <td className="bg-[#EAF1FD] px-4 sm:px-6 py-4 sm:py-5 font-bold text-[#0B1842]">
                        Tuition Fee
                      </td>
                      <td className="bg-white px-3 sm:px-4 py-4 sm:py-5 text-center font-medium">
                        ₹1.4 lakh
                      </td>
                      <td className="bg-white px-3 sm:px-4 py-4 sm:py-5 text-center font-medium">
                        ₹1.4 lakh
                      </td>
                      <td className="bg-white px-3 sm:px-4 py-4 sm:py-5 text-center font-medium">
                        ₹1.4 lakh
                      </td>
                      <td className="bg-white px-3 sm:px-4 py-4 sm:py-5 text-center font-medium">
                        ₹1.4 lakh
                      </td>
                      <td className="bg-[#F0F5FE] px-3 sm:px-5 py-4 sm:py-5 text-center font-extrabold text-sm sm:text-base text-[#1949D8]">
                        ₹5.6 lakh
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Total Amount Summary Box (Aligned Right with 3D hover) */}
            <div className="flex justify-end mt-4 mb-8">
              <TiltCard maxTilt={4} scale={1.02} staggerIndex={1}>
                <div className="inline-flex items-center rounded-lg border border-blue-400/90 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-[#EAF1FD] text-[#0B1842] text-xs sm:text-sm font-bold px-3.5 sm:px-4 py-2 sm:py-2.5 border-r border-blue-300">
                    Total Tuition Fee
                  </div>
                  <div className="bg-white text-[#1949D8] text-sm sm:text-base font-extrabold px-4 sm:px-5 py-2 sm:py-2.5">
                    ₹5.6 lakh
                  </div>
                </div>
              </TiltCard>
            </div>
          </ScrollRevealItem>

          {/* Main Fee Notes Container with Continuous Scroll Reveal */}
          <ScrollRevealItem
            yOffset={24}
            scaleInitial={0.97}
            initialOpacity={0.35}
            startOffset={0.94}
            endOffset={0.65}
            className="w-full"
          >
            <div className="bg-[#F8FAFC] border border-gray-200/90 rounded-2xl p-5 sm:p-8 space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed shadow-sm hover:border-blue-200 transition-colors">
            {/* Note Badge & Bullets */}
            <div>
              <div className="mb-4">
                <span className="inline-block bg-[#EBF2FE] text-[#1949D8] text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider">
                  Note
                </span>
              </div>

              <ol className="list-decimal pl-5 space-y-3 text-slate-700 marker:font-semibold marker:text-[#0B1842]">
                <li>
                  The hostel fee mention here is indicative, the exact fees will be shared as a part of your offer letter.
                </li>
                <li>
                  The hostel fee is subject to periodic revision in line with inflation. Over the past two years, the fee has increased by approximately 8% to 10% annually. However, this percentage is not fixed and may vary in the future.
                </li>
                <li>
                  The hostel fee is charged annually; however the students are expected to vacate their rooms into a common room during the one-month summer vacation to enable painting and maintenance. Students who wish to stay on campus during vacation for projects can do so with special permission.
                </li>
                <li>
                  In Year 4 (Industry Immersion phase), the hostel is optional; if you choose to opt in, the hostel fee is paid in advance before the year begins and will remain fixed for the full year.
                </li>
                <li>
                  Hostel Room options: Triple (₹1.36L), Double (₹1.69L), Large Double (₹1.95L).
                </li>
                <li>
                  Meals include breakfast, lunch, and dinner, with menus managed by the student mess committee and vendors. Veg, Non-veg and Jain options are prepared separately. Starting from base fare of INR 60000 annually.
                </li>
                <li>
                  The mess fee is optional, decision needs to be made at the start of an academic year.
                </li>
                <li>
                  The mess fee is subject to periodic revision in line with vendor requirements as well as inflation.
                </li>
                <li>
                  Students need to pay the mess fee upfront for a year.
                </li>
              </ol>
            </div>

            {/* More Information Section */}
            <div className="pt-4 border-t border-gray-200/70">
              <div className="mb-3">
                <span className="inline-block bg-[#EBF2FE] text-[#1949D8] text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider">
                  More information
                </span>
              </div>

              <ul className="space-y-2.5 pl-1">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1949D8] mt-2 flex-shrink-0" />
                  <span>Security Deposit: ₹25,000 (one-time, refundable).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1949D8] mt-2 flex-shrink-0" />
                  <span>Optional Bus Fee: ₹15,000 per semester (for students opting for transport services).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1949D8] mt-2 flex-shrink-0" />
                  <div>
                    <span>The following payment frequencies will be applicable:</span>
                    <ol className="list-decimal pl-6 mt-2 space-y-1 text-slate-700">
                      <li>OD AI HUB Tuition Fee: Semester-wise (half-yearly).</li>
                      <li>Hostel & Mess Fee: Annual.</li>
                      <li>Optional Bus Fee: Semester-wise (half-yearly).</li>
                    </ol>
                  </div>
                </li>
              </ul>
            </div>

            {/* Refund Policy Section */}
            <div className="pt-4 border-t border-gray-200/70">
              <div className="mb-3">
                <span className="inline-block bg-[#EBF2FE] text-[#1949D8] text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider">
                  Refund Policy
                </span>
              </div>

              <p className="text-slate-700 pl-1">
                Please click{' '}
                <a
                  href="#refund-policy"
                  onClick={(e) => e.preventDefault()}
                  className="text-[#1949D8] font-semibold underline underline-offset-2 hover:text-blue-800 transition-colors"
                >
                  here
                </a>{' '}
                for the Undergraduate Fee Refund Policy for the 2027 Intake.
              </p>
            </div>
          </div>
        </ScrollRevealItem>
      </div>

      </div>
    </section>
  );
}
