import React, { useRef, useState, useEffect } from 'react';

/**
 * Advanced 3D Interactive Tilt Card with:
 * 1. Continuous Scroll Entrance & Elevation (Opacity + TranslateY + Scale linked to scroll)
 * 2. 8°–12° responsive 3D perspective rotation (X & Y axes) on desktop hover
 * 3. Dynamic cursor-following radial spotlight reflection & dynamic drop-shadow
 * 4. Preserves 3D transform-style for child layered depth (translateZ)
 * 5. Reversible on upward scroll
 * 6. Automatically disabled on touch screens and prefers-reduced-motion
 */
export default function TiltCard({
  children,
  className = '',
  maxTilt = 9.5, // 8° to 12° range
  perspective = 900,
  scale = 1.025,
  liftZ = 20,
  lightColor = 'rgba(255, 255, 255, 0.14)',
  darkTheme = false,
  scrollReveal = true,
  staggerIndex = 0,
  staggerDelay = 0.05,
  startOffset = 0.95,
  endOffset = 0.65,
  style = {},
  ...props
}) {
  const cardRef = useRef(null);
  const [hoverTransform, setHoverTransform] = useState('');
  const [shadow, setShadow] = useState('');
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, opacity: 0 });
  const [canTilt, setCanTilt] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(scrollReveal ? 0 : 1);

  useEffect(() => {
    const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setCanTilt(hasHover && !prefersReducedMotion);

    if (prefersReducedMotion || !scrollReveal) {
      setScrollProgress(1);
      return;
    }

    let rafId = null;
    let isIntersecting = false;

    // Shift thresholds by stagger
    const effectiveStart = Math.min(0.98, startOffset + staggerIndex * staggerDelay * 0.5);
    const effectiveEnd = Math.max(0.15, endOffset - staggerIndex * staggerDelay);

    const calculateProgress = () => {
      if (!cardRef.current || !isIntersecting) return;

      const rect = cardRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const startY = windowHeight * effectiveStart;
      const endY = windowHeight * effectiveEnd;
      const totalDistance = startY - endY;

      if (totalDistance <= 0) {
        setScrollProgress(1);
        return;
      }

      const currentDistance = startY - rect.top;
      const rawProgress = currentDistance / totalDistance;
      const clampedProgress = Math.max(0, Math.min(1, rawProgress));

      setScrollProgress(clampedProgress);
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

    if (cardRef.current) {
      observer.observe(cardRef.current);
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
  }, [scrollReveal, staggerIndex, staggerDelay, startOffset, endOffset]);

  const handleMouseMove = (e) => {
    if (!canTilt || !cardRef.current) return;
    setIsHovered(true);

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const normX = (x - centerX) / centerX;
    const normY = (y - centerY) / centerY;

    const rotateX = normY * -maxTilt;
    const rotateY = normX * maxTilt;

    const shadowX = (normX * -15).toFixed(1);
    const shadowY = (normY * -15 + 20).toFixed(1);
    const shadowBlur = 35;
    const shadowColor = darkTheme
      ? 'rgba(0, 0, 0, 0.65)'
      : 'rgba(25, 73, 216, 0.16)';

    setHoverTransform(
      `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(${liftZ}px) translateY(-6px) scale3d(${scale}, ${scale}, ${scale})`
    );
    setShadow(`${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowColor}`);
    setSpotlight({
      x: ((x / rect.width) * 100).toFixed(1),
      y: ((y / rect.height) * 100).toFixed(1),
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    if (!canTilt) return;
    setIsHovered(false);
    setHoverTransform('');
    setShadow('');
    setSpotlight((prev) => ({ ...prev, opacity: 0 }));
  };

  // Continuous scroll entrance calculations
  const scrollOpacity = scrollReveal ? (0.28 + 0.72 * scrollProgress) : 1;
  const scrollTranslateY = scrollReveal ? (1 - scrollProgress) * 22 : 0;
  const scrollScale = scrollReveal ? (0.965 + 0.035 * scrollProgress) : 1;

  // Active transform: hover tilt takes priority if active, else scroll elevation
  const activeTransform = isHovered && hoverTransform
    ? hoverTransform
    : `translate3d(0, ${scrollTranslateY.toFixed(1)}px, 0) scale3d(${scrollScale.toFixed(3)}, ${scrollScale.toFixed(3)}, 1)`;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        opacity: isHovered ? 1 : scrollOpacity.toFixed(3),
        transform: activeTransform,
        boxShadow: shadow || undefined,
        transformStyle: 'preserve-3d',
        transition: isHovered
          ? 'transform 0.08s ease-out, box-shadow 0.12s ease-out, opacity 0.1s linear'
          : 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.4s ease-out, opacity 0.08s linear',
        ...style,
      }}
      className={`relative rounded-xl overflow-hidden will-change-transform ${className}`}
      {...props}
    >
      {/* Dynamic Cursor Spotlight / Glare overlay */}
      {canTilt && (
        <div
          className="pointer-events-none absolute -inset-px z-30 transition-opacity duration-300 rounded-[inherit]"
          style={{
            opacity: spotlight.opacity,
            background: `radial-gradient(circle 320px at ${spotlight.x}% ${spotlight.y}%, ${
              darkTheme ? 'rgba(255, 255, 255, 0.12)' : lightColor
            }, transparent 75%)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Card Content with 3D child preservation */}
      <div style={{ transformStyle: 'preserve-3d' }} className="h-full w-full">
        {children}
      </div>
    </div>
  );
}
