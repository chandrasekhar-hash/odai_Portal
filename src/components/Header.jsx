import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Menu, X, ArrowUpRight } from 'lucide-react';
import logoImg from '../assets/logo.jpg';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  const isClickScrollingRef = useRef(false);
  const clickTimerRef = useRef(null);

  // Nav items corresponding to major page sections
  const navLinks = [
    { id: 'home', name: 'Home', href: '#home', hasDropdown: false },
    { id: 'programs', name: 'Programs', href: '#programs', hasDropdown: true },
    { id: 'admissions-fees', name: 'Admissions & Fees', href: '#admissions-fees', hasDropdown: false },
    { id: 'certification', name: 'Certification', href: '#certification', hasDropdown: false },
    { id: 'campus-life', name: 'Campus Life', href: '#campus-life', hasDropdown: false },
    { id: 'faqs', name: 'FAQs', href: '#faqs', hasDropdown: false },
  ];

  // Track global page scroll progress for the top reading indicator line
  useEffect(() => {
    let rafId = null;
    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
          const progress = (window.scrollY / totalHeight) * 100;
          setScrollProgress(Math.min(100, Math.max(0, progress)));
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close drawer on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Dynamic active section detection across both scrolling directions
  useEffect(() => {
    let rafId = null;

    const computeActiveSection = () => {
      if (isClickScrollingRef.current) return;

      const scrollY = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // 1. At or near top of the page: always activate 'home'
      if (scrollY < 180) {
        setActiveSection('home');
        return;
      }

      // 2. Near bottom of page: always activate 'faqs' (final section)
      if (windowHeight + scrollY >= docHeight - 90) {
        setActiveSection('faqs');
        return;
      }

      // 3. Focal reading line in viewport (220px below viewport top, beneath the sticky navbar)
      const focalY = 220;

      // Sections in visual order on the page
      const sectionDefinitions = [
        { id: 'faqs', elementIds: ['faqs'] },
        { id: 'campus-life', elementIds: ['campus-life'] },
        { id: 'certification', elementIds: ['certification'] },
        { 
          id: 'admissions-fees', 
          elementIds: ['admissions-fees', 'benefits-early', 'fee-structure', 'important-dates', 'nset-guide', 'admission-process', 'examination-modes'] 
        },
        { id: 'programs', elementIds: ['programs'] },
        { id: 'home', elementIds: ['home'] },
      ];

      for (const section of sectionDefinitions) {
        for (const elId of section.elementIds) {
          const el = document.getElementById(elId);
          if (el) {
            const rect = el.getBoundingClientRect();
            // If the element crosses the focal reading line
            if (rect.top <= focalY && rect.bottom > focalY) {
              setActiveSection(section.id);
              return;
            }
          }
        }
      }
    };

    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(computeActiveSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // Handle initial hash routing
    if (window.location.hash) {
      const hash = window.location.hash.replace('#', '');
      if (['admission-process', 'important-dates', 'fee-structure', 'nset-guide', 'admissions-fees'].includes(hash)) {
        setActiveSection('admissions-fees');
      } else if (navLinks.some((l) => l.id === hash)) {
        setActiveSection(hash);
      } else {
        computeActiveSection();
      }
    } else {
      computeActiveSection();
    }

    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['admission-process', 'important-dates', 'fee-structure', 'nset-guide', 'admissions-fees'].includes(hash)) {
        setActiveSection('admissions-fees');
      } else if (navLinks.some((l) => l.id === hash)) {
        setActiveSection(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Smooth click navigation with sticky-header offset
  const handleNavClick = (e, link) => {
    e.preventDefault();
    setActiveSection(link.id);
    setMobileMenuOpen(false);

    if (link.id === 'home' || link.href === '#home') {
      isClickScrollingRef.current = true;
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current);

      window.scrollTo({ top: 0, behavior: 'smooth' });

      if (window.history.pushState) {
        window.history.pushState(null, '', '#home');
      }

      clickTimerRef.current = setTimeout(() => {
        isClickScrollingRef.current = false;
      }, 700);
      return;
    }

    const targetElementId = link.id === 'admissions-fees' ? 'admission-process' : link.id;
    const targetEl = document.getElementById(targetElementId) || document.getElementById(link.id);

    if (targetEl) {
      isClickScrollingRef.current = true;
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current);

      // Fixed sticky header height offset (~88px)
      const headerOffset = 88;
      const elementPosition = targetEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      });

      if (window.history.pushState) {
        window.history.pushState(null, '', link.href);
      }

      clickTimerRef.current = setTimeout(() => {
        isClickScrollingRef.current = false;
      }, 700);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
      {/* 1. Thin black strip at the very top + Continuous Scroll Reading Progress */}
      <div className="relative w-full h-[3px] bg-black overflow-hidden">
        <div 
          className="absolute left-0 top-0 bottom-0 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)] transition-all duration-75 ease-out"
          style={{ width: `${scrollProgress}%` }}
          aria-hidden="true"
        />
      </div>

      {/* 2. Light grey/white utility navigation bar */}
      <div className="w-full bg-[#F7F9FB] border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 h-8 flex items-center justify-end">
          <nav className="flex items-center space-x-6 text-[12px] font-medium text-gray-600">
            <a
              href="#our-students"
              className="hover:text-blue-600 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600 rounded px-1"
            >
              Our Students
            </a>
            <a
              href="#events"
              className="hover:text-blue-600 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600 rounded px-1"
            >
              Events
            </a>
            <a
              href="#guide"
              className="hover:text-blue-600 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600 rounded px-1"
            >
              Guide
            </a>
          </nav>
        </div>
      </div>

      {/* 3. Main Navigation */}
      <div className="w-full bg-white border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 h-[74px] sm:h-[78px] lg:h-[82px] flex items-center justify-between">
          
          {/* Left: Official Circular Logo */}
          <div className="flex items-center space-x-6 lg:space-x-8">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, { id: 'home', href: '#home' })}
              className="flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1949D8] focus-visible:ring-offset-2 rounded-full cursor-pointer"
              aria-label="OD AI HUB Home"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-[62px] lg:h-[62px] aspect-square rounded-full overflow-hidden border-2 border-blue-500/25 group-hover:border-[#1949D8] ring-2 ring-blue-50/80 shadow-md transition-all duration-200 flex-shrink-0 bg-white">
                <img
                  src={logoImg}
                  alt="OD AI HUB Logo"
                  className="w-full h-full object-cover object-center rounded-full select-none"
                  width="62"
                  height="62"
                  loading="eager"
                />
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-7 text-[14px] h-full" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;

                if (link.hasDropdown) {
                  return (
                    <div key={link.name} className="relative group h-[82px] flex items-center">
                      <a
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link)}
                        className={`relative h-[82px] flex items-center gap-1 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1949D8] rounded px-1 cursor-pointer ${
                          isActive
                            ? 'text-[#1949D8] font-semibold'
                            : 'text-gray-700 hover:text-[#1949D8] font-medium'
                        }`}
                      >
                        <span>{link.name}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 group-hover:rotate-180 ${isActive ? 'text-[#1949D8]' : 'text-gray-500 group-hover:text-[#1949D8]'}`} />
                        {isActive && (
                          <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#1949D8] rounded-t-sm shadow-[0_0_8px_rgba(25,73,216,0.4)] transition-all duration-200" />
                        )}
                      </a>

                      {/* Dropdown Menu */}
                      <div className="absolute top-[76px] left-0 w-64 bg-white border border-gray-100 rounded-xl shadow-xl py-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50">
                        <a
                          href="#programs"
                          onClick={(e) => handleNavClick(e, link)}
                          className="block px-4 py-2.5 text-xs font-semibold text-slate-800 hover:bg-blue-50 hover:text-[#1949D8] transition-colors"
                        >
                          4-Year B.Tech in AI & CS
                        </a>
                        <a
                          href="#programs"
                          onClick={(e) => handleNavClick(e, link)}
                          className="block px-4 py-2.5 text-xs font-semibold text-slate-800 hover:bg-blue-50 hover:text-[#1949D8] transition-colors"
                        >
                          AI Systems & Cloud Architecture
                        </a>
                        <a
                          href="#programs"
                          onClick={(e) => handleNavClick(e, link)}
                          className="block px-4 py-2.5 text-xs font-semibold text-slate-800 hover:bg-blue-50 hover:text-[#1949D8] transition-colors"
                        >
                          1-Year Full-Time Industry Immersion
                        </a>
                      </div>
                    </div>
                  );
                }

                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link)}
                    className={`relative h-[82px] flex items-center transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1949D8] rounded px-1 cursor-pointer ${
                      isActive
                        ? 'text-[#1949D8] font-semibold'
                        : 'text-gray-700 hover:text-[#1949D8] font-medium'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#1949D8] rounded-t-sm shadow-[0_0_8px_rgba(25,73,216,0.4)] transition-all duration-200" />
                    )}
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Right: Action Buttons (Desktop) */}
          <div className="hidden lg:flex items-center space-x-3.5">
            <button
              type="button"
              className="px-5 py-2 text-sm font-semibold text-[#1949D8] bg-white border border-[#1949D8] rounded-md hover:bg-blue-50/70 hover:shadow-sm active:scale-[0.98] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1949D8]"
            >
              Login
            </button>
            <button
              type="button"
              onClick={(e) => handleNavClick(e, { id: 'admissions-fees', href: '#admissions-fees' })}
              className="px-5 py-2 text-sm font-semibold text-white bg-[#1949D8] hover:bg-[#153ca8] rounded-md hover:shadow-md hover:shadow-blue-500/20 active:scale-[0.98] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1949D8]"
            >
              Apply Now
            </button>
          </div>

          {/* Mobile menu hamburger button */}
          <div className="flex lg:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1949D8]"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Backdrop & Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop overlay */}
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Slide-out Drawer */}
            <aside
              className="fixed top-0 right-0 w-[82vw] max-w-[340px] h-full bg-white shadow-2xl flex flex-col justify-between p-6 overflow-y-auto transform transition-transform duration-300 ease-out"
              aria-label="Mobile Navigation Drawer"
            >
              <div>
                {/* Drawer Header with Logo & Close Button */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
                  <a
                    href="#home"
                    onClick={(e) => handleNavClick(e, { id: 'home', href: '#home' })}
                    className="flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1949D8] rounded-full"
                    aria-label="OD AI HUB Home"
                  >
                    <div className="w-12 h-12 aspect-square rounded-full overflow-hidden border-2 border-blue-500/25 ring-2 ring-blue-50/80 shadow-md flex-shrink-0 bg-white">
                      <img
                        src={logoImg}
                        alt="OD AI HUB Logo"
                        className="w-full h-full object-cover object-center rounded-full select-none"
                        width="48"
                        height="48"
                      />
                    </div>
                    <span className="text-base font-bold text-[#0B1842] tracking-tight">
                      OD AI HUB
                    </span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 active:scale-95 transition-all"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col space-y-1.5 text-[15px]" aria-label="Mobile Navigation Links">
                  {navLinks.map((link) => {
                    const isActive = activeSection === link.id;
                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link)}
                        className={`px-3 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-between cursor-pointer ${
                          isActive
                            ? 'bg-blue-50 text-[#1949D8] font-bold border-l-4 border-[#1949D8]'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-[#1949D8]'
                        }`}
                      >
                        <span>{link.name}</span>
                        {link.hasDropdown && <ChevronDown className="w-4 h-4 text-gray-400" />}
                      </a>
                    );
                  })}
                </nav>
              </div>

              {/* Drawer Footer Actions */}
              <div className="pt-6 border-t border-gray-100 space-y-3">
                <button
                  type="button"
                  className="w-full py-2.5 text-sm font-semibold text-[#1949D8] bg-white border border-[#1949D8] rounded-lg hover:bg-blue-50 active:scale-[0.98] transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </button>
                <button
                  type="button"
                  className="w-full py-2.5 text-sm font-semibold text-white bg-[#1949D8] hover:bg-[#153ca8] rounded-lg shadow-sm active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
                  onClick={(e) => handleNavClick(e, { id: 'admissions-fees', href: '#admissions-fees' })}
                >
                  <span>Apply Now</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </aside>
          </div>
        )}
      </div>
    </header>
  );
}
