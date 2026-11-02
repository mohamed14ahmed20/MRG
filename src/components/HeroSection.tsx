'use client';

import * as React from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowRight, ArrowLeft, Shield, Award, Users, Factory, Sparkles, Building2 } from 'lucide-react';

export function HeroSection() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const stats = [
    { value: t('statYears'), label: t('statYearsLabel'), icon: Award },
    { value: t('statCompanies'), label: t('statCompaniesLabel'), icon: Building2 },
    { value: t('statWorkforce'), label: t('statWorkforceLabel'), icon: Users },
    { value: t('statSectors'), label: t('statSectorsLabel'), icon: Factory },
  ];

  return (
    <section className="relative flex flex-col justify-center pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16 md:pb-20 overflow-hidden">
      {/* Background Decorative Gradients & Glows */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-slate-900/5 dark:from-emerald-400/5 dark:via-transparent dark:to-transparent pointer-events-none" />
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-blue-600/10 dark:bg-blue-600/15 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />

      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="text-center max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full border border-emerald-400/40 bg-emerald-500/10 dark:bg-emerald-400/10 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md shadow-sm">
            <Sparkles className="w-4 h-4 text-emerald-500 animate-spin" style={{ animationDuration: '6s' }} />
            <span>{t('badge')}</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.25] sm:leading-[1.15]">
            <span>{locale === 'ar' ? 'ريادة مصرية.. ' : 'Egyptian Leadership, '}</span>
            <span className="gold-gradient-text block sm:inline">
              {locale === 'ar' ? 'واستثمار يصنع المستقبل' : 'Building the Future'}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal px-2 sm:px-0">
            {t('subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4">
            <Link
              href="/#companies"
              className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/40 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <span>{t('exploreCompanies')}</span>
              <ArrowIcon className="w-4 sm:w-5 h-4 sm:h-5" />
            </Link>

            <Link
              href="/chairman"
              className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full text-sm sm:text-base font-semibold text-slate-800 dark:text-white border border-slate-300 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 backdrop-blur-sm"
            >
              <Shield className="w-4 sm:w-5 h-4 sm:h-5 text-emerald-500" />
              <span>{t('founderBio')}</span>
            </Link>
          </div>

          {/* Interactive Stats Grid */}
          <div className="pt-8 sm:pt-12 md:pt-16 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {stats.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={idx}
                  className="glass-panel p-5 sm:p-6 rounded-2xl glow-card text-center group"
                >
                  <div className="inline-flex p-3 rounded-xl bg-emerald-500/10 dark:bg-emerald-400/10 text-emerald-600 dark:text-emerald-400 mb-3 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                    {s.value}
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
                    {s.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
