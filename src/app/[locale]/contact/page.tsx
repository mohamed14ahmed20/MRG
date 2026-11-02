import { setRequestLocale } from 'next-intl/server';
import { ContactForm } from '@/components/ContactForm';
import { MapPin, Mail, Phone, Clock, MessageSquare, ShieldCheck, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';
  return {
    title: isAr ? 'اتصل بنا | مجموعة MRG' : 'Contact Us | MRG Group',
    description: isAr
      ? 'تواصل مع الإدارة العامة لمجموعة محمود رمضان (MRG) لمناقشة فرص التوريد والاستثمار والشراكات التجارية.'
      : 'Get in touch with Mahmoud Ramadan Group (MRG) for procurement, distribution agencies, and investment partnerships.',
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="pt-28 pb-20 bg-slate-50/50 dark:bg-[#060b13]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{locale === 'ar' ? 'قنوات الاتصال المباشرة' : 'Direct Channels'}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {locale === 'ar' ? 'تواصل مع مجموعة MRG' : 'Contact MRG Group'}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
            {locale === 'ar'
              ? 'يسعدنا دائماً استقبال استفساراتكم ومناقشة أوجه التعاون التجاري والصناعي'
              : 'We welcome your inquiries and look forward to discussing commercial and industrial partnerships'}
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Info cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-lg space-y-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {locale === 'ar' ? 'معلومات المقر الرئيسي' : 'Headquarters Information'}
              </h3>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500 shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">
                      {locale === 'ar' ? 'المقر الإداري الرئيسي' : 'Corporate Headquarters'}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                      {locale === 'ar'
                        ? '82 شارع مكرم عبيد، أمام مسجد الإيمان، مدينة نصر، القاهرة، مصر'
                        : '82 Makram Ebeid St., in front of Al-Eman Mosque, Nasr City, Cairo, Egypt'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500 shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">
                      {locale === 'ar' ? 'البريد الإلكتروني' : 'Official Email'}
                    </h4>
                    <a
                      href="mailto:contact@mrgeg.com"
                      className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline mt-0.5 block font-medium"
                    >
                      contact@mrgeg.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500 shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">
                      {locale === 'ar' ? 'الهاتف المباشر' : 'Direct Line'}
                    </h4>
                    <div className="mt-0.5 flex flex-wrap items-center gap-1.5">
                      <a
                        href="tel:+20223494194"
                        dir="ltr"
                        className="text-xs text-slate-700 dark:text-slate-300 font-mono hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                      >
                        +20 (2) 2349 4194
                      </a>
                      <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">
                        ({locale === 'ar' ? 'أو' : 'or'} 02 2349 4194)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500 shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">
                      {locale === 'ar' ? 'مواعيد العمل' : 'Business Hours'}
                    </h4>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 space-y-0.5">
                      <p>
                        {locale === 'ar'
                          ? 'السبت إلى الخميس: 10:00 ص – 6:00 م'
                          : 'Saturday to Thursday: 10:00 AM – 6:00 PM'}
                      </p>
                      <p className="text-slate-400 dark:text-slate-500">
                        {locale === 'ar' ? 'الجمعة: مغلق' : 'Friday: Closed'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Call Action Button */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                <a
                  href="tel:+20223494194"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-2xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>{locale === 'ar' ? 'اتصال مباشر: 23494194 (02)' : 'Call Direct: +20 (2) 2349 4194'}</span>
                </a>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{locale === 'ar' ? 'التزامنا بالاستجابة السريعة' : 'Prompt Response Commitment'}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {locale === 'ar'
                  ? 'يحرص فريق العلاقات المؤسسية والتعاقدات التجارية على الرد على كافة الاستفسارات والمراسلات خلال 24 ساعة عمل.'
                  : 'Our corporate relations and commercial procurement team is dedicated to responding to all inquiries within 24 business hours.'}
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
