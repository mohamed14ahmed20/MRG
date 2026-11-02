'use client';

import * as React from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Mail, Phone, MapPin, ShieldCheck, ExternalLink, Clock } from 'lucide-react';

export function Footer() {
  const t = useTranslations('nav');
  const tCommon = useTranslations('common');
  const tSectors = useTranslations('sectors');
  const locale = useLocale();

  return (
    <footer className="relative bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: About MRG */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-xl bg-white/10 p-1.5 border border-emerald-400/40">
                <Image
                  src="/uploads/2024/12/cropped-اللوجو-copy-2.png"
                  alt="MRG Logo"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-wide">
                  {locale === 'ar' ? 'مجموعة MRG' : 'MRG Group'}
                </h3>
                <p className="text-xs text-emerald-400/90 font-medium">
                  {locale === 'ar' ? 'مجموعة محمود رمضان الاقتصادية' : 'Mahmoud Ramadan Group'}
                </p>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed">
              {locale === 'ar'
                ? 'صرح اقتصادي مصري رائد يجمع بين كبرى المصانع الاستراتيجية، حلول التكنولوجيا، التوكيلات التجارية العالمية، والاستثمار في الإنسان.'
                : 'A premier Egyptian economic powerhouse combining strategic industrial manufacturing, technology, commercial agencies, and human capital.'}
            </p>

          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4 border-b border-slate-800 pb-2">
              {tCommon('quickLinks')}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link href="/#companies" className="hover:text-emerald-400 transition-colors">
                  {t('companies')}
                </Link>
              </li>
              <li>
                <Link href="/chairman" className="hover:text-emerald-400 transition-colors">
                  {t('chairman')}
                </Link>
              </li>
              <li>
                <Link href="/magazine" className="hover:text-emerald-400 transition-colors">
                  {t('magazine')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition-colors">
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Sectors */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4 border-b border-slate-800 pb-2">
              {tSectors('title')}
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>{tSectors('industrial')}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>{tSectors('securityTech')}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>{tSectors('advertisingMedia')}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>{tSectors('trading')}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>{tSectors('developmentSports')}</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Headquarters */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4 border-b border-slate-800 pb-2">
              {tCommon('contactUs')}
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{tCommon('headquarters')}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="mailto:contact@mrgeg.com" className="hover:text-emerald-400 transition-colors">
                  contact@mrgeg.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:+20223494194" dir="ltr" className="hover:text-emerald-400 transition-colors">
                  +20 (2) 2349 4194
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-400 leading-relaxed">
                  {locale === 'ar'
                    ? 'السبت – الخميس: 10:00 ص – 6:00 م (الجمعة: مغلق)'
                    : 'Sat – Thu: 10:00 AM – 6:00 PM (Fri: Closed)'}
                </span>
              </li>
              <li className="pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>{locale === 'ar' ? 'معتمد رسمياً - السجل التجاري والضريبي' : 'Officially Registered & Certified'}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>{tCommon('rights')}</p>
          <div className="flex items-center gap-4 text-slate-500">
            <span>{locale === 'ar' ? 'صرح صناعي واستثماري مصري' : 'Egyptian Industrial & Investment Powerhouse'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
