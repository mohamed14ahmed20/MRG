import { queryDirectSql } from './db';

export interface Company {
  id: number;
  slug: string;
  name: { ar: string; en: string };
  sector: 'industrial' | 'securityTech' | 'advertisingMedia' | 'trading' | 'developmentSports';
  sectorName: { ar: string; en: string };
  shortDesc: { ar: string; en: string };
  fullDesc: { ar: string; en: string };
  image: string;
  logo?: string;
  website?: string;
  location: { ar: string; en: string };
  established?: string;
  features: { ar: string[]; en: string[] };
}

// Company Metadata dictionary that complements raw SQL content with bilingual titles, sectors, and verified images
const COMPANY_ENRICHMENTS: Record<number, {
  slug: string;
  nameEn: string;
  sector: Company['sector'];
  sectorName: { ar: string; en: string };
  shortDescAr: string;
  shortDescEn: string;
  fullDescEn: string;
  image: string;
  logo?: string;
  website?: string;
  location: { ar: string; en: string };
  established?: string;
  featuresAr: string[];
  featuresEn: string[];
}> = {
  388: {
    slug: 'suez-polyester-fibers',
    nameEn: 'Suez Polyester Fibers Factory',
    sector: 'industrial',
    sectorName: { ar: 'الصناعة والإنتاج', en: 'Industry & Manufacturing' },
    shortDescAr: 'أول مصنع في الشرق الأوسط متخصص في إنتاج ألياف البوليستر وشرائط التحزيم من مواد معاد تدويرها.',
    shortDescEn: 'The first specialized plant in the Middle East producing polyester staple fiber & PET strapping tapes from recycled bottles.',
    fullDescEn: 'Founded in 2009 in the Ataqa Industrial Zone, Suez, Suez Polyester Fibers is a pioneer in sustainable circular manufacturing in the Middle East. It processes recycled plastic bottles into premium polyester staple fibers and durable packaging strapping bands.',
    image: '/uploads/2024/12/repreve-unifi-recycled-polyester-factory-tour.jpg',
    logo: '/logos/suez-polyester-fibers.png',
    location: { ar: 'المنطقة الصناعية بعتاقة، السويس', en: 'Ataqa Industrial Zone, Suez' },
    established: '2009',
    featuresAr: ['طاقة إنتاجية ضخمة تلبي الأسواق الإقليمية', 'دعم الاقتصاد الأخضر وتدوير العبوات البلاستيكية', 'معايير جودة ومواصفات قياسية عالمية'],
    featuresEn: ['Massive production capacity serving regional markets', 'Green economy pioneer in PET recycling', 'Certified global industrial standards']
  },
  384: {
    slug: 'pure-plast',
    nameEn: 'Pure Plast Factory',
    sector: 'industrial',
    sectorName: { ar: 'الصناعة والإنتاج', en: 'Industry & Manufacturing' },
    shortDescAr: 'أحد رواد صناعة شيت PET ومواد التعبئة والتغليف الدوائي والغذائي برؤية مصرية تركية مشتركة.',
    shortDescEn: 'A leading producer of PET sheets and high-precision thermoformed food & pharmaceutical packaging.',
    fullDescEn: 'Established as an Egyptian-Turkish joint venture, Pure Plast utilizes state-of-the-art extrusion and thermoforming machinery to produce hygienic, heavy-duty PET sheets and innovative food and industrial packaging containers.',
    image: '/uploads/2025/01/WhatsApp-Image-2024-04-29-at-15.23.59_18baea5d.jpg',
    logo: '/logos/pure-plast-logo.png',
    website: 'https://pureplast.net/',
    location: { ar: 'المنطقة الصناعية، مصر', en: 'Industrial Zone, Egypt' },
    featuresAr: ['أحدث تقنيات التشكيل الحراري للبلاستيك', 'تغليف آمن متوافق مع الاشتراطات الصحية الغذائية والدوائية', 'حلول مخصصة لكبرى مصانع الأغذية والتجزئة'],
    featuresEn: ['Advanced thermoforming & sheet extrusion technology', 'Food-grade certified packaging solutions', 'Custom packaging for enterprise retailers & food brands']
  },
  390: {
    slug: 'sus-security-systems',
    nameEn: 'SUS Security Systems',
    sector: 'securityTech',
    sectorName: { ar: 'التكنولوجيا والأنظمة', en: 'Technology & Security Systems' },
    shortDescAr: 'رواد أنظمة التيار الخفيف والمراقبة الذكية وحلول التحكم بالدخول والإنذار منذ أكثر من عقد.',
    shortDescEn: 'Comprehensive smart surveillance, biometric access control, fire alarms, and light current solutions.',
    fullDescEn: 'With over 10 years of field excellence, SUS Security supplies and implements turn-key security systems, CCTV surveillance, video intercoms, biometric time-attendance, and smart integrated management systems for corporations and mega-projects.',
    image: '/uploads/2024/12/Integrated-Security-Management-Systems-ISMS-shutterstock_146057678.jpg',
    logo: '/logos/sus-security-systems.png',
    location: { ar: 'القاهرة، جمهورية مصر العربية', en: 'Cairo, Egypt' },
    featuresAr: ['شبكات كاميرات مراقبة رقمية IP فائقة الدقة', 'بوابات دخول ذكية وأنظمة حضور وانصراف بيومترية', 'عقود صيانة معتمدة ودعم فني على مدار الساعة'],
    featuresEn: ['Ultra-HD IP surveillance network infrastructure', 'Smart access turnstiles and biometric attendance', '24/7 technical support and SLA maintenance']
  },
  396: {
    slug: 'mixmax-interactive-screens',
    nameEn: 'MixMax Interactive Screens',
    sector: 'securityTech',
    sectorName: { ar: 'التكنولوجيا والأنظمة', en: 'Technology & Security Systems' },
    shortDescAr: 'شاشات عرض تفاعلية ذكية وأكشاك لمسية مصممة لأحدث حلول الدعاية والمؤتمرات.',
    shortDescEn: 'Pioneering smart touch displays, interactive kiosks, and digital signage boards for retail & corporate events.',
    fullDescEn: 'MixMax provides intelligent touchscreens and digital kiosks tailored for public venues, enterprise meeting spaces, educational hubs, and advertising exhibitions with high brightness and seamless multi-touch response.',
    image: '/uploads/2024/12/images-1.jpg',
    logo: '/logos/mixmax-interactive-screens.png',
    location: { ar: 'القاهرة، جمهورية مصر العربية', en: 'Cairo, Egypt' },
    featuresAr: ['شاشات لمسية تفاعلية متعددة النقاط 4K', 'أكشاك معلومات رقمية Kiosks للمؤسسات والبنوك', 'برمجيات إدارة المحتوى الإعلاني عن بُعد'],
    featuresEn: ['Multi-touch 4K ultra-responsive interactive displays', 'Custom self-service digital kiosks', 'Cloud-managed digital signage software']
  },
  394: {
    slug: 'fox-sign',
    nameEn: 'Fox Sign for Advertising Materials',
    sector: 'advertisingMedia',
    sectorName: { ar: 'الدعاية والنشر والإعلام', en: 'Advertising & Media' },
    shortDescAr: 'أبرز مستوردي وموزعي خامات الدعاية والإعلان والطباعة الرقمية واللافتات في مصر والشرق الأوسط.',
    shortDescEn: 'Premier importer and distributor of digital printing media, banner, flex, vinyl, and acrylic signage materials.',
    fullDescEn: 'Fox Sign is a market leader across Egypt and the Middle East in supplying raw advertising substrates, acrylic sheets, ACP composite panels, PVC foam boards, self-adhesive vinyl, and LED lighting modules for modern signage.',
    image: '/uploads/2024/12/405939716_787874746685810_4023399380978356763_n.jpg',
    logo: '/logos/fox-sign.png',
    location: { ar: 'القاهرة الكبرى، مصر', en: 'Greater Cairo, Egypt' },
    featuresAr: ['أجود خامات البنر والفليكس والفينيل والكلادينج', 'مخزون استراتيجي ضخم وتوزيع لكافة محافظات الجمهورية', 'حلول متكاملة لشركات ووكالات الدعاية والإعلان'],
    featuresEn: ['Top-grade banner, flex, vinyl, and aluminum composite panels', 'Extensive warehouse capacity with nationwide delivery', 'Integrated solutions for advertising & signage agencies']
  },
  272: {
    slug: 'tafra-publishing',
    nameEn: 'Tafra Publishing & Distribution',
    sector: 'advertisingMedia',
    sectorName: { ar: 'الدعاية والنشر والإعلام', en: 'Advertising & Media' },
    shortDescAr: 'دار نشر وتوزيع رائدة، عضو اتحاد الناشرين المصريين والعرب، ترعى الإبداع الثقافي والأدبي.',
    shortDescEn: 'Distinguished publishing house, member of Egyptian & Arab Publishers Associations, championing intellectual creativity.',
    fullDescEn: 'Tafra Publishing & Distribution believes deeply in Arab youth talents and intellectual empowerment. As an accredited member of Egyptian and Arab Publishers Associations, Tafra publishes influential books, academic literature, and cultural works.',
    image: '/uploads/2024/12/424605107_840830498057258_3839894594467642151_n.png',
    logo: '/uploads/2024/12/طفرة-copy1.png',
    website: 'https://www.tafrabooks.com/home',
    location: { ar: 'القاهرة، جمهورية مصر العربية', en: 'Cairo, Egypt' },
    featuresAr: ['عضو رسمي باتحاد الناشرين المصريين واتحاد الناشرين العرب', 'مشاركة سنوية في معارض الكتاب الدولية (القاهرة، الرياض، الشارقة)', 'طباعة فاخرة وتوزيع واسع للمؤلفات الأدبية والفكرية'],
    featuresEn: ['Official member of Egyptian & Arab Publishers Associations', 'Annual participation in premier international book fairs', 'Premium printing and broad regional book distribution']
  },
  434: {
    slug: 'medical-news',
    nameEn: 'Medical News Platform (Akhbar Al-Teb)',
    sector: 'advertisingMedia',
    sectorName: { ar: 'الدعاية والنشر والإعلام', en: 'Advertising & Media' },
    shortDescAr: 'منصة إعلامية طبية موثوقة تأسست عام 2018 بمشاركة نخبة من كبار الأطباء والأساتذة.',
    shortDescEn: 'Authoritative health and medical journalism platform founded in 2018 featuring renowned medical professors and consultants.',
    fullDescEn: 'Founded in 2018, Medical News (أخبار الطب) provides trusted, peer-reviewed healthcare journalism, public health awareness campaigns, and specialized medical columns authored by elite Egyptian and international physicians.',
    image: '/uploads/2025/05/477891416_1138026484710674_6313803683110490153_n.jpg',
    logo: '/logos/medical-news.png',
    location: { ar: 'القاهرة، مصر', en: 'Cairo, Egypt' },
    established: '2018',
    featuresAr: ['مقالات ومحتوى طبي مراجع علمياً', 'تغطيات حصرية للمؤتمرات والابتكارات الجراحية', 'أكثر من 500,000 قارئ ومتابع شهرياً'],
    featuresEn: ['Scientifically validated healthcare articles', 'Exclusive coverage of medical congresses and surgical innovations', 'Over 500,000 monthly readers and followers']
  },
  425: {
    slug: 'united-trading-agencies',
    nameEn: 'United Trading & Agencies Co.',
    sector: 'trading',
    sectorName: { ar: 'التجارة والتوكيلات', en: 'Commercial Agencies & Trading' },
    shortDescAr: 'أكثر من 25 عاماً من الريادة في تجارة البطاريات الجافة والتيار الخفيف والتوكيلات العالمية.',
    shortDescEn: 'Over 25 years of excellence in dry cell batteries, light current equipment, and exclusive commercial agencies.',
    fullDescEn: 'Founded more than 25 years ago, United Trading & Agencies is an Egyptian corporate pillar distributing premium dry batteries (Panasonic, Energizer, Eveready), high-grade electrical components, and industrial supplies nationwide.',
    image: '/uploads/2025/05/Featured-Image-6-1044310534.png',
    logo: '/logos/united-trading-agencies.png',
    location: { ar: 'القاهرة، جمهورية مصر العربية', en: 'Cairo, Egypt' },
    featuresAr: ['وكيل معتمد وموزع رسمي لكبرى العلامات التجارية العالمية', 'شبكة توزيع ضخمة تغطي جميع محافظات مصر', 'خبرة ربع قرن في سلاسل الإمداد والتوريد التجاري'],
    featuresEn: ['Authorized distributor for premier global battery brands', 'Comprehensive logistics network spanning all Egyptian governorates', 'A quarter-century of supply chain excellence']
  },
  432: {
    slug: 'land-of-gold',
    nameEn: 'Land of Gold Jewelry',
    sector: 'trading',
    sectorName: { ar: 'التجارة والتوكيلات', en: 'Commercial Agencies & Trading' },
    shortDescAr: 'وجهة راقية في عالم المصوغات والمجوهرات والسبائك الذهبية تجمع بين الأصالة والذوق الرفيع.',
    shortDescEn: 'An elite destination for fine gold jewelry, certified bullion, and precious craftsmanship merging heritage and modern elegance.',
    fullDescEn: 'Land of Gold is a prestigious jewelry enterprise delivering timeless elegance, certified investment bullion, and bespoke gold ornaments crafted to meet highest purity standards and discerning taste.',
    image: '/uploads/2024/12/file.jpg',
    logo: '/logos/land-of-gold.png',
    location: { ar: 'القاهرة، مصر', en: 'Cairo, Egypt' },
    featuresAr: ['تصاميم مجوهرات راقية تواكب أحدث خطوط الموضة', 'سبائك وجنيهات ذهبية معتمدة للاستثمار والادخار', 'ضمان النقاء والعيار وفق المعايير الرسمية المعتمدة'],
    featuresEn: ['Exquisite jewelry designs blending timeless beauty and modern aesthetics', 'Certified investment gold bars and coins', 'Guaranteed karat purity and hallmarking']
  },
  308: {
    slug: 'mran-sports-investment',
    nameEn: 'Mran Sports Investment',
    sector: 'developmentSports',
    sectorName: { ar: 'التنمية والرياضة والمؤتمرات', en: 'Human Capital, Sports & Medical' },
    shortDescAr: 'مؤسسة متخصصة في الاستثمار الرياضي وإدارة الأكاديميات وملاعب البادل وتأهيل الناشئين.',
    shortDescEn: 'A leading sports investment enterprise operating elite athletic academies, padel tennis clubs, and youth sports development.',
    fullDescEn: 'Mran Sports Investment spearheads athletic empowerment through modern sports training academies, world-class padel courts, youth football leagues, and fitness facilities managed by accredited coaching staff.',
    image: '/uploads/2024/12/330843219_521342616580878_3529175051695746009_n.jpg',
    logo: '/logos/mran-logo-extracted.png',
    location: { ar: 'القاهرة الجديدة، مصر', en: 'New Cairo, Egypt' },
    featuresAr: ['أكاديميات تدريب ناشئين تحت إشراف كوادر رياضية معتمدة', 'ملاعب بادل وتنس حديثة ومجهزة بأعلى المواصفات', 'تنظيم بطولات ودوريات رياضية احترافية'],
    featuresEn: ['Youth training academies mentored by certified coaches', 'Modern competition-ready padel and multi-sport courts', 'Organizing professional corporate and youth tournaments']
  },
  342: {
    slug: 'italent-academy',
    nameEn: 'I-Talent Training Academy',
    sector: 'developmentSports',
    sectorName: { ar: 'التنمية والرياضة والمؤتمرات', en: 'Human Capital, Sports & Medical' },
    shortDescAr: 'مركز تدريب مهني معتمد يقدم برامج متقدمة لتأهيل الكوادر والشباب لسوق العمل المعاصر.',
    shortDescEn: 'A prominent corporate and professional training academy offering high-impact career development programs.',
    fullDescEn: 'I-Talent Academy is a hub for vocational, language, and executive education. Through practical hands-on workshops and recognized certifications, it equips students and corporate teams with market-demanded skills.',
    image: '/uploads/2024/12/467516460_501221059539357_7809861624319725805_n.jpg',
    logo: '/logos/italent-transparent.png',
    website: 'https://www.italenteg.com/ar',
    location: { ar: 'القاهرة، جمهورية مصر العربية', en: 'Cairo, Egypt' },
    featuresAr: ['شهادات مهنية معتمدة في الإدارة والتكنولوجيا واللغات', 'ورش عمل تفاعلية تلائم متطلبات الشركات والمؤسسات', 'قاعات تدريبية مجهزة بأحدث الوسائل التعليمية التفاعلية'],
    featuresEn: ['Accredited professional certifications in business, IT, and languages', 'Interactive corporate workshops tailored to industry demands', 'State-of-the-art multimedia training suites']
  },
  381: {
    slug: 'itc-medical-conferences',
    nameEn: 'ITC Medical Conferences & Events',
    sector: 'developmentSports',
    sectorName: { ar: 'التنمية والرياضة والمؤتمرات', en: 'Human Capital, Sports & Medical' },
    shortDescAr: 'تنظيم المؤتمرات الطبية والعلمية والفعاليات الكبرى بأعلى درجات الاحترافية والتنظيم اللوجستي.',
    shortDescEn: 'Expert organizer of prestigious medical, scientific, and healthcare congresses locally and internationally.',
    fullDescEn: 'ITC specializes in organizing national and international healthcare congresses, medical symposia, and academic symposiums. It manages end-to-end event production, audio-visual staging, speaker hospitality, and exhibition management.',
    image: '/uploads/2024/12/Manfaat-international-conference-adalah.jpg',
    logo: '/logos/70ef26ae-6f5a-4f2e-9083-16bfdb9ea700-removebg-preview.webp',
    website: 'https://itc-egypt.org/',
    location: { ar: 'القاهرة، مصر', en: 'Cairo, Egypt' },
    featuresAr: ['تنظيم مؤتمرات طبية دولية بمشاركة نخبة الجمعيات العلمية', 'حلول تنظيمية ولوجستية متكاملة وتقنيات بث هجين Live Streaming', 'إدارة المعارض المرافقة وتنسيق ورش العمل الجراحية والمتخصصة'],
    featuresEn: ['High-profile medical conferences co-organized with top medical societies', 'Complete logistical orchestration and hybrid live-streaming technology', 'Comprehensive medical exhibition management and workshops']
  }
};

