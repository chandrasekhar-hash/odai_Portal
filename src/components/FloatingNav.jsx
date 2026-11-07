import React, { useState, useEffect } from 'react';

export default function FloatingNav() {
  const [activeItem, setActiveItem] = useState('admission-process');

  const navItems = [
    { id: 'admission-process', label: 'Admission Process', hasBadge: false },
    { id: 'nset-guide', label: 'NSET Guide', hasBadge: true, badgeText: 'New' },
    { id: 'important-dates', label: 'Important Dates', hasBadge: false },
    { id: 'fee-structure', label: 'Fee Structure', hasBadge: false },
  ];

  useEffect(() => {
    // Observe sections that currently exist on the page to automatically update active state
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -40% 0px',
      threshold: 0.1,
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.id === 'examination-modes') {
            setActiveItem('admission-process');
          } else {
            setActiveItem(entry.target.id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    const sectionIds = ['examination-modes', 'admission-process', 'nset-guide', 'important-dates', 'fee-structure'];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id) => {
    setActiveItem(id);
    if (id === 'nset-guide') {
      window.location.hash = '#nset-guide';
    }
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside 
      aria-label="Floating section navigation"
      className="fixed bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[94vw] sm:max-w-max pb-[env(safe-area-inset-bottom,0px)]"
    >
      <nav 
        aria-label="Section Quick Links"
        className="flex items-center gap-1 sm:gap-2 bg-white/95 backdrop-blur-md px-2 sm:px-2.5 py-1.5 sm:py-2 rounded-full border border-gray-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.14)] overflow-x-auto no-scrollbar touch-pan-x"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
      >
        {navItems.map((item) => {
          const isActive = activeItem === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item.id)}
              className={`relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1842] ${
                isActive
                  ? 'bg-[#0B1842] text-white shadow-sm scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <span>{item.label}</span>
              {item.hasBadge && (
                <span
                  className="text-[9px] sm:text-[10px] font-bold px-1.5 py-0.2 rounded-full uppercase leading-tight bg-red-500 text-white shadow-sm"
                >
                  {item.badgeText}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
