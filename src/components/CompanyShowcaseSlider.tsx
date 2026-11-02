'use client';

import * as React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Company } from '@/lib/queries';
import { CompanyLogo } from './CompanyLogo';
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  ArrowRight,
  ArrowLeft,
  MapPin,
  Calendar,
  Sparkles,
  Building2,
  Factory,
  Shield,
  Megaphone,
  ShoppingBag,
  Trophy,
} from 'lucide-react';

interface Props {
  companies: Company[];
}

export function CompanyShowcaseSlider({ companies }: Props) {
  const t = useTranslations('showcase');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const total = companies.length;
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [isPaused, setIsPaused] = React.useState<boolean>(false);
  const [progress, setProgress] = React.useState<number>(0); // 0 to 100

  // Interactive Drag & Touch States
  const [isDragging, setIsDragging] = React.useState<boolean>(false);
  const [dragDeltaX, setDragDeltaX] = React.useState<number>(0);
  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  // Mutable refs for high-frequency physics tracking without lag
  const dragStartXRef = React.useRef<number>(0);
  const dragStartYRef = React.useRef<number>(0);
  const currentDeltaXRef = React.useRef<number>(0);
  const isDraggingRef = React.useRef<boolean>(false);
  const gestureLockedRef = React.useRef<'none' | 'horizontal' | 'vertical'>('none');
  const dragHistoryRef = React.useRef<{ x: number; time: number }[]>([]);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Responsive step distance (in pixels between neighboring circle centers)
  const stepPx = isMobile ? 112 : 170;
  const multiplier = isRtl ? -1 : 1;

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sector Icon Resolver
  const getSectorIcon = (sector: Company['sector']) => {
    switch (sector) {
      case 'industrial':
        return Factory;
      case 'securityTech':
        return Shield;
      case 'advertisingMedia':
        return Megaphone;
      case 'trading':
        return ShoppingBag;
      case 'developmentSports':
        return Trophy;
      default:
        return Building2;
    }
  };

  // Slide navigation with timer reset
  const goToSlide = React.useCallback(
    (index: number) => {
      const normalized = ((index % total) + total) % total;
      setCurrentIndex(normalized);
      setProgress(0);
    },
    [total]
  );

  const goToNext = React.useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  const goToPrev = React.useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  // 5-Second Timer with smooth 50ms tick
  React.useEffect(() => {
    if (isPaused || isDragging || total <= 1) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          goToNext();
          return 0;
        }
        return prev + 1; // 100 steps * 50ms = 5000ms
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isPaused, isDragging, total, goToNext]);

  // Finish drag with velocity momentum & smooth zero-jump cubic-bezier glide
  const finishDrag = React.useCallback(() => {
    const deltaX = currentDeltaXRef.current;

    // Calculate drag velocity (pixels / ms) over the last 150ms
    let velocity = 0;
    const history = dragHistoryRef.current;
    if (history.length >= 2) {
      const first = history[0];
      const last = history[history.length - 1];
      const dt = last.time - first.time;
      if (dt > 10) {
        velocity = (last.x - first.x) / dt;
      }
    }

    // Fractional slide distance moved
    const dragRatio = -deltaX / (stepPx * multiplier);
    let targetShift = Math.round(dragRatio);

    // Flick swipe detection: speed > 0.30 px/ms gives an intentional directional swipe
    const flickSpeed = Math.abs(velocity);
    if (flickSpeed > 0.3) {
      const flickDirection = -(velocity / multiplier);
      if (flickDirection > 0) {
        targetShift = Math.ceil(dragRatio);
        if (targetShift === 0) targetShift = 1;
      } else if (flickDirection < 0) {
        targetShift = Math.floor(dragRatio);
        if (targetShift === 0) targetShift = -1;
      }
    }

    // If movement was negligible (< 6px), treat as a static tap/click
    if (Math.abs(deltaX) < 6) {
      setDragDeltaX(0);
      setIsDragging(false);
      setIsPaused(false);
      return;
    }

    if (targetShift !== 0) {
      // Seamless math: offset remaining delta so the transition starts exactly where user's finger let go
      const remainingDeltaX = deltaX + targetShift * stepPx * multiplier;
      const newIndex = (((currentIndex + targetShift) % total) + total) % total;

      setCurrentIndex(newIndex);
      setDragDeltaX(remainingDeltaX);
      setIsDragging(false);
      setProgress(0);

      // In the next frame, glide smoothly to 0 with cubic-bezier easing
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setDragDeltaX(0);
        });
      });

      setTimeout(() => {
        setIsPaused(false);
      }, 500);
    } else {
      // Snap back to current slide
      setIsDragging(false);
      requestAnimationFrame(() => {
        setDragDeltaX(0);
      });
      setTimeout(() => {
        setIsPaused(false);
      }, 500);
    }
  }, [currentIndex, isRtl, multiplier, stepPx, total]);

  // Desktop Mouse Drag Handler
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only primary left click
    const target = e.target as HTMLElement;
    if (target.closest('a') || target.closest('button')) return;

    dragStartXRef.current = e.clientX;
    dragStartYRef.current = e.clientY;
    currentDeltaXRef.current = 0;
    isDraggingRef.current = true;
    setIsDragging(true);
    setIsPaused(true);
    dragHistoryRef.current = [{ x: e.clientX, time: performance.now() }];

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const delta = moveEvent.clientX - dragStartXRef.current;
      currentDeltaXRef.current = delta;
      setDragDeltaX(delta);

      const now = performance.now();
      dragHistoryRef.current.push({ x: moveEvent.clientX, time: now });
      while (
        dragHistoryRef.current.length > 0 &&
        dragHistoryRef.current[0].time < now - 150
      ) {
        dragHistoryRef.current.shift();
      }
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);

      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      finishDrag();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  // Mobile Touch Gestures with Intelligent Vertical Scroll Preservation
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    dragStartXRef.current = touch.clientX;
    dragStartYRef.current = touch.clientY;
    currentDeltaXRef.current = 0;
    gestureLockedRef.current = 'none';
    dragHistoryRef.current = [{ x: touch.clientX, time: performance.now() }];
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - dragStartXRef.current;
    const deltaY = touch.clientY - dragStartYRef.current;

    // Gesture direction lock detection
    if (gestureLockedRef.current === 'none') {
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);

      if (absX > 7 && absX > absY) {
        // Horizontal swipe confirmed -> lock into carousel drag
        gestureLockedRef.current = 'horizontal';
        isDraggingRef.current = true;
        setIsDragging(true);
      } else if (absY > 7 && absY >= absX) {
        // Vertical scroll confirmed -> let browser handle natural page scrolling
        gestureLockedRef.current = 'vertical';
        return;
      } else {
        return;
      }
    }

    if (gestureLockedRef.current === 'horizontal') {
      currentDeltaXRef.current = deltaX;
      setDragDeltaX(deltaX);

      const now = performance.now();
      dragHistoryRef.current.push({ x: touch.clientX, time: now });
      while (
        dragHistoryRef.current.length > 0 &&
        dragHistoryRef.current[0].time < now - 150
      ) {
        dragHistoryRef.current.shift();
      }
    }
  };

  const handleTouchEnd = () => {
    if (gestureLockedRef.current === 'horizontal' && isDraggingRef.current) {
      isDraggingRef.current = false;
      finishDrag();
    } else {
      setIsPaused(false);
    }
    gestureLockedRef.current = 'none';
  };

  const handleTouchCancel = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setDragDeltaX(0);
      setIsDragging(false);
    }
    setIsPaused(false);
    gestureLockedRef.current = 'none';
  };

  // Click on circle: only trigger if user wasn't dragging
  const handleCircleClick = (index: number) => {
    if (Math.abs(currentDeltaXRef.current) > 6) return;
    if (index !== currentIndex) {
      goToSlide(index);
    }
  };

  const activeCompany = companies[currentIndex] || companies[0];
  const ActiveSectorIcon = activeCompany ? getSectorIcon(activeCompany.sector) : Building2;

  // Compute circular distance between slide i and currentIndex
  const getSlideOffset = (index: number) => {
    let diff = index - currentIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  const activeName = locale === 'ar' ? activeCompany.name.ar : activeCompany.name.en;
  const activeShortDesc = locale === 'ar' ? activeCompany.shortDesc.ar : activeCompany.shortDesc.en;
  const activeSectorName = locale === 'ar' ? activeCompany.sectorName.ar : activeCompany.sectorName.en;
  const activeLocation = locale === 'ar' ? activeCompany.location.ar : activeCompany.location.en;

  return (
    <section
      id="companies-showcase"
      className="relative w-full pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-10 md:pb-12 overflow-hidden bg-slate-50/70 dark:bg-[#070d18] border-b border-slate-200/70 dark:border-slate-800/70 text-slate-900 dark:text-white transition-colors duration-300 select-none outline-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        if (!isDraggingRef.current) setIsPaused(false);
      }}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') {
          isRtl ? goToNext() : goToPrev();
        } else if (e.key === 'ArrowRight') {
          isRtl ? goToPrev() : goToNext();
        }
      }}
      aria-label="MRG Group Companies Interactive Circular Showcase"
    >
      {/* 1. Subtle Ambient Background Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(248,250,252,0.8)_90%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,#070d18_90%)]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-6 sm:space-y-8">
        {/* 2. Compact Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-center sm:text-start pb-4 border-b border-slate-200/60 dark:border-white/10">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 dark:bg-emerald-500/15 border border-emerald-500/25">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 animate-pulse" />
              <span>{t('badge')}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {t('title')}
            </h2>
          </div>

          {/* Controls: 5s Timer + Prev/Next Buttons */}
          <div className="flex items-center justify-center sm:justify-end gap-2.5">
            {/* 5-Second Timer Pill */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm text-xs text-slate-700 dark:text-slate-300">
              <div className="relative w-3.5 h-3.5 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-200 dark:text-white/10"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-emerald-600 dark:text-emerald-400 transition-all duration-75"
                    strokeDasharray={`${progress}, 100`}
                    strokeWidth="4"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
              </div>

              <span className="text-[11px] font-mono font-medium">
                {String(currentIndex + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
              </span>

              <button
                type="button"
                onClick={() => setIsPaused((prev) => !prev)}
                className="p-0.5 rounded text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                title={isPaused ? t('resume') : t('pause')}
                aria-label={isPaused ? t('resume') : t('pause')}
              >
                {isPaused ? (
                  <Play className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <Pause className="w-3 h-3" />
                )}
              </button>
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={goToPrev}
                className="w-8 h-8 rounded-full bg-white dark:bg-white/10 border border-slate-200 dark:border-white/15 text-slate-700 dark:text-white hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 flex items-center justify-center transition-all duration-200 shadow-sm active:scale-95"
                aria-label={t('prev')}
                title={t('prev')}
              >
                {isRtl ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={goToNext}
                className="w-8 h-8 rounded-full bg-white dark:bg-white/10 border border-slate-200 dark:border-white/15 text-slate-700 dark:text-white hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 flex items-center justify-center transition-all duration-200 shadow-sm active:scale-95"
                aria-label={t('next')}
                title={t('next')}
              >
                {isRtl ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* 3. Circular Orbital Interactive Stage (Touch / Mouse Drag Enabled) */}
        <div
          ref={containerRef}
          className={`relative w-full h-[190px] sm:h-[220px] md:h-[240px] flex items-center justify-center touch-pan-y ${isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchCancel}
        >
          {companies.map((company, index) => {
            const baseOffset = getSlideOffset(index);

            // Continuous fractional offset incorporating real-time drag distance
            const continuousOffset = baseOffset + dragDeltaX / (stepPx * multiplier);
            const absOffset = Math.abs(continuousOffset);

            // Render visible range with buffer to prevent edge popping
            if (absOffset > 2.6) return null;

            const name = locale === 'ar' ? company.name.ar : company.name.en;

            // Continuous translation along horizontal orbital plane
            const totalTranslateX = continuousOffset * stepPx * multiplier;

            // Gentle parabolic arch: active circle stays at peak, neighbors arch downward smoothly
            const archStep = isMobile ? 8 : 14;
            const translateY = Math.min(absOffset * archStep, archStep * 2.2);

            // Continuous smooth scale: 1.0 at center, 0.76 at neighbor 1, 0.54 at neighbor 2
            let scale: number;
            if (absOffset <= 1) {
              scale = 1 - absOffset * (1 - 0.76);
            } else if (absOffset <= 2) {
              scale = 0.76 - (absOffset - 1) * (0.76 - 0.54);
            } else {
              scale = Math.max(0.38, 0.54 - (absOffset - 2) * 0.2);
            }

            // Continuous smooth opacity
            let opacity: number;
            if (absOffset <= 1) {
              opacity = 1 - absOffset * (1 - 0.7);
            } else if (absOffset <= 2) {
              opacity = 0.7 - (absOffset - 1) * (0.7 - 0.35);
            } else {
              opacity = Math.max(0, 0.35 - (absOffset - 2) * 0.35);
            }

            // Z-Index hierarchy: items closest to center always render on top
            const zIndex = Math.round(50 - absOffset * 15);

            // Active center state indicator
            const isCenterFocus = absOffset < 0.35;

            // Transition: immediate response while dragging, silky ease-out spring when released or clicking
            const transitionStyle = isDragging
              ? 'none'
              : 'transform 500ms cubic-bezier(0.16, 1, 0.3, 1), opacity 500ms cubic-bezier(0.16, 1, 0.3, 1)';

            return (
              <div
                key={company.id}
                onClick={() => handleCircleClick(index)}
                className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-auto"
                style={{
                  transform: `translate3d(calc(-50% + ${totalTranslateX}px), calc(-50% + ${translateY}px), 0) scale(${scale})`,
                  opacity,
                  zIndex,
                  transition: transitionStyle,
                  willChange: isDragging ? 'transform, opacity' : 'auto',
                }}
              >
                {/* Perfect Circle 1:1 Pod */}
                <div
                  className={`group relative rounded-full aspect-square flex items-center justify-center transition-all duration-300 ${isCenterFocus
                      ? 'w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 bg-white dark:bg-white border-2 border-emerald-500 shadow-2xl shadow-emerald-500/25 ring-4 ring-emerald-500/20'
                      : 'w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 bg-white/95 dark:bg-white/95 border border-slate-200/90 dark:border-white/20 shadow-lg hover:border-emerald-400'
                    }`}
                  title={name}
                >
                  {/* Subtle pulsing halo for center active circle */}
                  {isCenterFocus && !isDragging && (
                    <div
                      className="absolute inset-0 rounded-full border border-emerald-500/40 animate-ping pointer-events-none"
                      style={{ animationDuration: '4s' }}
                    />
                  )}

                  {/* Centered Company Logo */}
                  <div className="w-full h-full p-4 sm:p-5 flex items-center justify-center">
                    <CompanyLogo
                      company={company}
                      size="xl"
                      isCircle={true}
                      className="!w-full !h-full !rounded-full !border-0 !shadow-none !p-0 !bg-transparent"
                    />
                  </div>

                  {/* Active Indicator Micro-Badge */}
                  <div
                    className="absolute -bottom-2 left-1/2 z-10 px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold font-mono shadow-md whitespace-nowrap pointer-events-none transition-all duration-300"
                    style={{
                      opacity: Math.max(0, 1 - absOffset * 2.5),
                      transform: `translateX(-50%) scale(${Math.max(0.7, 1 - absOffset * 0.3)})`,
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4. Active Company Information Card */}
        <div
          key={activeCompany.id}
          className="max-w-2xl mx-auto text-center space-y-3 pt-2 transition-all duration-300"
        >
          {/* Sector Badge & Established Year */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
              <ActiveSectorIcon className="w-3.5 h-3.5" />
              <span>{activeSectorName}</span>
            </span>

            {activeCompany.established && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                <Calendar className="w-3 h-3 text-emerald-500" />
                <span>{activeCompany.established}</span>
              </span>
            )}

            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
              <MapPin className="w-3 h-3 text-emerald-500 shrink-0" />
              <span className="truncate max-w-[160px]">{activeLocation}</span>
            </span>
          </div>

          {/* Active Company Name */}
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {activeName}
          </h3>

          {/* Concise Short Description */}
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed line-clamp-2">
            {activeShortDesc}
          </p>

          {/* CTA Action Button */}
          <div className="pt-1">
            <Link
              href={`/companies/${activeCompany.slug}`}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/25 hover:shadow-emerald-600/35 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>{t('viewCompany')}</span>
              <ArrowIcon className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 5. Clean Circular Dots Pagination Indicator */}
        <div className="flex items-center justify-center gap-1.5 pt-1">
          {companies.map((c, idx) => (
            <button
              key={c.id}
              type="button"
              onClick={() => goToSlide(idx)}
              aria-label={`Company ${idx + 1}`}
              className={`transition-all duration-300 rounded-full h-2 ${idx === currentIndex
                  ? 'w-6 bg-emerald-600 dark:bg-emerald-400 shadow-sm shadow-emerald-500'
                  : 'w-2 bg-slate-300 hover:bg-slate-400 dark:bg-white/20 dark:hover:bg-white/40'
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
