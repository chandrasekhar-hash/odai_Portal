import React, { useState } from 'react';
import {
  FileText,
  Download,
  Eye,
  Clock,
  BookOpen,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Maximize2,
  Minimize2,
  X,
  FileCheck,
  UserCheck,
} from 'lucide-react';
import ScrollTextReveal from './ScrollTextReveal';
import ScrollRevealItem from './ScrollRevealItem';
import TiltCard from './TiltCard';

/**
 * FUTURE PDF INTEGRATION CONFIG:
 * To enable the real PDF guide in the future:
 * 1. Place the PDF in public/ or assets (e.g. '/NSET-2027-Preparation-Guide.pdf')
 * 2. Set 'url' below to that file path (e.g. url: '/NSET-2027-Preparation-Guide.pdf')
 * The preview modal, download handler, file size, and active buttons will automatically activate.
 */
const GUIDE_CONFIG = {
  url: null, // Set to PDF path once uploaded (e.g. '/nset-guide-2027.pdf')
  fileName: 'NSET-2027-Preparation-Guide.pdf',
  fileSize: '3.8 MB',
  version: '2027 Edition',
};

export default function NsetGuide({ customPdfUrl = null }) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Active PDF URL is either passed via prop or defined in config
  const activePdfUrl = customPdfUrl || GUIDE_CONFIG.url;
  const isPdfAvailable = Boolean(activePdfUrl);

  return (
    <section
      id="nset-guide"
      className="relative w-full bg-[#F8FAFC] text-slate-800 py-14 sm:py-18 lg:py-20 border-t border-gray-200/80 scroll-mt-24"
    >
      <div className="max-w-[1248px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-8 sm:mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#1949D8] bg-[#EBF2FE] px-3.5 py-1 rounded-full shadow-sm">
              Official Resource
            </span>
          </div>

          <ScrollTextReveal
            as="h2"
            startOffset={0.96}
            yTravel={22}
            className="text-2xl sm:text-4xl lg:text-[40px] font-extrabold text-[#0B1842] tracking-tight block mb-2.5"
          >
            NSET 2027 – Complete Guide
          </ScrollTextReveal>

          <ScrollTextReveal
            as="p"
            startOffset={0.94}
            delay={0.06}
            yTravel={20}
            className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-3xl font-medium block leading-relaxed"
          >
            Everything you need to prepare for the National Selection Entrance Test.
          </ScrollTextReveal>
        </div>

        {/* 2-Column Responsive Layout: Left = Guide Contents, Right = PDF Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Left Column (7 cols): The 4 Guide Content Cards */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Card 1: Exam Syllabus */}
              <ScrollRevealItem
                staggerIndex={0}
                staggerDelay={0.05}
                yOffset={20}
                scaleInitial={0.99}
                initialOpacity={0.2}
                startOffset={0.96}
                endOffset={0.75}
                className="h-full"
              >
                <div className="bg-white border border-gray-200/90 rounded-xl p-5 h-full flex flex-col justify-between shadow-xs hover:border-blue-300 hover:shadow-sm transition-all group">
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#1949D8] border border-blue-100 flex items-center justify-center mb-3 group-hover:bg-[#1949D8] group-hover:text-white transition-colors">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-[#0B1842] mb-2 leading-snug group-hover:text-[#1949D8] transition-colors">
                      Exam Syllabus
                    </h3>
                    <div className="flex flex-wrap gap-1.5 mb-2.5">
                      <span className="px-2 py-0.5 rounded-md bg-blue-50 text-[#1949D8] text-[11px] font-bold border border-blue-100">
                        Advanced Mathematics
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200">
                        Physics
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200">
                        Chemistry
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal mb-2">
                      Based on Class 11 and Class 12 curriculum.
                    </p>
                  </div>
                  <div className="pt-2.5 border-t border-gray-100">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#1949D8] bg-[#EBF2FE] px-2.5 py-1 rounded-md">
                      <Sparkles className="w-3 h-3 text-[#1949D8]" />
                      GAPSA Applied Problem-Solving
                    </span>
                  </div>
                </div>
              </ScrollRevealItem>

              {/* Card 2: Exam Pattern */}
              <ScrollRevealItem
                staggerIndex={1}
                staggerDelay={0.05}
                yOffset={20}
                scaleInitial={0.99}
                initialOpacity={0.2}
                startOffset={0.96}
                endOffset={0.75}
                className="h-full"
              >
                <div className="bg-white border border-gray-200/90 rounded-xl p-5 h-full flex flex-col justify-between shadow-xs hover:border-blue-300 hover:shadow-sm transition-all group">
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#1949D8] border border-blue-100 flex items-center justify-center mb-3 group-hover:bg-[#1949D8] group-hover:text-white transition-colors">
                      <FileCheck className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-[#0B1842] mb-2 leading-snug group-hover:text-[#1949D8] transition-colors">
                      Exam Pattern
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal mb-3">
                      The examination consists of MCQs (Multiple Choice Questions) and GAPSA (Group-Based Applied Problem-Solving Assessment).
                    </p>
                  </div>
                  <div className="pt-2.5 border-t border-gray-100 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-slate-100 text-[#0B1842] text-[11px] font-bold border border-slate-200">
                      Section 1: MCQs
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-blue-50 text-[#1949D8] text-[11px] font-bold border border-blue-200">
                      Section 2: GAPSA
                    </span>
                  </div>
                </div>
              </ScrollRevealItem>

              {/* Card 3: Test Duration (Visually Clear 90 + 90 min split) */}
              <ScrollRevealItem
                staggerIndex={2}
                staggerDelay={0.05}
                yOffset={20}
                scaleInitial={0.99}
                initialOpacity={0.2}
                startOffset={0.96}
                endOffset={0.75}
                className="h-full"
              >
                <div className="bg-white border border-gray-200/90 rounded-xl p-5 h-full flex flex-col justify-between shadow-xs hover:border-blue-300 hover:shadow-sm transition-all group">
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#1949D8] border border-blue-100 flex items-center justify-center mb-3 group-hover:bg-[#1949D8] group-hover:text-white transition-colors">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm sm:text-base font-bold text-[#0B1842] leading-snug group-hover:text-[#1949D8] transition-colors">
                        Test Duration
                      </h3>
                      <span className="text-[11px] font-extrabold text-[#1949D8] bg-[#EBF2FE] px-2 py-0.5 rounded-full border border-blue-200">
                        180 Mins Total
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal mb-3">
                      Total Duration: 180 minutes, structured into two equal assessment halves:
                    </p>
                  </div>

                  {/* 90 + 90 minute visual split */}
                  <div className="pt-2.5 border-t border-gray-100">
                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div className="bg-slate-50 border border-slate-200/90 rounded-lg p-2">
                        <span className="block text-xs font-extrabold text-[#0B1842]">90 Mins</span>
                        <span className="block text-[10px] text-slate-500 font-medium">MCQ Exam</span>
                      </div>
                      <div className="bg-blue-50/80 border border-blue-200 rounded-lg p-2">
                        <span className="block text-xs font-extrabold text-[#1949D8]">90 Mins</span>
                        <span className="block text-[10px] text-[#1949D8] font-medium">GAPSA</span>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollRevealItem>

              {/* Card 4: Personal Interview (3 Highlighted Areas) */}
              <ScrollRevealItem
                staggerIndex={3}
                staggerDelay={0.05}
                yOffset={20}
                scaleInitial={0.99}
                initialOpacity={0.2}
                startOffset={0.96}
                endOffset={0.75}
                className="h-full"
              >
                <div className="bg-white border border-gray-200/90 rounded-xl p-5 h-full flex flex-col justify-between shadow-xs hover:border-blue-300 hover:shadow-sm transition-all group">
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#1949D8] border border-blue-100 flex items-center justify-center mb-3 group-hover:bg-[#1949D8] group-hover:text-white transition-colors">
                      <UserCheck className="w-5 h-5" />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm sm:text-base font-bold text-[#0B1842] leading-snug group-hover:text-[#1949D8] transition-colors">
                        Personal Interview
                      </h3>
                      <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                        20 Mins
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal mb-3">
                      20-minute one-to-one offline interview covering GAPSA, mathematical reasoning, and motivation for pursuing the program.
                    </p>
                  </div>

                  {/* Highlighted 3 discussion areas */}
                  <div className="pt-2.5 border-t border-gray-100 space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Discussion Areas
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-[#1949D8] text-[10.5px] font-semibold border border-blue-100">
                        GAPSA
                      </span>
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-[#1949D8] text-[10.5px] font-semibold border border-blue-100">
                        Mathematical Reasoning
                      </span>
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-[#1949D8] text-[10.5px] font-semibold border border-blue-100">
                        Motivation for Program
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollRevealItem>

            </div>

            {/* Quick Summary Note */}
            <ScrollRevealItem
              yOffset={18}
              scaleInitial={0.99}
              initialOpacity={0.3}
              startOffset={0.96}
              endOffset={0.75}
            >
              <div className="bg-white border border-blue-200/80 rounded-xl p-4 flex items-start gap-3 shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-[#1949D8] mt-0.5 flex-shrink-0" />
                <p className="text-xs text-slate-700 leading-relaxed">
                  <strong className="font-semibold text-[#0B1842]">Admissions Tip:</strong> Reviewing the Class 11–12 Mathematics and Science foundations along with collaborative group problem-solving practice will prepare you thoroughly for NSET 2027.
                </p>
              </div>
            </ScrollRevealItem>
          </div>

          {/* Right Column (5 cols): Polished PDF Preview Card */}
          <div className="lg:col-span-5">
            <ScrollRevealItem
              yOffset={24}
              scaleInitial={0.98}
              initialOpacity={0.25}
              startOffset={0.96}
              endOffset={0.7}
            >
              <TiltCard maxTilt={5} scale={1.02}>
                <div className="bg-white border border-gray-200/90 rounded-2xl p-6 shadow-sm hover:border-blue-300 hover:shadow-md transition-all">
                  
                  {/* Top Status & File Metadata */}
                  <div className="flex items-center justify-between gap-3 mb-5 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-red-50 text-red-600 border border-red-200 flex items-center justify-center font-extrabold text-xs shadow-xs">
                        PDF
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-[#0B1842] leading-tight truncate max-w-[190px] sm:max-w-[220px]">
                          {GUIDE_CONFIG.fileName}
                        </h4>
                        <span className="text-[11px] text-slate-400 font-medium">
                          {GUIDE_CONFIG.version} {isPdfAvailable ? `• ${GUIDE_CONFIG.fileSize}` : ''}
                        </span>
                      </div>
                    </div>

                    {/* Status Pill */}
                    {isPdfAvailable ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                        Ready
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10.5px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                        <AlertCircle className="w-3 h-3 text-amber-600" />
                        Pending
                      </span>
                    )}
                  </div>

                  {/* Document Illustration / Notice Area */}
                  <div className="mb-5 rounded-xl border border-dashed border-gray-200 bg-[#F8FAFC] p-5 text-center transition-colors">
                    <div className="w-12 h-12 mx-auto rounded-full bg-blue-50 text-[#1949D8] flex items-center justify-center mb-3">
                      <FileText className="w-6 h-6 stroke-[1.75]" />
                    </div>

                    {isPdfAvailable ? (
                      <div>
                        <p className="text-xs font-bold text-[#0B1842] mb-1">
                          Official PDF Guide Ready
                        </p>
                        <p className="text-[11px] text-slate-500 leading-relaxed max-w-[240px] mx-auto">
                          Click below to preview the guide directly or download a local copy for offline study.
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-xs font-bold text-[#0B1842] mb-1">
                          Guide not uploaded yet
                        </p>
                        <p className="text-[11px] text-slate-500 leading-relaxed max-w-[260px] mx-auto">
                          The official 2027 NSET handbook is currently undergoing final review and will be available for download here shortly.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons: Preview & Download */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* Preview Button */}
                    <button
                      type="button"
                      onClick={() => isPdfAvailable && setIsPreviewOpen(true)}
                      disabled={!isPdfAvailable}
                      className={`w-full py-2.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 border transition-all ${
                        isPdfAvailable
                          ? 'border-[#1949D8] text-[#1949D8] bg-white hover:bg-blue-50 active:scale-95 cursor-pointer shadow-xs'
                          : 'border-gray-200 text-gray-400 bg-gray-50/80 cursor-not-allowed select-none'
                      }`}
                      title={isPdfAvailable ? 'Open Guide Preview' : 'Guide will be previewable once uploaded'}
                    >
                      <Eye className="w-4 h-4" />
                      <span>Preview</span>
                    </button>

                    {/* Download Button */}
                    {isPdfAvailable ? (
                      <a
                        href={activePdfUrl}
                        download={GUIDE_CONFIG.fileName}
                        className="w-full py-2.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 text-white bg-[#1949D8] hover:bg-[#153ca8] active:scale-95 shadow-sm shadow-blue-500/20 transition-all text-center cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </a>
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="w-full py-2.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 text-gray-400 bg-gray-100/90 border border-gray-200 cursor-not-allowed select-none"
                        title="Download will be enabled once the PDF is uploaded"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                    )}
                  </div>

                  {/* Resource Footer Note */}
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Target: NSET 2027 Aspirants</span>
                    <span className="font-medium text-[#1949D8]">Free Resource</span>
                  </div>
                </div>
              </TiltCard>
            </ScrollRevealItem>
          </div>

        </div>

      </div>

      {/* Embedded PDF Viewer Modal (Activated when isPdfAvailable is true and preview clicked) */}
      {isPreviewOpen && isPdfAvailable && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fadeIn">
          <div
            className={`bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
              isFullscreen ? 'w-full h-full rounded-none' : 'w-full max-w-4xl h-[85vh]'
            }`}
          >
            {/* Modal Header */}
            <div className="px-5 py-3.5 bg-[#0B1842] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-bold truncate max-w-xs sm:max-w-md">
                  {GUIDE_CONFIG.fileName}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                  title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <a
                  href={activePdfUrl}
                  download={GUIDE_CONFIG.fileName}
                  className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Download PDF"
                  title="Download PDF"
                >
                  <Download className="w-4 h-4" />
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setIsPreviewOpen(false);
                    setIsFullscreen(false);
                  }}
                  className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close Preview"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body: Embedded PDF Iframe */}
            <div className="flex-grow w-full h-full bg-slate-100">
              <iframe
                src={`${activePdfUrl}#toolbar=1&navpanes=0`}
                title="NSET 2027 Complete Guide PDF"
                className="w-full h-full border-none"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
