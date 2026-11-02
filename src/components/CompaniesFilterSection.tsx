'use client';

import * as React from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Company } from '@/lib/queries';
import {
  Factory,
  Shield,
  Megaphone,
  ShoppingBag,
  Trophy,
  ArrowRight,
  ArrowLeft,
  MapPin,
  CheckCircle2,
  Calendar,
  Globe,
  ExternalLink
} from 'lucide-react';

interface Props {
  companies: Company[];
}

export function CompaniesFilterSection({ companies }: Props) {
  const t = useTranslations('sectors');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const [activeSector, setActiveSector] = React.useState<string>('all');

  const categories = [
    { id: 'all', label: t('all'), icon: null },
    { id: 'industrial', label: t('industrial'), icon: Factory },
    { id: 'securityTech', label: t('securityTech'), icon: Shield },
    { id: 'advertisingMedia', label: t('advertisingMedia'), icon: Megaphone },
    { id: 'trading', label: t('trading'), icon: ShoppingBag },
    { id: 'developmentSports', label: t('developmentSports'), icon: Trophy },
  ];

  const filtered = activeSector === 'all'
    ? companies
    : companies.filter(c => c.sector === activeSector);

  return (
    <section id="companies" className="py-20 bg-slate-50/50 dark:bg-[#070d18]/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
            {tCommon('ourCompanies')}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t('title')}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
            {t('subtitle')}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeSector === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveSector(cat.id)}
                className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 scale-105'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-emerald-400/50 hover:bg-emerald-50/50 dark:hover:bg-slate-800'
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                <span>{cat.label}</span>
                {cat.id !== 'all' && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}>
                    {companies.filter(c => c.sector === cat.id).length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((company) => {
            const name = locale === 'ar' ? company.name.ar : company.name.en;
            const shortDesc = locale === 'ar' ? company.shortDesc.ar : company.shortDesc.en;
            const sectorName = locale === 'ar' ? company.sectorName.ar : company.sectorName.en;
            const location = locale === 'ar' ? company.location.ar : company.location.en;
            const features = locale === 'ar' ? company.features.ar : company.features.en;

            return (
              <div
                key={company.id}
                className="group relative flex flex-col rounded-3xl overflow-hidden glass-panel glow-card border border-slate-200/80 dark:border-slate-800/80 hover:border-emerald-500/50 transition-all duration-300 shadow-sm"
              >
                {/* Image Container */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                  <Image
                    src={company.image}
                    alt={name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />

                  {/* Sector Tag */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-600/90 text-white shadow backdrop-blur-md">
                      {sectorName}
                    </span>
                  </div>

                  {/* Established Year if present */}
                  {company.established && (
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono bg-black/60 text-white backdrop-blur-md">
                      <Calendar className="w-3 h-3 text-emerald-400" />
                      <span>{company.established}</span>
                    </div>
                  )}

                  {/* Bottom Image Overlay Title */}
                  <div className="absolute bottom-3 left-4 right-4 z-10">
                    <h3 className="text-xl font-bold text-white tracking-wide group-hover:text-emerald-300 transition-colors">
                      {name}
                    </h3>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                    {shortDesc}
                  </p>

                  {/* Key Features Bullet points */}
                  {features && features.length > 0 && (
                    <ul className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                      {features.slice(0, 2).map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Location & View Button */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-3 mt-auto">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                        <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span className="truncate max-w-[150px]">{location}</span>
                      </div>

                      <Link
                        href={`/companies/${company.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 group-hover:translate-x-1 transition-transform"
                      >
                        <span>{tCommon('viewDetails')}</span>
                        <ArrowIcon className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    {/* Visit Website Button - ONLY for companies with an official website */}
                    {company.website && (
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm shadow-emerald-600/20 hover:shadow-md hover:shadow-emerald-600/30 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
                      >
                        <Globe className="w-3.5 h-3.5 text-emerald-100" />
                        <span>{tCommon('visitWebsite')}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-emerald-100/90" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
