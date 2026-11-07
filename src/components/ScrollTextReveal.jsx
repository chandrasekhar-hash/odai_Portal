import React, { useRef, useEffect, useState } from 'react';

/**
 * Premium Scroll-Triggered Text & Heading Reveal
 * - Reveals full headings and complete phrases without awkward word fragmentation or missing text
 * - Smoothly glides up and illuminates when the section enters the viewport
 * - Ensures 100% readability once in view (no text left permanently faded, split or clipped)
 * - Resets smoothly when scrolled completely away so it naturally replays upon returning
 * - Strictly respects prefers-reduced-motion accessibility preferences
 */
export default function ScrollTextReveal({
  children,
  className = '',
  as: Component = 'p',
  startOffset = 0.96, // Triggers reveal when top of element reaches 96% of viewport
  yTravel = 24,       // Smooth upward travel in pixels
  delay = 0,          // Optional sequential delay in seconds
  style = {},
  ...props
}) {
  const containerRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [hasReducedMotion, setHasReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) {
      setHasReducedMotion(true);
      setInView(true);
      return;
    }

    let rafId = null;

    const checkVisibility = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      // Trigger threshold: element top reaches startOffset of viewport height
      const triggerThreshold = windowHeight * startOffset;

      // Element is entering or within the active viewing zone
      if (rect.top <= triggerThreshold && rect.bottom >= 0) {
        setInView(true);
      } else if (rect.top > windowHeight + 40 || rect.bottom < -100) {
        // Reset when scrolled away so it replays smoothly when user returns
        setInView(false);
      }
    };

    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(checkVisibility);
    };

    // Use IntersectionObserver with rootMargin for high performance
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          checkVisibility();
        } else {
          setInView(false);
        }
      },
      {
        rootMargin: '60px 0px 60px 0px',
        threshold: 0.01,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // Initial check on mount
    checkVisibility();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [startOffset]);

  if (hasReducedMotion) {
    return (
      <Component ref={containerRef} className={className} style={style} {...props}>
        {children}
      </Component>
    );
  }

  return (
    <Component
      ref={containerRef}
      className={`break-words ${className}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translate3d(0, 0, 0)' : `translate3d(0, ${yTravel}px, 0)`,
        transition: `opacity 0.52s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.52s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        willChange: 'opacity, transform',
        ...style,
      }}
      {...props}
    >
      {children}
    </Component>
  );
}