export async function getCompaniesFromDirectSql(): Promise<Company[]> {
  const companyIds = Object.keys(COMPANY_ENRICHMENTS).map(Number);

  // Direct SQL query without ORM:
  const sql = `
    SELECT 
      p.ID,
      p.post_title,
      p.post_name,
      p.post_content
    FROM wp_posts p
    WHERE p.ID IN (${companyIds.join(',')})
    ORDER BY FIELD(p.ID, ${companyIds.join(',')})
  `;

  const rows = await queryDirectSql<any>(sql);

  const cleanHtml = (html: string) => {
    return (html || '')
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/\s+/g, ' ')
      .trim();
  };
  return rows.map(r => {
    const enrich = COMPANY_ENRICHMENTS[r.ID] || {
      slug: `company-${r.ID}`,
      nameEn: r.post_title,
      sector: 'industrial' as const,
      sectorName: { ar: 'الصناعة', en: 'Industry' },
      shortDescAr: cleanHtml(r.post_content).slice(0, 150),
      shortDescEn: cleanHtml(r.post_content).slice(0, 150),
      fullDescEn: cleanHtml(r.post_content),
      image: '/uploads/2024/12/default.png',
      location: { ar: 'القاهرة، مصر', en: 'Cairo, Egypt' },
      featuresAr: [],
      featuresEn: []
    };

    const arContent = cleanHtml(r.post_content);

    return {
      id: r.ID,
      slug: enrich.slug,
      name: {
        ar: r.post_title,
        en: enrich.nameEn
      },
      sector: enrich.sector,
      sectorName: enrich.sectorName,
      shortDesc: {
        ar: enrich.shortDescAr || arContent.slice(0, 160) + '...',
        en: enrich.shortDescEn
      },
      fullDesc: {
        ar: arContent,
        en: enrich.fullDescEn
      },
      image: enrich.image,
      logo: enrich.logo,
      website: enrich.website,
      location: enrich.location,
      established: enrich.established,
      features: {
        ar: enrich.featuresAr,
        en: enrich.featuresEn
      }
    };
  });
}

