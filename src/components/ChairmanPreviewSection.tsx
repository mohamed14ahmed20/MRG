'use client';

import * as React from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ShieldCheck, GraduationCap, Quote, ArrowRight, ArrowLeft, Award, Sparkles } from 'lucide-react';

export function ChairmanPreviewSection() {
  const t = useTranslations('chairman');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const affiliations = [
    locale === 'ar' ? 'عضو اتحاد الناشرين المصريين' : 'Member of Egyptian Publishers Association',
    locale === 'ar' ? 'عضو اتحاد الناشرين العرب' : 'Member of Arab Publishers Association',
    locale === 'ar' ? 'عضو غرفة الصناعات الكيماوية باتحاد الصناعات المصرية' : 'Member of Chamber of Chemical Industries, FEI',
    locale === 'ar' ? 'عضو جمعية رجال الأعمال المصريين الأتراك' : 'Member of Egyptian-Turkish Businessmen Association',
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-white dark:bg-[#060b13]">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Chairman Portrait Photo */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Green gradient frame */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-emerald-600 via-emerald-400 to-emerald-700 opacity-30 blur-lg" />
              <div className="relative h-[480px] sm:h-[540px] rounded-3xl overflow-hidden border-2 border-emerald-500/30 shadow-2xl bg-slate-900">
                <Image
                  src="/uploads/2024/12/5a259c37916dd.jpg"
                  alt="Chairman Mr. Mahmoud Ramadan"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                {/* Overlay Name Tag */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 text-white">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{t('badge')}</span>
                  </div>
                  <h3 className="text-xl font-bold">{t('name')}</h3>
                  <p className="text-xs text-slate-300">{t('role')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Biography Content & Quotes */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
              <Award className="w-3.5 h-3.5" />
              <span>{t('title')}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              {t('name')}
            </h2>

            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-medium">
                <GraduationCap className="w-4 h-4 text-emerald-500" />
                {t('education')}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-medium">
                {t('birth')}
              </span>
            </div>

            {/* Quote block */}
            <div className="relative p-6 rounded-2xl bg-emerald-500/5 dark:bg-emerald-500/10 border-l-4 border-emerald-500 dark:border-emerald-400 my-6">
              <Quote className="w-8 h-8 text-emerald-500/40 absolute top-3 right-3 pointer-events-none" />
              <p className="text-base sm:text-lg italic text-slate-700 dark:text-slate-200 leading-relaxed font-serif">
                {t('quote')}
              </p>
            </div>

            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {t('bio1')}
            </p>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {t('bio2')}
            </p>

            {/* Affiliations badges */}
            <div className="pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                {t('affiliationsTitle')}
              </h4>
              <div className="flex flex-wrap gap-2">
                {affiliations.map((aff, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{aff}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/chairman"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md hover:shadow-emerald-600/25 transition-all transform hover:-translate-y-0.5"
              >
                <span>{t('fullBioLink')}</span>
                <ArrowIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
