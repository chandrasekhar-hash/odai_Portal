import React, { useState } from 'react';
import TiltCard from './TiltCard';
import ScrollTextReveal from './ScrollTextReveal';
import ScrollRevealItem from './ScrollRevealItem';
import ScrollImage from './ScrollImage';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Financing() {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1 });
  const [selectedBank, setSelectedBank] = useState('AXIS BANK');

  const banks = [
    {
      id: 'AXIS BANK',
      name: 'AXIS BANK',
      logoLabel: 'Axis Bank Logo Placeholder',
      details: {
        loanTypeHeader: { secured: 'Secured', unsecured: 'Unsecured' },
        rows: [
          {
            label: 'Interest rate (%)',
            secured: 'Starting from 11.5%',
            unsecured: 'Starting from 12.5%',
            merged: false,
          },
          {
            label: 'Max Loan Amount',
            value: 'Upto 95% of total fees (as per eligibility)',
            merged: true,
          },
          {
            label: 'Margin (College Fee portion to be borne by the applicant)',
            value: '5%',
            merged: true,
          },
          {
            label: 'Tenure',
            value: 'Up to 15 years',
            merged: true,
          },
          {
            label: 'Processing Charges',
            value: 'As Applicable',
            merged: true,
          },
          {
            label: 'Tax benefits under section 80E',
            value: 'Available',
            merged: true,
          },
        ],
      },
    },
    {
      id: 'ICICI BANK',
      name: 'ICICI BANK',
      logoLabel: 'ICICI Bank Logo Placeholder',
      details: {
        loanTypeHeader: { secured: 'Secured', unsecured: 'Unsecured' },
        rows: [
          {
            label: 'Interest rate (%)',
            secured: 'Starting from 11.25%',
            unsecured: 'Starting from 12.0%',
            merged: false,
          },
          {
            label: 'Max Loan Amount',
            value: 'Upto 100% of total fees (as per eligibility)',
            merged: true,
          },
          {
            label: 'Margin (College Fee portion to be borne by the applicant)',
            value: 'Nil to 5%',
            merged: true,
          },
          {
            label: 'Tenure',
            value: 'Up to 15 years',
            merged: true,
          },
          {
            label: 'Processing Charges',
            value: 'As Applicable',
            merged: true,
          },
          {
            label: 'Tax benefits under section 80E',
            value: 'Available',
            merged: true,
          },
        ],
      },
    },
    {
      id: 'IDFC FIRST BANK',
      name: 'IDFC FIRST BANK',
      logoLabel: 'IDFC First Bank Logo Placeholder',
      details: {
        loanTypeHeader: { secured: 'Secured', unsecured: 'Unsecured' },
        rows: [
          {
            label: 'Interest rate (%)',
            secured: 'Starting from 10.75%',
            unsecured: 'Starting from 11.75%',
            merged: false,
          },
          {
            label: 'Max Loan Amount',
            value: 'Up to 100% coverage based on credit evaluation',
            merged: true,
          },
          {
            label: 'Margin (College Fee portion to be borne by the applicant)',
            value: 'Zero Margin options available',
            merged: true,
          },
          {
            label: 'Tenure',
            value: 'Up to 12 years',
            merged: true,
          },
          {
            label: 'Processing Charges',
            value: 'As Applicable',
            merged: true,
          },
          {
            label: 'Tax benefits under section 80E',
            value: 'Available',
            merged: true,
          },
        ],
      },
    },
    {
      id: 'RBL BANK',
      name: 'RBL BANK',
      logoLabel: 'RBL Bank Logo Placeholder',
      details: {
        loanTypeHeader: { secured: 'Secured', unsecured: 'Unsecured' },
        rows: [
          {
            label: 'Interest rate (%)',
            secured: 'Competitive Rates (Secured)',
            unsecured: 'Competitive Rates (Unsecured)',
            merged: false,
          },
          {
            label: 'Max Loan Amount',
            value: 'Upto ₹40 Lakhs (subject to eligibility)',
            merged: true,
          },
          {
            label: 'Margin (College Fee portion to be borne by the applicant)',
            value: '5%',
            merged: true,
          },
          {
            label: 'Tenure',
            value: 'Up to 10 years',
            merged: true,
          },
          {
            label: 'Processing Charges',
            value: 'As Applicable',
            merged: true,
          },
          {
            label: 'Tax benefits under section 80E',
            value: 'Available',
            merged: true,
          },
        ],
      },
    },
    {
      id: 'PROPELLD',
      name: 'PROPELLD',
      logoLabel: 'Propelld Logo Placeholder',
      details: {
        loanTypeHeader: { secured: 'Standard Plan', unsecured: 'Income-Linked' },
        rows: [
          {
            label: 'Interest rate (%)',
            secured: 'Custom Education Financing',
            unsecured: 'Flexible EMI Plans',
            merged: false,
          },
          {
            label: 'Max Loan Amount',
            value: '100% Course Fee coverage available',
            merged: true,
          },
          {
            label: 'Margin (College Fee portion to be borne by the applicant)',
            value: 'Nil',
            merged: true,
          },
          {
            label: 'Tenure',
            value: 'Flexible tenures up to 10 years',
            merged: true,
          },
          {
            label: 'Processing Charges',
            value: 'Minimal processing fee as applicable',
            merged: true,
          },
          {
            label: 'Tax benefits under section 80E',
            value: 'As Applicable',
            merged: true,
          },
        ],
      },
    },
    {
      id: 'KARNATAKA BANK',
      name: 'KARNATAKA BANK',
      logoLabel: 'Karnataka Bank Logo Placeholder',
      details: {
        loanTypeHeader: { secured: 'Secured', unsecured: 'Unsecured' },
        rows: [
          {
            label: 'Interest rate (%)',
            secured: 'Starting from 11.0%',
            unsecured: 'Starting from 12.0%',
            merged: false,
          },
          {
            label: 'Max Loan Amount',
            value: 'Upto 90% of total fees (as per eligibility)',
            merged: true,
          },
          {
            label: 'Margin (College Fee portion to be borne by the applicant)',
            value: '5% to 10%',
            merged: true,
          },
          {
            label: 'Tenure',
            value: 'Up to 15 years',
            merged: true,
          },
          {
            label: 'Processing Charges',
            value: 'As Applicable',
            merged: true,
          },
          {
            label: 'Tax benefits under section 80E',
            value: 'Available',
            merged: true,
          },
        ],
      },
    },
  ];

  const currentBank = banks.find((b) => b.id === selectedBank) || banks[0];

  return (
    <section
      ref={sectionRef}
      id="financing"
      className="relative w-full bg-white text-slate-800 py-14 sm:py-20 lg:py-24 border-t border-gray-100"
    >
      <div className={`max-w-[1248px] mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}>
        
        {/* Section Header with Continuous Scroll-Based Reveal */}
        <div className="mb-8 sm:mb-12">
          <ScrollTextReveal
            as="h2"
            startOffset={0.92}
            endOffset={0.65}
            className="text-2xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0B1842] tracking-tight leading-tight block"
          >
            Financing
          </ScrollTextReveal>
          <ScrollTextReveal
            as="p"
            startOffset={0.88}
            endOffset={0.55}
            className="mt-3 text-sm sm:text-lg text-slate-600 leading-relaxed max-w-4xl font-normal block"
          >
            We offer easy financing options for the programme fees with our banking partners. If student loan assistance is desired, our counselling team can connect you with financial service providers.
          </ScrollTextReveal>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start">
          
          {/* Left Column – Bank Selector with Continuous Entrance */}
          <ScrollRevealItem
            yOffset={24}
            scaleInitial={0.97}
            initialOpacity={0.35}
            startOffset={0.94}
            endOffset={0.65}
            className="lg:col-span-4 space-y-2.5 sm:space-y-3"
          >
            {banks.map((bank, index) => {
              const isSelected = bank.id === selectedBank;
              return (
                <button
                  key={bank.id}
                  type="button"
                  onClick={() => setSelectedBank(bank.id)}
                  className={`w-full py-3 sm:py-3.5 px-4 sm:px-5 rounded-lg text-xs sm:text-base font-bold tracking-wide transition-all duration-150 flex items-center justify-between text-left shadow-sm active:scale-[0.98] ${
                    isSelected
                      ? 'bg-[#1949D8] text-white border border-[#1949D8] shadow-md shadow-blue-500/20'
                      : 'bg-white text-[#1949D8] border border-[#1949D8] hover:bg-blue-50/70'
                  }`}
                >
                  <span>{bank.name}</span>
                  <span className={`text-xs transition-transform ${isSelected ? 'text-blue-100 translate-x-0.5' : 'text-blue-400'}`}>
                    →
                  </span>
                </button>
              );
            })}
          </ScrollRevealItem>

          {/* Right Column – Bank Details Panel with 3D Tilt */}
          <div className="lg:col-span-8">
            <TiltCard maxTilt={5} scale={1.01} lightColor="rgba(25, 73, 216, 0.08)" preserve3d={true}>
              <div className="bg-white rounded-2xl border border-gray-200/90 p-5 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-300">
                {/* Top Bar with Bank Logo Placeholder */}
                <div className="flex items-center justify-between pb-4 sm:pb-5 mb-4 sm:mb-5 border-b border-gray-100">
                  <div>
                    <span className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block mb-0.5 sm:mb-1">
                      Selected Financial Partner
                    </span>
                    <h3 className="text-lg sm:text-2xl font-extrabold text-[#0B1842]">
                      {currentBank.name}
                    </h3>
                  </div>

                  {/* EMPTY LOGO PLACEHOLDER with Scroll Scale & Parallax */}
                  <ScrollImage
                    scaleFrom={0.94}
                    opacityFrom={0.4}
                    parallaxDistance={8}
                    className="rounded-md"
                  >
                    <div
                      className="w-28 sm:w-32 h-9 sm:h-10 border border-dashed border-gray-300 rounded-md bg-gray-50 flex items-center justify-center text-[10px] sm:text-[11px] text-gray-400 font-medium"
                      title={currentBank.logoLabel}
                      aria-label={currentBank.logoLabel}
                    >
                      {/* EMPTY PLACEHOLDER: Insert Bank Logo Here */}
                    </div>
                  </ScrollImage>
                </div>

                {/* Loan Information Table with Continuous Scroll Entrance */}
                <ScrollRevealItem
                  yOffset={18}
                  scaleInitial={0.98}
                  initialOpacity={0.4}
                  startOffset={0.94}
                  endOffset={0.65}
                  className="w-full"
                >
                  <div className="w-full overflow-hidden rounded-xl border border-blue-200/90">
                    <div className="overflow-x-auto custom-scrollbar">
                      <table className="w-full min-w-[500px] sm:min-w-[560px] border-collapse text-left">
                        <thead>
                          <tr className="bg-[#EAF1FD] text-[#0B1842] divide-x divide-blue-200 border-b border-blue-200">
                            <th scope="col" className="px-3.5 sm:px-5 py-3 sm:py-3.5 text-xs sm:text-sm font-bold tracking-wide w-[40%]">
                              Loan Type
                            </th>
                            <th scope="col" className="px-3 sm:px-4 py-3 sm:py-3.5 text-xs sm:text-sm font-bold tracking-wide text-center w-[30%]">
                              {currentBank.details.loanTypeHeader.secured}
                            </th>
                            <th scope="col" className="px-3 sm:px-4 py-3 sm:py-3.5 text-xs sm:text-sm font-bold tracking-wide text-center w-[30%]">
                              {currentBank.details.loanTypeHeader.unsecured}
                            </th>
                          </tr>
                        </thead>

                        <tbody className="divide-y divide-blue-100 text-xs sm:text-sm text-slate-800">
                          {currentBank.details.rows.map((row, idx) => (
                            <tr
                              key={idx}
                              className="divide-x divide-blue-100 hover:bg-blue-50/20 transition-colors"
                            >
                              <td className="bg-[#F8FAFC] px-3.5 sm:px-5 py-3 sm:py-3.5 font-semibold text-[#0B1842]">
                                {row.label}
                              </td>
                              {row.merged ? (
                                <td
                                  colSpan={2}
                                  className="bg-white px-3 sm:px-4 py-3 sm:py-3.5 text-center font-medium text-slate-700"
                                >
                                  {row.value}
                                </td>
                              ) : (
                                <>
                                  <td className="bg-white px-3 sm:px-4 py-3 sm:py-3.5 text-center font-medium text-slate-700">
                                    {row.secured}
                                  </td>
                                  <td className="bg-white px-3 sm:px-4 py-3 sm:py-3.5 text-center font-medium text-slate-700">
                                    {row.unsecured}
                                  </td>
                                </>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </ScrollRevealItem>

                {/* Advisory Assistance Note with Continuous Scroll Entrance */}
                <ScrollRevealItem
                  yOffset={14}
                  scaleInitial={0.99}
                  initialOpacity={0.5}
                  startOffset={0.92}
                  endOffset={0.68}
                  className="mt-4 sm:mt-5"
                >
                  <div className="p-3.5 rounded-lg bg-blue-50/50 border border-blue-100/80 text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                    <span className="font-semibold text-[#0B1842]">Loan Support:</span> Our dedicated admissions counselling team assists candidates throughout the documentation and verification process with our banking partners.
                  </div>
                </ScrollRevealItem>
              </div>
            </TiltCard>
          </div>

        </div>

      </div>
    </section>
  );
}