export async function getCompanyBySlugDirectSql(slug: string): Promise<Company | null> {
  const companies = await getCompaniesFromDirectSql();
  return companies.find(c => c.slug === slug) || null;
}

export async function getChairmanBioDirectSql() {
  const sql = `
    SELECT ID, post_title, post_content 
    FROM wp_posts 
    WHERE ID = 416
    LIMIT 1
  `;
  const rows = await queryDirectSql<any>(sql);
  const row = rows[0];

  const rawAr = row?.post_content || '';
  const cleanAr = rawAr
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return {
    id: 416,
    title: {
      ar: 'السيرة الذاتية لمؤسس ورئيس مجلس الإدارة',
      en: 'Biography of Founder & Chairman'
    },
    name: {
      ar: 'أ/ محمود رمضان',
      en: 'Mr. Mahmoud Ramadan'
    },
    role: {
      ar: 'مؤسس ورئيس مجلس إدارة مجموعة شركات MRG',
      en: 'Founder & Chairman of MRG Group'
    },
    image: '/uploads/2024/12/5a259c37916dd.jpg',
    birth: {
      ar: 'من مواليد القاهرة 1968',
      en: 'Born in Cairo, 1968'
    },
    education: {
      ar: 'حاصل على ليسانس حقوق وماجستير فى القانون من جامعة عين شمس',
      en: 'LL.B. in Law and Master of Laws from Ain Shams University'
    },
    contentAr: cleanAr,
    contentEn: `Mr. Mahmoud Ramadan was born in Cairo in 1968. He holds a Bachelor of Laws and a Master's Degree in Law from Ain Shams University. He is the Founder and Chairman of the Board of Directors of MRG Group of Companies, which encompasses major industrial, agricultural, commercial, training, publishing, security, and sports organizations. He is also the Founder and Chairman of the Board of the Ramadan Foundation for Economic Development, an active non-profit organization supporting social and economic advancement. Additionally, he is an esteemed member of the Egyptian Publishers Association, the Arab Publishers Association, the Chamber of Chemical Industries at the Federation of Egyptian Industries, and the Egyptian-Turkish Businessmen Association.`,
    affiliationsAr: [
      'عضو اتحاد الناشرين المصريين',
      'عضو اتحاد الناشرين العرب',
      'عضو غرفة الصناعات الكيماوية باتحاد الصناعات المصرية',
      'عضو جمعية رجال الأعمال المصريين الأتراك',
      'عضو غرفة تكنولوجيا المعلومات والاتصالات'
    ],
    affiliationsEn: [
      'Member of the Egyptian Publishers Association',
      'Member of the Arab Publishers Association',
      'Member of the Chamber of Chemical Industries, Federation of Egyptian Industries',
      'Member of the Egyptian-Turkish Businessmen Association',
      'Member of the Chamber of Information Technology & Telecommunications'
    ]
  };
}

