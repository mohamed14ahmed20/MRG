import { setRequestLocale } from 'next-intl/server';
import { MagazineSection } from '@/components/MagazineSection';
import { BookOpen, Sparkles, FileText, Download, ShieldCheck } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';
  return {
    title: isAr ? 'إصدارات ومجلة المجموعة | مجموعة MRG' : 'Publications & Magazine | MRG Group',
    description: isAr
      ? 'استعرض وتصفح أحدث أعداد مجلة مجموعة محمود رمضان (MRG) والتقارير الاقتصادية والصناعية.'
      : 'Browse and read the latest editions of Mahmoud Ramadan Group (MRG) publications and economic reports.',
  };
}

export default async function MagazinePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="pt-28 pb-20 bg-slate-50/50 dark:bg-[#060b13]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Magazine Interactive Section */}
        <MagazineSection />

        {/* Knowledge & Transparency Statement */}
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500 inline-block">
                <BookOpen className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                {locale === 'ar' ? 'إصدارات نصف سنوية' : 'Semi-Annual Reports'}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {locale === 'ar' ? 'تغطيات حصرية لأنشطة المصانع والشركات' : 'Exclusive coverage of industrial milestones'}
              </p>
            </div>

            <div className="space-y-2">
              <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500 inline-block">
                <FileText className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                {locale === 'ar' ? 'دراسات جدوى وأبحاث اقتصادية' : 'Economic & Market Insights'}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {locale === 'ar' ? 'تحليلات حول إعادة التدوير وصناعة البلاستيك' : 'Analysis on plastic recycling and supply chains'}
              </p>
            </div>

            <div className="space-y-2">
              <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500 inline-block">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                {locale === 'ar' ? 'شفافية ومسؤولية مجتمعية' : 'Transparency & CSR'}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {locale === 'ar' ? 'توثيق مبادرات مؤسسة رمضان للتنمية' : 'Documenting Ramadan Foundation community impact'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
