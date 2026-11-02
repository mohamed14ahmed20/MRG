import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import {
  Building2,
  Eye,
  Target,
  Sparkles,
  Award,
  Recycle,
  Shield,
  Users,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Factory,
  Globe2
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
      ? 'عن مجموعة MRG | الريادة في الصناعة والاستثمار الاقتصادي'
      : 'About MRG Group | Pioneers in Manufacturing & Economic Investment',
    description: isAr
      ? 'تعرف على قصة تأسيس مجموعة محمود رمضان (MRG)، رؤيتنا، رسالتنا، ومصانعنا الاستراتيجية في مصر.'
      : 'Discover the story behind Mahmoud Ramadan Group (MRG), our vision, mission, and industrial footprint.',
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isRtl = locale === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const values = [
    {
      icon: Award,
      title: locale === 'ar' ? 'الجودة والتميز' : 'Excellence & Quality',
      desc: locale === 'ar'
        ? 'الالتزام بأدق المعايير والمواصفات القياسية العالمية في كافة خطوط الإنتاج والخدمات.'
        : 'Adhering to strict international standards across every production line and service output.',
    },
    {
      icon: Recycle,
      title: locale === 'ar' ? 'الاستدامة والاقتصاد الدائري' : 'Sustainability & Circular Economy',
      desc: locale === 'ar'
        ? 'ريادة في إعادة تدوير عبوات البلاستيك وتحويلها إلى ألياف بوليستر وشرائط تحزيم تصديرية.'
        : 'Pioneering bottle recycling to produce high-grade polyester staple fiber and strapping tape.',
    },
    {
      icon: Shield,
      title: locale === 'ar' ? 'النزاهة والمسؤولية' : 'Integrity & Responsibility',
      desc: locale === 'ar'
        ? 'بناء علاقات طويلة الأمد مع شركائنا وعملائنا قائمة على الشفافية والوفاء بالتعهدات.'
        : 'Forging long-term partnerships founded on transparency, mutual respect, and accountability.',
    },
    {
      icon: Users,
      title: locale === 'ar' ? 'الاستثمار في الكادر البشري' : 'Human Capital Development',
      desc: locale === 'ar'
        ? 'تمكين الشباب المصري وتطوير المهارات عبر برامج التدريب المهني والأكاديميات الرياضية.'
        : 'Empowering Egyptian youth through accredited vocational training and athletic academies.',
    },
  ];

  return (
    <div className="pt-28 pb-20 bg-slate-50/50 dark:bg-[#060b13]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
            <Building2 className="w-3.5 h-3.5" />
            <span>{locale === 'ar' ? 'تاريخ وريادة' : 'Our Legacy & Foundation'}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {locale === 'ar' ? 'عن مجموعة MRG' : 'About MRG Group'}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            {locale === 'ar'
              ? 'مجموعة شركات مصرية اقتصادية رائدة تبني صروح الصناعة وتستثمر في المستقبل'
              : 'A leading Egyptian economic conglomerate building strategic industry and investing in the future'}
          </p>
        </div>

        {/* Narrative & History */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            {locale === 'ar' ? 'مسيرة ريادة تمتد لأكثر من 25 عاماً' : 'Over 25 Years of Industrial Excellence'}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            <p>
              {locale === 'ar'
                ? 'انطلقت مجموعة محمود رمضان (MRG) برؤية وطنية طموحة تهدف إلى المساهمة الفاعلة في نهضة الصناعة المصرية وتوطين التكنولوجيا المتقدمة. على مدار أكثر من ربع قرن، نمت المجموعة لتتحول من بداياتها في التجارة والتوكيلات إلى صرح صناعي متكامل يضم مصانع استراتيجية ومؤسسات خدمية وتدريبية.'
                : 'Mahmoud Ramadan Group (MRG) embarked with an ambitious vision to actively advance Egyptian industry and localize state-of-the-art manufacturing technologies. Over a quarter century, MRG has evolved from commercial agencies into a diversified industrial powerhouse operating major production plants.'}
            </p>
            <p>
              {locale === 'ar'
                ? 'ومن أبرز معالم المجموعة مصنع السويس لألياف البوليستر، أول مصنع في الشرق الأوسط متخصص في إنتاج ألياف البوليستر من تدوير عبوات البلاستيك، ومصنع بيور بلاست لإنتاج شيت PET ومواد التعبئة والتغليف، إلى جانب شركات الأنظمة الأمنية والدعاية والإعلام والتدريب والاستثمار الرياضي.'
                : 'Notable flagships include Suez Polyester Fibers—the Middle East’s first plant specialized in producing polyester staple fiber from recycled plastic—and Pure Plast for PET sheets and thermoformed packaging, alongside security systems, advertising raw materials, publishing, and sports investments.'}
            </p>
          </div>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-panel p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 glow-card">
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 text-emerald-500 inline-block">
              <Eye className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              {locale === 'ar' ? 'رؤيتنا' : 'Our Vision'}
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {locale === 'ar'
                ? 'أن نكون الصرح الصناعي والاستثماري الأكثر موثوقية وتأثيراً في مصر والشرق الأوسط، وأن نقود التحول نحو الصناعات الخضراء وحلول التكنولوجيا الذكية بأعلى كفاءة تشغيلية.'
                : 'To stand as the most trusted and influential industrial and investment powerhouse across Egypt and the Middle East, leading green manufacturing and smart technology solutions.'}
            </p>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 glow-card">
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 text-emerald-500 inline-block">
              <Target className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              {locale === 'ar' ? 'رسالتنا' : 'Our Mission'}
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {locale === 'ar'
                ? 'توفير منتجات صناعية وحلول تقنية فائقة الجودة تدعم سلاسل الإمداد الوطنية وتفتح آفاق التصدير، مع الالتزام الراسخ بالمسؤولية المجتمعية والتمكين الاقتصادي للأجيال الصاعدة.'
                : 'Delivering exceptional industrial products and technology solutions that reinforce national supply chains and export markets, while upholding corporate social responsibility.'}
            </p>
          </div>
        </div>

        {/* Core Values Grid */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {locale === 'ar' ? 'قيمنا المؤسسية الراسخة' : 'Our Core Corporate Values'}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {locale === 'ar' ? 'المبادئ التي تقود كل قرار واستثمار في مجموعة MRG' : 'Guiding principles steering every decision and initiative at MRG'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={i}
                  className="glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 space-y-3 glow-card"
                >
                  <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 inline-block">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    {v.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA to Companies & Contact */}
        <div className="p-10 rounded-3xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-center space-y-6 shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-extrabold">
            {locale === 'ar' ? 'استكشف شركات ومصانع مجموعة MRG' : 'Explore MRG Group Companies & Plants'}
          </h3>
          <p className="max-w-2xl mx-auto text-emerald-100 text-sm sm:text-base">
            {locale === 'ar'
              ? 'تعرف على تفاصيل كل شركة وخطوط إنتاجها وإمكانياتها التكنولوجية والتجارية.'
              : 'Discover individual entity capabilities, production lines, and commercial partnerships.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/#companies"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold bg-white text-slate-900 hover:bg-slate-100 shadow-md transition-all"
            >
              <span>{locale === 'ar' ? 'عرض كافة الشركات' : 'View All Companies'}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold border border-white/40 hover:bg-white/10 text-white transition-all"
            >
              <span>{locale === 'ar' ? 'تواصل معنا' : 'Contact Us'}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
