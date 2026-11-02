import Link from 'next/link';

export default function NotFound() {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen flex items-center justify-center bg-slate-950 text-white p-4 font-sans">
        <div className="text-center space-y-6 max-w-md">
          <div className="text-7xl font-extrabold text-emerald-500">404</div>
          <h1 className="text-2xl font-bold">الصفحة غير موجودة | Page Not Found</h1>
          <p className="text-sm text-slate-400">
            الصفحة التي تحاول الوصول إليها غير متوفرة أو تم نقلها.
          </p>
          <div className="pt-2">
            <Link
              href="/ar"
              className="inline-block px-6 py-3 rounded-full text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
            >
              العودة للرئيسية (Home)
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
