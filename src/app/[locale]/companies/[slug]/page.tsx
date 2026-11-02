import { notFound } from 'next/navigation';
import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';
import { getCompaniesFromDirectSql, getCompanyBySlugDirectSql } from '@/lib/queries';
import { Link } from '@/i18n/routing';
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Calendar,
  CheckCircle2,
  Building2,
  Mail,
  Phone,
  ShieldCheck,
  Send
} from 'lucide-react';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const companies = await getCompaniesFromDirectSql();
  const params: { locale: string; slug: string }[] = [];
  for (const c of companies) {
    params.push({ locale: 'ar', slug: c.slug });
    params.push({ locale: 'en', slug: c.slug });
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const company = await getCompanyBySlugDirectSql(slug);

  if (!company) {
    return { title: 'Company Not Found | MRG Group' };
  }

  const name = locale === 'ar' ? company.name.ar : company.name.en;
  const desc = locale === 'ar' ? company.shortDesc.ar : company.shortDesc.en;

  return {
    title: `${name} | مجموعة MRG`,
    description: desc,
    openGraph: {
      title: `${name} | MRG Group`,
      description: desc,
      images: [company.image],
    },
  };
}

export default async function CompanyDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const company = await getCompanyBySlugDirectSql(slug);
  if (!company) {
    notFound();
  }

  const isRtl = locale === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const BackArrow = isRtl ? ArrowRight : ArrowLeft;

  const name = locale === 'ar' ? company.name.ar : company.name.en;
  const sectorName = locale === 'ar' ? company.sectorName.ar : company.sectorName.en;
  const location = locale === 'ar' ? company.location.ar : company.location.en;
  const features = locale === 'ar' ? company.features.ar : company.features.en;
  const fullDesc = locale === 'ar' ? company.fullDesc.ar : company.fullDesc.en;

  return (
    <div className="pt-28 pb-20 bg-slate-50/50 dark:bg-[#060b13]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back Link */}
        <div>
          <Link
            href="/#companies"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-emerald-500 transition-colors"
          >
            <BackArrow className="w-4 h-4" />
            <span>{locale === 'ar' ? 'العودة لشركات المجموعة' : 'Back to Companies'}</span>
          </Link>
        </div>

        {/* Hero Banner for Company */}
        <div className="relative rounded-3xl overflow-hidden glass-panel border border-slate-200 dark:border-slate-800 shadow-xl">
          <div className="relative h-72 sm:h-96 w-full bg-slate-900">
            <Image
              src={company.image}
              alt={name}
              fill
              className="object-cover opacity-85"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

            <div className="absolute top-6 left-6 right-6 flex flex-wrap items-center justify-between gap-3">
              <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-emerald-600 text-white shadow backdrop-blur-md">
                {sectorName}
              </span>

              {company.established && (
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono bg-black/60 text-white backdrop-blur-md border border-white/10">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{locale === 'ar' ? `تأسست: ${company.established}` : `Est. ${company.established}`}</span>
                </span>
              )}
            </div>

            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
                <Building2 className="w-4 h-4" />
                <span>{locale === 'ar' ? 'إحدى شركات مجموعة محمود رمضان (MRG)' : 'An MRG Group Subsidiary'}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                {name}
              </h1>
              <div className="flex items-center gap-1.5 text-xs text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>{location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content & Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Description */}
          <div className="lg:col-span-8 space-y-8">
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {locale === 'ar' ? 'نظرة عامة والأنشطة التشغيلية' : 'Operational Overview & Capabilities'}
              </h2>

              <div className="text-base text-slate-600 dark:text-slate-300 leading-relaxed space-y-4">
                <p>{fullDesc}</p>
              </div>

              {/* Key Features */}
              {features && features.length > 0 && (
                <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {locale === 'ar' ? 'المزايا التنافسية والقيم المضافة' : 'Key Competitive Advantages'}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {features.map((feat, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar CTA & Contact */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 space-y-5">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {locale === 'ar' ? 'طلب عرض أسعار أو تعاون' : 'Request Quote / Inquire'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {locale === 'ar'
                  ? 'يمكنك التواصل مباشرة مع إدارة المبيعات والتعاقدات لتلبية طلبات التوريد والكميات.'
                  : 'Contact our procurement and sales division for specifications, supply contracts, and orders.'}
              </p>

              <div className="space-y-3 pt-2 text-xs">
                <a
                  href="mailto:contact@mrgeg.com"
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 transition-colors group"
                >
                  <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    contact@mrgeg.com
                  </span>
                </a>
                <a
                  href="tel:+20223494194"
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 transition-colors group"
                >
                  <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span dir="ltr" className="text-slate-700 dark:text-slate-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors font-mono">
                    +20 (2) 2349 4194
                  </span>
                </a>
              </div>

              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-md"
              >
                <span>{locale === 'ar' ? 'تواصل معنا الآن' : 'Contact Us Directly'}</span>
                <Send className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-5 rounded-3xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 text-emerald-800 dark:text-emerald-300 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>{locale === 'ar' ? 'ضمان الجودة والأصالة' : 'Quality Assurance'}</span>
              </div>
              <p className="leading-relaxed">
                {locale === 'ar'
                  ? 'كافة منتجات وخدمات الكيان تخضع لإشراف ومتابعة معايير الجودة الصارمة لمجموعة محمود رمضان (MRG).'
                  : 'All products and services operate under the strict corporate governance and quality benchmarks of MRG Group.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
