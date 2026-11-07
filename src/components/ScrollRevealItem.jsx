import React, { useRef, useEffect, useState } from 'react';

/**
 * Continuous Scroll-Position-Linked Reveal Container
 * Controls opacity, vertical elevation, and scale directly tied to scroll progress.
 * Reverses completely naturally when scrolling upwards.
 * Supports stagger index for grids, custom offsets, and subtle continuous parallax.
 */
export default function ScrollRevealItem({
  children,
  className = '',
  as: Component = 'div',
  staggerIndex = 0,
  staggerDelay = 0.06,
  yOffset = 36,          // Initial vertical translation (pixels) for distinct upward travel
  scaleInitial = 0.98,    // Subtle initial scale
  initialOpacity = 0.0,   // Starting opacity when entering reveal zone
  startOffset = 0.96,    // Trigger starts when top enters 96% of viewport
  endOffset = 0.60,      // Fully settled when top reaches 60% of viewport
  parallaxSpeed = 0,     // Subtle continuous parallax travel while in view
  style = {},
  ...props
}) {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setProgress(1);
      return;
    }

    let rafId = null;
    let isIntersecting = false;

    // Apply stagger shift to the reveal thresholds
    const effectiveStart = Math.min(0.98, startOffset + staggerIndex * staggerDelay * 0.5);
    const effectiveEnd = Math.max(0.15, endOffset - staggerIndex * staggerDelay);

    const calculateProgress = () => {
      if (!containerRef.current || !isIntersecting) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const startY = windowHeight * effectiveStart;
      const endY = windowHeight * effectiveEnd;
      const totalDistance = startY - endY;

      if (totalDistance <= 0) {
        setProgress(1);
        return;
      }

      const currentDistance = startY - rect.top;
      let rawProgress = currentDistance / totalDistance;
      const clampedProgress = Math.max(0, Math.min(1, rawProgress));

      setProgress(clampedProgress);
      setInView(rect.top < windowHeight && rect.bottom > 0);
    };

    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(calculateProgress);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          calculateProgress();
        }
      },
      { rootMargin: '120px 0px 120px 0px', threshold: 0 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    calculateProgress();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [staggerIndex, staggerDelay, startOffset, endOffset]);

  // Derived animated styles
  const currentOpacity = initialOpacity + (1 - initialOpacity) * progress;
  const currentTranslateY = (1 - progress) * yOffset;
  const currentScale = scaleInitial + (1 - scaleInitial) * progress;
  
  // Optional subtle parallax delta when element is in view
  const parallaxOffset = parallaxSpeed !== 0 ? (progress - 0.5) * parallaxSpeed : 0;

  return (
    <Component
      ref={containerRef}
      className={`will-change-transform ${className}`}
      style={{
        opacity: currentOpacity.toFixed(3),
        transform: `translate3d(0, ${(currentTranslateY + parallaxOffset).toFixed(1)}px, 0) scale3d(${currentScale.toFixed(3)}, ${currentScale.toFixed(3)}, 1)`,
        transition: 'opacity 0.32s cubic-bezier(0.16, 1, 0.3, 1), transform 0.38s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'opacity, transform',
        ...style,
      }}
      {...props}
    >
      {children}
    </Component>
  );
}

