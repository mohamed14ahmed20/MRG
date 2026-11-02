'use client';

import * as React from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { BookOpen, ExternalLink, Download, Sparkles, CheckCircle2 } from 'lucide-react';

export function MagazineSection() {
  const t = useTranslations('magazine');
  const locale = useLocale();

  const issues = [
    {
      id: 1,
      title: locale === 'ar' ? 'العدد الأول - انطلاقة الريادة' : 'Issue 01 - The Leap to Leadership',
      date: '2024 - Q1',
      desc: locale === 'ar' ? 'توثيق شامل لتأسيس كبرى مصانع المجموعة واستعراض خطوط إنتاج ألياف البوليستر بالسويس.' : 'Comprehensive documentation of the group foundation and polyester manufacturing in Suez.',
      image: '/uploads/2024/12/repreve-unifi-recycled-polyester-factory-tour.jpg',
      pages: '48 صفحة',
    },
    {
      id: 2,
      title: locale === 'ar' ? 'العدد الثاني - آفاق الاستثمار الأخضر' : 'Issue 02 - Green Investment Horizons',
      date: '2024 - Q3',
      desc: locale === 'ar' ? 'ملف خاص عن الاقتصاد الدائري، إعادة تدوير عبوات البلاستيك، والتوسع في مصانع بيور بلاست.' : 'Special feature on the circular economy, bottle recycling, and Pure Plast expansion.',
      image: '/uploads/2025/01/WhatsApp-Image-2024-04-29-at-15.23.59_18baea5d.jpg',
      pages: '56 صفحة',
    },
    {
      id: 3,
      title: locale === 'ar' ? 'العدد الثالث - التوسع والتكامل الإقليمي' : 'Issue 03 - Regional Expansion & Synergy',
      date: '2025 - Q1',
      desc: locale === 'ar' ? 'إطلاق أنظمة SUS للتيار الخفيف والبطاريات الجافة واستثمارات أكاديميات الرياضة والتدريب.' : 'Launching SUS Security systems, dry battery trade, sports academies, and vocational training.',
      image: '/uploads/2024/12/Integrated-Security-Management-Systems-ISMS-shutterstock_146057678.jpg',
      pages: '64 صفحة',
    },
  ];

  const [selectedIssue, setSelectedIssue] = React.useState<typeof issues[0] | null>(null);

  return (
    <section className="py-20 bg-slate-50/70 dark:bg-[#070d18]/70 border-t border-slate-200/60 dark:border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{t('title')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {locale === 'ar' ? 'مجلة وإصدارات مجموعة MRG' : 'MRG Group Publications'}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
            {t('subtitle')}
          </p>
        </div>

        {/* Issues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {issues.map((issue) => (
            <div
              key={issue.id}
              className="group flex flex-col rounded-3xl overflow-hidden glass-panel glow-card border border-slate-200/80 dark:border-slate-800/80 hover:border-emerald-500/50 transition-all duration-300 shadow-sm"
            >
              <div className="relative h-60 w-full overflow-hidden bg-slate-900">
                <Image
                  src={issue.image}
                  alt={issue.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-black/60 text-emerald-400 border border-emerald-400/30 backdrop-blur-md">
                    {issue.date}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {issue.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {issue.desc}
                </p>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-500">{issue.pages}</span>
                  <button
                    onClick={() => setSelectedIssue(issue)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-sm"
                  >
                    <span>{t('readIssue')}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reader Modal */}
      {selectedIssue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    {selectedIssue.title}
                  </h4>
                  <p className="text-xs text-slate-500">{selectedIssue.date}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedIssue(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="py-6 space-y-4">
              <div className="relative h-64 rounded-2xl overflow-hidden bg-slate-900">
                <Image
                  src={selectedIssue.image}
                  alt={selectedIssue.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-sm font-medium">{selectedIssue.desc}</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm">
                {locale === 'ar'
                  ? 'متاح للقراءة والتحميل مجاناً ضمن مبادرة المعرفة والشفافية الاقتصادية لمجموعة محمود رمضان.'
                  : 'Available for complimentary reading and download as part of MRG Group economic knowledge initiative.'}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedIssue(null)}
                className="px-5 py-2.5 rounded-full text-xs font-semibold border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {locale === 'ar' ? 'إغلاق' : 'Close'}
              </button>
              <button
                onClick={() => alert(locale === 'ar' ? 'جاري تجهيز نسخة PDF للتحميل...' : 'Preparing PDF download...')}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>{locale === 'ar' ? 'تحميل العدد PDF' : 'Download PDF'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
