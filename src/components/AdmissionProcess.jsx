import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import {
  CheckCircle2,
  FileText,
  GitBranch,
  Users,
  Award,
  Check,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import ScrollTextReveal from './ScrollTextReveal';
import ScrollRevealItem from './ScrollRevealItem';

export default function AdmissionProcess() {
  const [activeStep, setActiveStep] = useState(1);
  const timelineScrollRef = useRef(null);
  const timelineTrackRef = useRef(null);
  const isProgrammaticScrollRef = useRef(false);
  const programmaticTimerRef = useRef(null);
  const scrollRafRef = useRef(null);

  // Dynamic progress line metrics: starts at Stage 1 and terminates at active marker center
  const [lineMetrics, setLineMetrics] = useState({
    start: 0,
    totalWidth: 0,
    activeWidth: 0,
    top: 26,
  });

  // Calculate target scrollLeft for any card so it is centered in the container viewport
  const getCardTargetScroll = (card, container) => {
    const cardLeft = card.offsetLeft;
    const cardWidth = card.offsetWidth;
    const containerWidth = container.offsetWidth;
    const maxScroll = container.scrollWidth - containerWidth;
    const idealScroll = cardLeft - containerWidth / 2 + cardWidth / 2;
    return Math.max(0, Math.min(maxScroll, idealScroll));
  };

  // Programmatic step selection (clicks, nav buttons, hash nav) with smooth centering
  const selectStep = (stepId, shouldScroll = true) => {
    setActiveStep(stepId);

    if (shouldScroll && timelineScrollRef.current) {
      isProgrammaticScrollRef.current = true;
      if (programmaticTimerRef.current) {
        clearTimeout(programmaticTimerRef.current);
      }

      const container = timelineScrollRef.current;
      const activeCard = container.querySelector(`[data-step-card="${stepId}"]`);
      if (activeCard) {
        const targetScroll = getCardTargetScroll(activeCard, container);
        const prefersReducedMotion =
          typeof window !== 'undefined' &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        container.scrollTo({
          left: targetScroll,
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
        });
      }

      programmaticTimerRef.current = setTimeout(() => {
        isProgrammaticScrollRef.current = false;
      }, 650);
    }
  };

  // Sync with URL hash (e.g. #step-3 navigates directly to Step 3)
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#step-3') {
        selectStep(3, true);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Handle manual scroll (trackpad, touch, mouse wheel) with requestAnimationFrame
  const handleScroll = () => {
    if (isProgrammaticScrollRef.current) return;

    if (scrollRafRef.current) {
      cancelAnimationFrame(scrollRafRef.current);
    }

    scrollRafRef.current = requestAnimationFrame(() => {
      const container = timelineScrollRef.current;
      if (!container) return;

      const { scrollLeft, scrollWidth, clientWidth } = container;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll <= 0) return;

      let nextStep = activeStep;

      // 1. Definite boundary checks: scrolled to the end or beginning
      if (scrollLeft >= maxScroll - 35) {
        // Scrolled till the end: blue line and active stage MUST reach Stage 5
        nextStep = 5;
      } else if (scrollLeft <= 35) {
        // Scrolled till the start: Stage 1
        nextStep = 1;
      } else {
        // 2. Proportion-based stage threshold mapping across all 5 stages
        const progress = scrollLeft / maxScroll;
        if (progress < 0.18) {
          nextStep = 1;
        } else if (progress < 0.42) {
          nextStep = 2;
        } else if (progress < 0.68) {
          nextStep = 3;
        } else if (progress < 0.88) {
          nextStep = 4;
        } else {
          nextStep = 5;
        }
      }

      if (nextStep !== activeStep) {
        // Update active step dynamically on manual scroll without triggering programmatic scroll
        setActiveStep(nextStep);
      }
    });
  };

  // Wheel and pointer listener: translates vertical wheel into horizontal timeline scroll
  useEffect(() => {
    const container = timelineScrollRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      // Natural horizontal trackpad gestures (deltaX) scroll natively
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        isProgrammaticScrollRef.current = false;
        return;
      }

      const { scrollLeft, scrollWidth, clientWidth } = container;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll <= 0) return;

      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;

      // Check if container can scroll further horizontally
      const canScrollRight = isScrollingDown && scrollLeft < maxScroll - 2;
      const canScrollLeft = isScrollingUp && scrollLeft > 2;

      if (canScrollRight || canScrollLeft) {
        e.preventDefault();
        isProgrammaticScrollRef.current = false;
        container.scrollLeft += e.deltaY;
      }
    };

    const handlePointerDown = () => {
      isProgrammaticScrollRef.current = false;
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('pointerdown', handlePointerDown, { passive: true });
    container.addEventListener('touchstart', handlePointerDown, { passive: true });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('pointerdown', handlePointerDown);
      container.removeEventListener('touchstart', handlePointerDown);
      if (scrollRafRef.current) {
        cancelAnimationFrame(scrollRafRef.current);
      }
      if (programmaticTimerRef.current) {
        clearTimeout(programmaticTimerRef.current);
      }
    };
  }, [activeStep]);

  const scrollTimeline = (direction) => {
    if (direction === 'left') {
      selectStep(Math.max(1, activeStep - 1), true);
    } else {
      selectStep(Math.min(5, activeStep + 1), true);
    }
  };

  // Calculate dynamic progress line endpoints directly from the stage markers
  const updateLineMetrics = useCallback(() => {
    const track = timelineTrackRef.current;
    if (!track) return;

    const trackRect = track.getBoundingClientRect();
    const firstCard = track.querySelector('[data-step-card="1"]');
    const firstMarker = track.querySelector('[data-step-marker="1"]');
    const lastMarker = track.querySelector('[data-step-marker="5"]');
    const activeMarker = track.querySelector(`[data-step-marker="${activeStep}"]`);

    if (!firstCard || !firstMarker || !lastMarker || !activeMarker) return;

    const firstCardRect = firstCard.getBoundingClientRect();
    const firstMarkerRect = firstMarker.getBoundingClientRect();
    const lastMarkerRect = lastMarker.getBoundingClientRect();
    const activeMarkerRect = activeMarker.getBoundingClientRect();

    // Progress line vertical center matches marker button vertical center
    const top = firstMarkerRect.top - trackRect.top + firstMarkerRect.height / 2;

    // Line starts at the beginning of Stage 1 card
    const start = firstCardRect.left - trackRect.left;

    // Exact horizontal center of active marker and last marker
    const activeMarkerCenter = activeMarkerRect.left - trackRect.left + activeMarkerRect.width / 2;
    const lastMarkerCenter = lastMarkerRect.left - trackRect.left + lastMarkerRect.width / 2;

    const totalWidth = lastMarkerCenter - start;
    let activeWidth = activeMarkerCenter - start;

    if (activeStep === 5) {
      activeWidth = totalWidth;
    }

    setLineMetrics({
      start,
      totalWidth: Math.max(0, totalWidth),
      activeWidth: Math.max(0, activeWidth),
      top,
    });
  }, [activeStep]);

  const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

  useIsomorphicLayoutEffect(() => {
    updateLineMetrics();

    const track = timelineTrackRef.current;
    if (!track) return;

    let resizeObserver;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        updateLineMetrics();
      });
      resizeObserver.observe(track);
    }

    window.addEventListener('resize', updateLineMetrics);
    return () => {
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener('resize', updateLineMetrics);
    };
  }, [updateLineMetrics]);

  const steps = [
    {
      id: 1,
      title: 'Check your Eligibility',
      badge: 'STEP 1',
      icon: CheckCircle2,
      summary: 'Under 20 as of July 1, 2026, with at least 60% in Class XII Mathematics from recognised boards.',
      hashId: 'eligibility',
    },
    {
      id: 2,
      title: 'Submit Your Application Online',
      badge: 'STEP 2',
      icon: FileText,
      summary: 'Fill in your personal details, academic background, video essay, and schedule your test.',
      hashId: 'application',
    },
    {
      id: 3,
      title: 'Advance to Interviews: Two Ways to Qualify',
      badge: 'STEP 3',
      icon: GitBranch,
      summary: 'Qualify through the OD AI HUB NSET entrance exam or Fast Track route via JEE Main / SAT cutoffs.',
      hashId: 'nset-guide',
    },
    {
      id: 4,
      title: 'Appear for Interview',
      badge: 'STEP 4',
      icon: Users,
      summary: '2 rounds: Interactive AI interview with Anshuman Singh followed by a 1-on-1 interview with tech leaders.',
      hashId: 'interviews',
    },
    {
      id: 5,
      title: 'Receive Your Admission Decision',
      badge: 'STEP 5',
      icon: Award,
      summary: 'Within 7–10 days of your interview, you will receive your result and official admission offer.',
      hashId: 'decision',
    },
  ];

  return (
    <section
      id="admission-process"
      className="relative w-full bg-[#F8F9FB] text-slate-800 pt-14 sm:pt-18 lg:pt-20 pb-14 sm:pb-18 lg:pb-20 border-t border-gray-200/70"
    >
      <div className="max-w-[1248px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-2xl space-y-3">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#1949D8] bg-[#EBF2FE] px-3.5 py-1 rounded-full shadow-sm">
              Step-by-Step Guide
            </span>

            <ScrollTextReveal
              as="h2"
              startOffset={0.96}
              yTravel={22}
              className="text-2xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0B1842] tracking-tight block"
            >
              Admission Process
            </ScrollTextReveal>

            <ScrollTextReveal
              as="p"
              startOffset={0.94}
              delay={0.06}
              yTravel={20}
              className="text-sm sm:text-base lg:text-lg text-slate-600 font-medium block leading-relaxed"
            >
              Here's How to Get Started. Scroll through the horizontal timeline below or click any step to explore complete requirements.
            </ScrollTextReveal>
          </div>

          {/* Desktop Left / Right Timeline Scroll Controls */}
          <div className="hidden sm:flex items-center gap-2.5 flex-shrink-0">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
              Scroll Steps
            </span>
            <button
              type="button"
              onClick={() => scrollTimeline('left')}
              disabled={activeStep === 1}
              className={`w-10 h-10 rounded-xl border border-gray-200 bg-white text-slate-700 shadow-sm flex items-center justify-center transition-all ${
                activeStep === 1
                  ? 'opacity-40 cursor-not-allowed'
                  : 'hover:text-[#1949D8] hover:border-blue-300 hover:bg-blue-50/50 active:scale-95 cursor-pointer'
              }`}
              aria-label="Scroll timeline to previous step"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollTimeline('right')}
              disabled={activeStep === 5}
              className={`w-10 h-10 rounded-xl border border-gray-200 bg-white text-slate-700 shadow-sm flex items-center justify-center transition-all ${
                activeStep === 5
                  ? 'opacity-40 cursor-not-allowed'
                  : 'hover:text-[#1949D8] hover:border-blue-300 hover:bg-blue-50/50 active:scale-95 cursor-pointer'
              }`}
              aria-label="Scroll timeline to next step"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ============================================================= */}
        {/* HORIZONTAL TIMELINE WITH INTEGRATED SCROLLING PROGRESS LINE */}
        {/* ============================================================= */}
        <ScrollRevealItem yOffset={36} scaleInitial={0.99} initialOpacity={0.05} startOffset={0.96} endOffset={0.65}>
          {/* Top Status Summary Bar (Fixed above scroll view for quick reference) */}
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-3 px-1">
            <span className="text-[#1949D8] uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#1949D8] animate-pulse" />
              Stage {activeStep} of 5 Active — {steps[activeStep - 1].title}
            </span>
            <span className="text-slate-400 hidden sm:inline">
              {activeStep === 5 ? 'Final Decision' : `Next: ${steps[activeStep].title}`}
            </span>
          </div>

          {/* Unified Horizontal Scrollable Timeline Container (Progress line & cards move together) */}
          <div
            ref={timelineScrollRef}
            onScroll={handleScroll}
            className="w-full overflow-x-auto custom-scrollbar pb-6 pt-2 px-1 snap-x snap-mandatory scroll-smooth"
          >
            <div
              ref={timelineTrackRef}
              className="relative flex items-stretch gap-4 sm:gap-6 min-w-max px-1"
            >
              {/* Continuous Background Track Line (Light Blue) */}
              <div
                className="absolute h-1.5 bg-blue-100/90 rounded-full pointer-events-none z-0"
                style={{
                  top: `${lineMetrics.top}px`,
                  left: `${lineMetrics.start}px`,
                  width: `${lineMetrics.totalWidth}px`,
                  transform: 'translateY(-50%)',
                }}
              />

              {/* Continuous Active Progress Fill Line (Royal Blue with glow, exactly terminates at active marker center) */}
              <div
                className="absolute h-1.5 bg-[#1949D8] rounded-full shadow-[0_0_8px_rgba(25,73,216,0.5)] transition-[width] duration-500 ease-out pointer-events-none z-0"
                style={{
                  top: `${lineMetrics.top}px`,
                  left: `${lineMetrics.start}px`,
                  width: `${lineMetrics.activeWidth}px`,
                  transform: 'translateY(-50%)',
                }}
              />

              {steps.map((step, index) => {
                const IconComp = step.icon;
                const isActive = activeStep === step.id;
                const isPast = activeStep > step.id;

                return (
                  <div
                    key={step.id}
                    data-step-card={step.id}
                    className="w-[290px] sm:w-[340px] lg:w-[360px] flex-shrink-0 snap-start flex flex-col relative z-10 scroll-mt-28"
                  >
                    {/* UPPER PROGRESS INDICATOR & CONNECTING LINE (SCROLLS TOGETHER WITH CARD) */}
                    <div className="relative flex flex-col items-center mb-4 pt-1">
                      <div className="relative flex items-center justify-center w-full">
                        {/* Step Indicator Node Button */}
                        <button
                          type="button"
                          data-step-marker={step.id}
                          onClick={() => selectStep(step.id)}
                          className={`relative z-10 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-300 shadow-sm cursor-pointer ${
                            isActive
                              ? 'bg-[#1949D8] text-white shadow-blue-500/35 ring-4 ring-blue-100 scale-110'
                              : isPast
                              ? 'bg-[#1949D8] text-white hover:scale-105'
                              : 'bg-white text-slate-500 border-2 border-slate-300 hover:border-blue-400 hover:text-[#1949D8]'
                          }`}
                          aria-label={`Jump to Stage ${step.id}: ${step.title}`}
                        >
                          {isPast ? (
                            <Check className="w-5 h-5 text-white stroke-[2.5]" />
                          ) : (
                            <span>{step.id}</span>
                          )}
                        </button>
                      </div>

                      {/* Step Stage Text Indicator */}
                      <span
                        className={`mt-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-colors ${
                          isActive
                            ? 'text-[#1949D8]'
                            : isPast
                            ? 'text-slate-700'
                            : 'text-slate-400'
                        }`}
                      >
                        Stage {step.id}
                      </span>
                    </div>

                    {/* STEP CARD (100% PRESERVED DIMENSIONS & STYLING) */}
                    <div
                      onClick={() => selectStep(step.id)}
                      className={`group relative flex-grow rounded-2xl p-5 sm:p-6 transition-all duration-300 cursor-pointer select-none border flex flex-col justify-between ${
                        isActive
                          ? 'bg-white border-[#1949D8] shadow-xl shadow-blue-500/10 ring-2 ring-[#1949D8]/20 -translate-y-1'
                          : 'bg-white border-gray-200/90 shadow-sm hover:border-blue-300 hover:shadow-md hover:-translate-y-0.5'
                      }`}
                      role="tab"
                      aria-selected={isActive}
                    >
                      <div>
                        {/* Top Row: Original Blue Icon Container & Step Badge */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-white shadow-md transition-all duration-200 ${
                                isActive
                                  ? 'bg-[#1949D8] shadow-blue-500/35 ring-4 ring-blue-100 scale-105'
                                  : isPast
                                  ? 'bg-blue-600'
                                  : 'bg-[#1949D8]'
                              }`}
                            >
                              <IconComp className="w-5 h-5 sm:w-6 sm:h-6" />
                            </div>

                            <span
                              className={`text-[11px] sm:text-xs font-bold px-2.5 py-0.5 rounded tracking-wide transition-colors ${
                                isActive
                                  ? 'bg-[#1949D8] text-white shadow-sm'
                                  : 'bg-[#EBF2FE] text-[#1949D8]'
                              }`}
                            >
                              {step.badge}
                            </span>
                          </div>

                          {isActive && (
                            <span className="text-[10px] font-bold text-[#1949D8] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200 uppercase tracking-wider">
                              Viewing
                            </span>
                          )}
                        </div>

                        {/* Step Heading with Original Font Size & Weight */}
                        <h3
                          className={`text-base sm:text-lg font-bold mb-2 transition-colors line-clamp-2 ${
                            isActive ? 'text-[#1949D8]' : 'text-slate-900 group-hover:text-[#1949D8]'
                          }`}
                        >
                          {step.title}
                        </h3>

                        {/* Summary with Original Typography */}
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal line-clamp-3">
                          {step.summary}
                        </p>
                      </div>

                      {/* Bottom Indicator Line */}
                      <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold">
                        <span className={isActive ? 'text-[#1949D8]' : 'text-slate-400 group-hover:text-slate-600'}>
                          {isActive ? 'Active Stage' : 'Select Stage →'}
                        </span>
                        <div
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            isActive ? 'w-12 bg-[#1949D8]' : 'w-5 bg-gray-200 group-hover:w-8 group-hover:bg-blue-300'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollRevealItem>

      </div>
    </section>
  );
}
