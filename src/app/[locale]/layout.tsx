import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { routing } from '@/i18n/routing';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const isAr = locale === 'ar';
  return {
    title: isAr
      ? 'مجموعة MRG | مجموعة محمود رمضان - صرح اقتصادي مصري رائد'
      : 'MRG Group | Mahmoud Ramadan Group - Leading Egyptian Powerhouse',
    description: isAr
      ? 'مجموعة محمود رمضان (MRG) - كبرى المصانع الاستراتيجية في ألياف البوليستر، الشيت والبلاستيك، أنظمة المراقبة والتيار الخفيف، واستيراد خامات الدعاية والإعلان.'
      : 'Mahmoud Ramadan Group (MRG) - Strategic manufacturing in polyester fibers, PET sheets, security systems, commercial agencies, and human capital.',
    icons: {
      icon: '/uploads/2024/12/cropped-اللوجو-copy-2-150x150.png',
      apple: '/uploads/2024/12/cropped-اللوجو-copy-2-300x262.png',
    },
    openGraph: {
      title: isAr ? 'مجموعة MRG الاقتصادية' : 'MRG Economic Group',
      description: isAr
        ? 'ريادة مصرية.. واستثمار يصنع المستقبل'
        : 'Egyptian Leadership, Building the Future',
      images: ['/uploads/2024/12/cropped-اللوجو-copy-2.png'],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={locale === 'ar' ? 'font-arabic' : 'font-latin'}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider locale={locale} messages={messages}>
            <div className="flex flex-col min-h-screen selection:bg-emerald-600 selection:text-white">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
