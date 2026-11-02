import { setRequestLocale } from 'next-intl/server';
import { getCompaniesFromDirectSql } from '@/lib/queries';
import { HeroSection } from '@/components/HeroSection';
import { CompanyShowcaseSlider } from '@/components/CompanyShowcaseSlider';
import { CompaniesFilterSection } from '@/components/CompaniesFilterSection';
import { ChairmanPreviewSection } from '@/components/ChairmanPreviewSection';
import { MagazineSection } from '@/components/MagazineSection';
import { ContactForm } from '@/components/ContactForm';
import { Link } from '@/i18n/routing';
import { ShieldCheck, Factory, Award, ArrowRight, ArrowLeft, Sparkles, Building2 } from 'lucide-react';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Direct SQL Query execution without ORM:
  const companies = await getCompaniesFromDirectSql();
  const isRtl = locale === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div className="space-y-0">

      {/* 1. Full-screen Interactive Company Showcase Slider (Opens immediately) */}
      <CompanyShowcaseSlider companies={companies} />

      <HeroSection />


      {/* 2. Group Identity & Live Stats Section */}



      {/* 3. About MRG Quick Introduction */}
      <section className="py-20 bg-white dark:bg-[#060b13] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                <Building2 className="w-3.5 h-3.5" />
                <span>{locale === 'ar' ? 'عن مجموعة MRG' : 'About MRG Group'}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                {locale === 'ar'
                  ? 'صناعة مصرية بمعايير عالمية تدعم الاقتصاد الوطني'
                  : "Egyptian Manufacturing with Global Benchmarks"}
              </h2>

              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {locale === 'ar'
                  ? 'تأسست مجموعة محمود رمضان (MRG) لتكون ركيزة صناعية واقتصادية تساهم في توطين الصناعات الحيوية، بدءاً من أول مصنع لألياف البوليستر وشرائط التحزيم من البلاستيك المعاد تدويره في الشرق الأوسط (السويس)، وصولاً إلى خطوط شيت PET والتغليف الذكي (بيور بلاست) والأنظمة الأمنية الحديثة.'
                  : 'Mahmoud Ramadan Group (MRG) was founded as a cornerstone industrial conglomerate pioneering critical sectors, from the Middle East’s first recycled polyester staple fiber facility in Suez, to advanced thermoformed PET packaging (Pure Plast), and smart enterprise security systems.'}
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800">
                  <Factory className="w-6 h-6 text-emerald-500 mb-2" />
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {locale === 'ar' ? 'مصانع استراتيجية' : 'Strategic Plants'}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {locale === 'ar' ? 'في عتاقة بالسويس ومدينة بدر' : 'In Suez Ataqa & Badr City'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800">
                  <Award className="w-6 h-6 text-emerald-500 mb-2" />
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {locale === 'ar' ? 'جودة معتمدة' : 'Certified Quality'}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {locale === 'ar' ? 'مطابقة للمواصفات القياسية الدولية' : 'Meeting International Standards'}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
                >
                  <span>{locale === 'ar' ? 'تعرف على قصة نجاح المجموعة ورؤيتها' : 'Discover Our Legacy and Vision'}</span>
                  <ArrowIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Strategic Pillars Card */}
            <div className="lg:col-span-6 space-y-4">
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-5">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {locale === 'ar' ? 'الركائز الاستراتيجية لمجموعة MRG' : 'MRG Strategic Pillars'}
                </h3>

                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 font-bold flex items-center justify-center text-xs">
                      01
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">
                        {locale === 'ar' ? 'الاقتصاد الدائري وإعادة التدوير' : 'Circular Economy & Recycling'}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {locale === 'ar'
                          ? 'تحويل المخلفات البلاستيكية إلى ألياف بوليستر صناعية تصديرية وشرائط تحزيم عالية المتانة.'
                          : 'Transforming plastic waste into export-grade polyester staple fiber and strapping.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 font-bold flex items-center justify-center text-xs">
                      02
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">
                        {locale === 'ar' ? 'الأنظمة الأمنية والشاشات التفاعلية' : 'Security Systems & Smart Signage'}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {locale === 'ar'
                          ? 'تأمين المنشآت الحيوية بأحدث كاميرات IP وبوابات التحكم والشاشات التفاعلية اللمسية.'
                          : 'Securing enterprise venues with advanced IP surveillance, biometric control, and digital kiosks.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 font-bold flex items-center justify-center text-xs">
                      03
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">
                        {locale === 'ar' ? 'الاستثمار في الكفاءات والرياضة' : 'Human Capital & Sports Investment'}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {locale === 'ar'
                          ? 'أكاديميات رياضية حديثة (مران)، برامج تدريب مهني معتمدة (I Talent)، ومؤتمرات طبية دولية (ITC).'
                          : 'State-of-the-art sports academies (Mran), corporate training (I-Talent), and medical events (ITC).'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Filterable Companies Section */}
      <CompaniesFilterSection companies={companies} />

      {/* 5. Chairman Preview Showcase */}
      <ChairmanPreviewSection />

      {/* 6. Magazine & Publications Showcase */}
      <MagazineSection />

      {/* 7. Quick Contact CTA Section */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{locale === 'ar' ? 'تواصل وشراكات' : 'Get In Touch'}</span>
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                {locale === 'ar'
                  ? 'هل ترغب في بدء شراكة استثمارية أو تجارية مع مجموعة MRG؟'
                  : 'Interested in partnering with MRG Group?'}
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {locale === 'ar'
                  ? 'فريقنا الاستثماري والتجاري على أتم الاستعداد لمناقشة فرص التوريد، التوزيع، والشراكات الصناعية الكبرى.'
                  : 'Our commercial and investment executives are ready to explore supply agreements, distribution agencies, and joint ventures.'}
              </p>

              <div className="pt-2 space-y-2.5 text-xs text-slate-300">
                <p className="flex items-start gap-2">
                  <span className="shrink-0">📍</span>
                  <span className="leading-relaxed">
                    {locale === 'ar'
                      ? 'المقر الرئيسي: 82 شارع مكرم عبيد، أمام مسجد الإيمان، مدينة نصر، القاهرة، مصر'
                      : 'Corporate Headquarters: 82 Makram Ebeid St., in front of Al-Eman Mosque, Nasr City, Cairo, Egypt'}
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="shrink-0">✉️</span>
                  <a
                    href="mailto:contact@mrgeg.com"
                    className="hover:text-emerald-400 text-slate-300 transition-colors"
                  >
                    contact@mrgeg.com
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <span className="shrink-0">📞</span>
                  <a
                    href="tel:+20223494194"
                    dir="ltr"
                    className="hover:text-emerald-400 text-slate-300 font-mono transition-colors"
                  >
                    +20 (2) 2349 4194
                  </a>
                  <span className="text-slate-400 font-mono text-[11px]">
                    ({locale === 'ar' ? 'أو' : 'or'} 02 2349 4194)
                  </span>
                </p>
                <p className="flex items-start gap-2 text-slate-400">
                  <span className="shrink-0">🕒</span>
                  <span>
                    {locale === 'ar'
                      ? 'مواعيد العمل: السبت إلى الخميس: 10:00 ص – 6:00 م | الجمعة: مغلق'
                      : 'Business Hours: Saturday to Thursday: 10:00 AM – 6:00 PM | Friday: Closed'}
                  </span>
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
