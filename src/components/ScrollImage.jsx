import React, { useRef, useEffect, useState } from 'react';

/**
 * Continuous Scroll-Linked Visual & Image Animator
 * Specifically built for media, illustration placeholders, badges, and QR codes:
 * - Scales smoothly from 0.94 to 1.0 based on scroll position
 * - Continuous progressive opacity from 0.3 to 1.0
 * - Subtle vertical parallax movement while traveling across the viewport (-10px to +10px)
 * - Smooth entrance when scrolling down, natural reverse when scrolling up
 * - Respects prefers-reduced-motion
 */
export default function ScrollImage({
  children,
  className = '',
  scaleFrom = 0.94,
  opacityFrom = 0.35,
  parallaxDistance = 16, // Total vertical parallax travel in pixels
  startOffset = 0.96,
  endOffset = 0.45,
  style = {},
  ...props
}) {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setProgress(1);
      return;
    }

    let rafId = null;
    let isIntersecting = false;

    const calculateProgress = () => {
      if (!containerRef.current || !isIntersecting) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const startY = windowHeight * startOffset;
      const endY = windowHeight * endOffset;
      const totalDistance = startY - endY;

      if (totalDistance <= 0) {
        setProgress(1);
        return;
      }

      const currentDistance = startY - rect.top;
      const rawProgress = currentDistance / totalDistance;
      const clampedProgress = Math.max(0, Math.min(1, rawProgress));

      setProgress(clampedProgress);
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
      { rootMargin: '100px 0px 100px 0px', threshold: 0 }
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
  }, [startOffset, endOffset]);

  const currentScale = scaleFrom + (1 - scaleFrom) * progress;
  const currentOpacity = opacityFrom + (1 - opacityFrom) * progress;
  // Parallax offset: moves upwards slightly as scroll progresses
  const currentParallax = (0.5 - progress) * parallaxDistance;

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden will-change-transform ${className}`}
      style={{
        opacity: currentOpacity.toFixed(3),
        transform: `translate3d(0, ${currentParallax.toFixed(1)}px, 0) scale3d(${currentScale.toFixed(3)}, ${currentScale.toFixed(3)}, 1)`,
        transition: 'opacity 0.08s linear, transform 0.08s linear',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

