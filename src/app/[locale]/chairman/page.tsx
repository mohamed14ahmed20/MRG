import { setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { getChairmanBioDirectSql } from '@/lib/queries';
import { Link } from '@/i18n/routing';
import {
  GraduationCap,
  Award,
  ShieldCheck,
  Quote,
  Building,
  Heart,
  Calendar,
  Briefcase,
  Sparkles,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';
  return {
    title: isAr
      ? 'السيرة الذاتية لمؤسس ورئيس مجلس الإدارة أ/ محمود رمضان | مجموعة MRG'
      : 'Biography of Founder & Chairman Mr. Mahmoud Ramadan | MRG Group',
    description: isAr
      ? 'السيرة الذاتية للأستاذ محمود رمضان مؤسس ورئيس مجلس إدارة مجموعة شركات MRG ورئيس مجلس إدارة مؤسسة رمضان للتنمية الاقتصادية.'
      : 'Biography of Mr. Mahmoud Ramadan, Founder and Chairman of MRG Group of Companies and Chairman of Ramadan Foundation for Economic Development.',
  };
}

export default async function ChairmanPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const bio = await getChairmanBioDirectSql();
  const isRtl = locale === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const affiliations = locale === 'ar' ? bio.affiliationsAr : bio.affiliationsEn;
  const title = locale === 'ar' ? bio.title.ar : bio.title.en;
  const name = locale === 'ar' ? bio.name.ar : bio.name.en;
  const role = locale === 'ar' ? bio.role.ar : bio.role.en;
  const birth = locale === 'ar' ? bio.birth.ar : bio.birth.en;
  const education = locale === 'ar' ? bio.education.ar : bio.education.en;
  const content = locale === 'ar' ? bio.contentAr : bio.contentEn;

  return (
    <div className="pt-28 pb-20 bg-slate-50/50 dark:bg-[#060b13]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Breadcrumb */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{title}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {name}
          </h1>
          <p className="text-lg text-emerald-600 dark:text-emerald-400 font-medium">
            {role}
          </p>
        </div>

        {/* Profile Card & Highlights */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Image */}
            <div className="lg:col-span-5">
              <div className="relative h-[480px] sm:h-[520px] rounded-3xl overflow-hidden border-2 border-emerald-500/30 shadow-2xl bg-slate-900">
                <Image
                  src={bio.image}
                  alt={name}
                  fill
                  className="object-cover object-top"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 text-white">
                  <h3 className="text-xl font-bold">{name}</h3>
                  <p className="text-xs text-emerald-400 font-mono mt-0.5">{birth}</p>
                </div>
              </div>
            </div>

            {/* Content & Timeline */}
            <div className="lg:col-span-7 space-y-6">
              {/* Quote */}
              <div className="relative p-6 rounded-2xl bg-emerald-500/5 dark:bg-emerald-500/10 border-l-4 border-emerald-500 dark:border-emerald-400">
                <Quote className="w-8 h-8 text-emerald-500/30 absolute top-3 right-3 pointer-events-none" />
                <p className="text-base sm:text-lg italic text-slate-700 dark:text-slate-200 leading-relaxed font-serif">
                  {locale === 'ar'
                    ? '«الصناعة هي عصب التقدم، والشباب المصري هو المحرك الحقيقي لأي نهضة حقيقية. استثمرنا في الإنسان والمصنع لنبني كياناً يفتخر به الوطن.»'
                    : '“Industry is the backbone of human progress, and Egyptian talent is the true catalyst of national resurgence. We have invested in people and manufacturing to build a powerhouse Egypt can take pride in.”'}
                </p>
              </div>

              {/* Education & Bio */}
              <div className="space-y-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <GraduationCap className="w-6 h-6 text-emerald-500 shrink-0" />
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">
                    {education}
                  </span>
                </div>

                <p>{content}</p>
              </div>

              {/* Key Pillars of Leadership */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
                  <Building className="w-5 h-5 text-emerald-500" />
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {locale === 'ar' ? 'مجموعة شركات MRG' : 'MRG Group of Companies'}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {locale === 'ar'
                      ? 'مؤسس ورئيس مجلس إدارة المجموعة بقطاعاتها الصناعية والزراعية والتجارية والتدريبية والرياضية.'
                      : 'Founder & Board Chairman across industrial, commercial, training, and sports sectors.'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-2">
                  <Heart className="w-5 h-5 text-rose-500" />
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {locale === 'ar' ? 'مؤسسة رمضان للتنمية الاقتصادية' : 'Ramadan Economic Foundation'}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {locale === 'ar'
                      ? 'مؤسسة تنموية خيرية تهدف للتمكين الاقتصادي وتأهيل الشباب والأسر المصرية.'
                      : 'Non-profit foundation dedicated to economic empowerment, youth training, and community development.'}
                  </p>
                </div>
              </div>

              {/* Affiliations */}
              <div className="pt-4 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {locale === 'ar' ? 'العضويات والمناصب المهنية الرسمية' : 'Key Affiliations & Memberships'}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