export async function getSiteMetaDirectSql() {
  const sql = `
    SELECT option_name, option_value 
    FROM wp_options 
    WHERE option_name IN ('blogname', 'blogdescription', 'admin_email', 'siteurl')
  `;
  const rows = await queryDirectSql<any>(sql);
  const map: Record<string, string> = {};
  rows.forEach(r => {
    map[r.option_name] = r.option_value;
  });

  return {
    siteName: map['blogname'] || 'مجموعة MRG',
    description: map['blogdescription'] || 'مجموعة محمود رمضان - مجموعة شركات مصرية اقتصادية',
    email: map['admin_email'] || 'contact@mrgeg.com',
    siteUrl: map['siteurl'] || 'https://mrgeg.com',
    phone: '+20 (2) 2349 4194',
    addressAr: '82 شارع مكرم عبيد، أمام مسجد الإيمان، مدينة نصر، القاهرة، مصر',
    addressEn: '82 Makram Ebeid St., in front of Al-Eman Mosque, Nasr City, Cairo, Egypt'
  };
}

export async function insertContactMessageDirectSql(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
}) {
  const sql = `
    INSERT INTO contact_messages (name, email, phone, company, subject, message)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  return await queryDirectSql(sql, [
    data.name,
    data.email,
    data.phone || null,
    data.company || null,
    data.subject || 'General Inquiry',
    data.message
  ]);
}
