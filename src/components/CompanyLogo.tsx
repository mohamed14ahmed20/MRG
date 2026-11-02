'use client';

import * as React from 'react';
import Image from 'next/image';
import { Company } from '@/lib/queries';

interface CompanyLogoProps {
  company: Company;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showLabel?: boolean;
  isCircle?: boolean;
}

export function CompanyLogo({
  company,
  className = '',
  size = 'md',
  showLabel = false,
  isCircle = false,
}: CompanyLogoProps) {
  const [imageError, setImageError] = React.useState(false);

  // Sizing definitions
  const sizeMap = {
    sm: { box: 'w-10 h-10', icon: 'w-6 h-6', text: 'text-[10px]' },
    md: { box: 'w-14 h-14', icon: 'w-8 h-8', text: 'text-xs' },
    lg: { box: 'w-20 h-20', icon: 'w-12 h-12', text: 'text-sm' },
    xl: { box: 'w-24 h-24 sm:w-28 sm:h-28', icon: 'w-14 h-14 sm:w-16 sm:h-16', text: 'text-base' },
    '2xl': { box: 'w-32 h-32 sm:w-36 sm:h-36', icon: 'w-20 h-20 sm:w-24 sm:h-24', text: 'text-lg' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;
  const roundedClass = isCircle ? 'rounded-full aspect-square' : 'rounded-2xl';

  // If company has an explicit logo image and it hasn't errored
  if (company.logo && !imageError) {
    return (
      <div
        className={`relative ${currentSize.box} ${roundedClass} bg-white dark:bg-slate-900/90 p-2 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-center overflow-hidden shrink-0 group ${className}`}
      >
        <Image
          src={company.logo}
          alt={company.name.en}
          fill
          className={`object-contain ${isCircle ? 'p-3' : 'p-1.5'}`}
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

  // Bespoke SVG Vector Emblems for each subsidiary company
  const renderEmblem = () => {
    switch (company.slug) {
      case 'suez-polyester-fibers':
        return (
          <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
            <defs>
              <linearGradient id="spfGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
            </defs>
            <circle cx="24" cy="24" r="22" fill="#ecfdf5" className="dark:fill-emerald-950/40" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 2" />
            {/* Infinity loop / recycled fiber filament */}
            <path
              d="M16 20C13.5 20 12 21.8 12 24C12 26.2 13.5 28 16 28C19 28 21.5 25.5 24 24C26.5 22.5 29 20 32 20C34.5 20 36 21.8 36 24C36 26.2 34.5 28 32 28C29 28 26.5 25.5 24 24C21.5 22.5 19 20 16 20Z"
              stroke="url(#spfGrad)"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="16" cy="24" r="2.2" fill="#10b981" />
            <circle cx="32" cy="24" r="2.2" fill="#047857" />
          </svg>
        );

      case 'pure-plast':
        return (
          <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
            <defs>
              <linearGradient id="pureGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
            </defs>
            <rect x="3" y="3" width="42" height="42" rx="12" fill="#f0fdfa" className="dark:fill-cyan-950/40" stroke="#06b6d4" strokeWidth="1.5" />
            {/* Hexagonal PET Polymer facet */}
            <path
              d="M24 10L36 17V31L24 38L12 31V17L24 10Z"
              stroke="url(#pureGrad)"
              strokeWidth="2.5"
              fill="none"
              strokeLinejoin="round"
            />
            <path d="M24 10V38M12 17L36 31M36 17L12 31" stroke="#06b6d4" strokeWidth="1" strokeOpacity="0.4" />
            <circle cx="24" cy="24" r="3.5" fill="url(#pureGrad)" />
          </svg>
        );

      case 'sus-security-systems':
        return (
          <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
            <defs>
              <linearGradient id="susGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
            </defs>
            <rect x="3" y="3" width="42" height="42" rx="12" fill="#eff6ff" className="dark:fill-blue-950/40" stroke="#3b82f6" strokeWidth="1.5" />
            {/* Security Shield & IP Biometric Pulse */}
            <path
              d="M24 9L36 14V23C36 30.5 30.9 37.4 24 39C17.1 37.4 12 30.5 12 23V14L24 9Z"
              stroke="url(#susGrad)"
              strokeWidth="2.5"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              d="M20 24L23 27L29 20"
              stroke="#10b981"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="24" cy="16" r="1.5" fill="#3b82f6" />
          </svg>
        );

      case 'mixmax-interactive-screens':
        return (
          <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
            <defs>
              <linearGradient id="mixGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
            <rect x="3" y="3" width="42" height="42" rx="12" fill="#faf5ff" className="dark:fill-purple-950/40" stroke="#8b5cf6" strokeWidth="1.5" />
            {/* Interactive display panel + touch ring */}
            <rect x="10" y="11" width="28" height="20" rx="3" stroke="url(#mixGrad)" strokeWidth="2" />
            <path d="M20 37H28M24 31V37" stroke="url(#mixGrad)" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="24" cy="21" r="4.5" stroke="#ec4899" strokeWidth="1.8" />
            <circle cx="24" cy="21" r="1.5" fill="#ec4899" />
          </svg>
        );

      case 'fox-sign':
        return (
          <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
            <defs>
              <linearGradient id="foxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#ea580c" />
              </linearGradient>
            </defs>
            <rect x="3" y="3" width="42" height="42" rx="12" fill="#fff7ed" stroke="#f97316" strokeWidth="1.5" />
            {/* Letter F */}
            <path d="M 8 15 H 15 V 18 H 11 V 23 H 14.5 V 26 H 11 V 33 H 8 Z" fill="#0e206e" />
            {/* Curled Fox O */}
            <circle cx="23.5" cy="24" r="7.5" stroke="url(#foxGrad)" strokeWidth="3" fill="none" />
            <path d="M 19 20 C 21 17 25 17 27.5 20.5 C 27.5 22 26 23 23.5 22.5 Z" fill="url(#foxGrad)" />
            {/* Letter X */}
            <path d="M 32 15 L 39 33 H 36 L 33.5 26.5 L 31 33 H 28 L 35 15 Z" fill="#0e206e" />
          </svg>
        );

      case 'tafra-publishing':
        return (
          <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
            <defs>
              <linearGradient id="tafraGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#eab308" />
                <stop offset="100%" stopColor="#ca8a04" />
              </linearGradient>
            </defs>
            <rect x="3" y="3" width="42" height="42" rx="12" fill="#fefce8" className="dark:fill-amber-950/40" stroke="#eab308" strokeWidth="1.5" />
            {/* Open book & soaring quill */}
            <path
              d="M12 32C15.5 30 19.5 30 24 32C28.5 30 32.5 30 36 32V16C32.5 14 28.5 14 24 16C19.5 14 15.5 14 12 16V32Z"
              stroke="url(#tafraGrad)"
              strokeWidth="2.2"
              strokeLinejoin="round"
              fill="none"
            />
            <path d="M24 16V32" stroke="url(#tafraGrad)" strokeWidth="2" strokeLinecap="round" />
            <path d="M28 11L33 16" stroke="#ca8a04" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );

      case 'medical-news':
        return (
          <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
            <defs>
              <linearGradient id="medGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>
            <rect x="3" y="3" width="42" height="42" rx="12" fill="#ecfdf5" className="dark:fill-emerald-950/40" stroke="#10b981" strokeWidth="1.5" />
            {/* Healthcare cross & heartbeat pulse */}
            <path
              d="M20 12H28V20H36V28H28V36H20V28H12V20H20V12Z"
              stroke="url(#medGrad)"
              strokeWidth="2"
              fill="none"
              strokeLinejoin="round"
            />
            <path
              d="M10 24H17L20 18L24 30L27 21L29 24H38"
              stroke="#ef4444"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );

      case 'united-trading-agencies':
        return (
          <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
            <defs>
              <linearGradient id="utGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
            </defs>
            <rect x="3" y="3" width="42" height="42" rx="12" fill="#fffbeb" className="dark:fill-amber-950/40" stroke="#f59e0b" strokeWidth="1.5" />
            {/* Dual commercial synergy arrows & energy battery node */}
            <circle cx="24" cy="24" r="13" stroke="url(#utGrad)" strokeWidth="2.2" strokeDasharray="5 3" />
            <path d="M18 20L24 14L30 20M30 28L24 34L18 28" stroke="url(#utGrad)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="24" cy="24" r="3" fill="#f59e0b" />
          </svg>
        );

      case 'land-of-gold':
        return (
          <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
            <defs>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#d97706" />
              </linearGradient>
            </defs>
            <rect x="3" y="3" width="42" height="42" rx="12" fill="#fffbeb" className="dark:fill-amber-950/40" stroke="#fbbf24" strokeWidth="1.5" />
            {/* Gold Bar & Royal Diamond Crest */}
            <path
              d="M24 11L35 20L24 37L13 20L24 11Z"
              stroke="url(#goldGrad)"
              strokeWidth="2.2"
              fill="none"
              strokeLinejoin="round"
            />
            <path d="M13 20H35M24 11V37" stroke="url(#goldGrad)" strokeWidth="1.5" strokeOpacity="0.6" />
            <circle cx="24" cy="18" r="2.5" fill="#f59e0b" />
          </svg>
        );

      case 'mran-sports-investment':
        return (
          <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
            <defs>
              <linearGradient id="mranGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#84cc16" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
            <rect x="3" y="3" width="42" height="42" rx="12" fill="#f7fee7" className="dark:fill-lime-950/40" stroke="#84cc16" strokeWidth="1.5" />
            {/* Dynamic runner velocity swoosh & ball */}
            <circle cx="28" cy="15" r="3.5" fill="#84cc16" />
            <path
              d="M14 34C18 31 22 28 26 23L31 27M21 21L26 23L23 16"
              stroke="url(#mranGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M12 36C18 37 32 36 36 29" stroke="#84cc16" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        );

      case 'italent-academy':
        return (
          <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
            <defs>
              <linearGradient id="itGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
            <rect x="3" y="3" width="42" height="42" rx="12" fill="#eff6ff" className="dark:fill-blue-950/40" stroke="#3b82f6" strokeWidth="1.5" />
            {/* Graduation Cap & Growth Stairs */}
            <path
              d="M24 13L37 19L24 25L11 19L24 13Z"
              stroke="url(#itGrad)"
              strokeWidth="2.2"
              fill="none"
              strokeLinejoin="round"
            />
            <path d="M17 22V28C17 31 20 33 24 33C28 33 31 31 31 28V22" stroke="url(#itGrad)" strokeWidth="2" />
            <path d="M37 19V28" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );

      case 'itc-medical-conferences':
        return (
          <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
            <defs>
              <linearGradient id="itcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#0d9488" />
              </linearGradient>
            </defs>
            <rect x="3" y="3" width="42" height="42" rx="12" fill="#f0fdfa" className="dark:fill-teal-950/40" stroke="#0d9488" strokeWidth="1.5" />
            {/* Global Conference Globe & Speaker Podium Waves */}
            <circle cx="24" cy="24" r="13" stroke="url(#itcGrad)" strokeWidth="2.2" />
            <path d="M11 24H37M24 11C28 15 30 19.5 30 24C30 28.5 28 33 24 37M24 11C20 15 18 19.5 18 24C18 28.5 20 33 24 37" stroke="url(#itcGrad)" strokeWidth="1.4" />
            <circle cx="24" cy="24" r="2.5" fill="#0d9488" />
          </svg>
        );

      default:
        return (
          <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
            <rect x="3" y="3" width="42" height="42" rx="12" fill="#f8fafc" className="dark:fill-slate-900" stroke="#10b981" strokeWidth="1.5" />
            <path d="M16 34V14L24 22L32 14V34" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
    }
  };

  return (
    <div
      className={`relative ${currentSize.box} ${roundedClass} bg-white dark:bg-slate-900/90 p-2 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-center overflow-hidden shrink-0 group transition-all duration-300 hover:scale-105 hover:border-emerald-500/50 ${className}`}
    >
      <div className={`${currentSize.icon} flex items-center justify-center`}>
        {renderEmblem()}
      </div>
    </div>
  );
}
