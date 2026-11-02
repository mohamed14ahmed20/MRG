const fs = require('fs');
const path = require('path');
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  WidthType,
  ShadingType
} = require('docx');

// Professional Palette
const COLOR_PRIMARY = '0F172A'; // Deep Navy / Slate
const COLOR_ACCENT = 'D97706';  // Warm Amber / Gold
const COLOR_MUTED = '475569';   // Slate Grey
const COLOR_LIGHT_BG = 'F8FAFC';// Light background fill
const COLOR_BORDER = 'CBD5E1';  // Subtle border
const COLOR_WHITE = 'FFFFFF';
const COLOR_SUCCESS = '16A34A'; // Green accent for deliverables

// Helper to create consistent section headings
function createSectionHeader(title, subtitle) {
  const elements = [
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 360, after: 100 },
      children: [
        new TextRun({
          text: title,
          bold: true,
          size: 30, // 15pt
          color: COLOR_PRIMARY,
          font: 'Calibri'
        })
      ]
    })
  ];

  if (subtitle) {
    elements.push(
      new Paragraph({
        spacing: { before: 0, after: 160 },
        children: [
          new TextRun({
            text: subtitle,
            italics: true,
            size: 22, // 11pt
            color: COLOR_ACCENT,
            font: 'Calibri'
          })
        ]
      })
    );
  }

  return elements;
}

// Helper for subheadings (Heading 2)
function createSubHeader(title) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 200, after: 80 },
    children: [
      new TextRun({
        text: title,
        bold: true,
        size: 25, // 12.5pt
        color: COLOR_PRIMARY,
        font: 'Calibri'
      })
    ]
  });
}

// Helper for daily tasks
function createDayBlock(dayNum, title, concept, targetFile, tasks, verification) {
  const elements = [];

  elements.push(
    new Paragraph({
      spacing: { before: 180, after: 60 },
      children: [
        new TextRun({
          text: `DAY ${dayNum}: ${title.toUpperCase()}`,
          bold: true,
          size: 23,
          color: COLOR_ACCENT,
          font: 'Calibri'
        })
      ]
    })
  );

  elements.push(
    new Paragraph({
      spacing: { before: 0, after: 40 },
      children: [
        new TextRun({ text: '• Core Concept: ', bold: true, size: 21, color: COLOR_PRIMARY, font: 'Calibri' }),
        new TextRun({ text: concept, size: 21, color: COLOR_MUTED, font: 'Calibri' })
      ]
    })
  );

  elements.push(
    new Paragraph({
      spacing: { before: 0, after: 40 },
      children: [
        new TextRun({ text: '• Codebase Target: ', bold: true, size: 21, color: COLOR_PRIMARY, font: 'Calibri' }),
        new TextRun({ text: targetFile, size: 21, italics: true, color: COLOR_MUTED, font: 'Calibri' })
      ]
    })
  );

  elements.push(
    new Paragraph({
      spacing: { before: 0, after: 40 },
      children: [
        new TextRun({ text: '• Hands-On Micro-Tasks:', bold: true, size: 21, color: COLOR_PRIMARY, font: 'Calibri' })
      ]
    })
  );

  tasks.forEach((t, i) => {
    elements.push(
      new Paragraph({
        bullet: { level: 1 },
        spacing: { before: 30, after: 30 },
        children: [
          new TextRun({ text: t, size: 21, color: COLOR_MUTED, font: 'Calibri' })
        ]
      })
    );
  });

  elements.push(
    new Paragraph({
      spacing: { before: 40, after: 120 },
      children: [
        new TextRun({ text: '✔ Daily Checkpoint: ', bold: true, size: 21, color: COLOR_SUCCESS, font: 'Calibri' }),
        new TextRun({ text: verification, size: 21, italics: true, color: COLOR_MUTED, font: 'Calibri' })
      ]
    })
  );

  return elements;
}

// Helper for bullet points
function createBullet(title, description) {
  return new Paragraph({
    bullet: { level: 0 },
    spacing: { before: 50, after: 50 },
    children: [
      new TextRun({
        text: title ? title + ': ' : '',
        bold: !!title,
        size: 21,
        color: COLOR_PRIMARY,
        font: 'Calibri'
      }),
      new TextRun({
        text: description,
        size: 21,
        color: COLOR_MUTED,
        font: 'Calibri'
      })
    ]
  });
}

// Helper for standard body paragraph
function createParagraph(text, options = {}) {
  return new Paragraph({
    spacing: { before: options.before || 60, after: options.after || 100 },
    children: [
      new TextRun({
        text: text,
        size: options.size || 21,
        color: options.color || COLOR_MUTED,
        bold: options.bold || false,
        italics: options.italics || false,
        font: 'Calibri'
      })
    ]
  });
}

// Helper for callout box
function createCalloutBox(title, content) {
  const cellBorder = {
    top: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
    bottom: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
    left: { style: BorderStyle.SINGLE, size: 24, color: COLOR_ACCENT },
    right: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER }
  };

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: cellBorder,
            shading: { fill: COLOR_LIGHT_BG, type: ShadingType.CLEAR },
            margins: { top: 140, bottom: 140, left: 200, right: 200 },
            children: [
              new Paragraph({
                spacing: { before: 0, after: 50 },
                children: [
                  new TextRun({
                    text: title,
                    bold: true,
                    size: 22,
                    color: COLOR_ACCENT,
                    font: 'Calibri'
                  })
                ]
              }),
              new Paragraph({
                spacing: { before: 0, after: 0 },
                children: [
                  new TextRun({
                    text: content,
                    size: 21,
                    color: COLOR_MUTED,
                    font: 'Calibri'
                  })
                ]
              })
            ]
          })
        ]
      })
    ]
  });
}

// Build table helper
function createStyledTable(headers, rows) {
  const headerRow = new TableRow({
    tableHeader: true,
    children: headers.map((h) => new TableCell({
      shading: { fill: COLOR_PRIMARY, type: ShadingType.CLEAR },
      borders: {
        top: { style: BorderStyle.SINGLE, size: 4, color: COLOR_PRIMARY },
        bottom: { style: BorderStyle.SINGLE, size: 8, color: COLOR_ACCENT },
        left: { style: BorderStyle.SINGLE, size: 4, color: COLOR_PRIMARY },
        right: { style: BorderStyle.SINGLE, size: 4, color: COLOR_PRIMARY }
      },
      margins: { top: 120, bottom: 120, left: 140, right: 140 },
      children: [
        new Paragraph({
          alignment: AlignmentType.LEFT,
          children: [
            new TextRun({
              text: h,
              bold: true,
              size: 20,
              color: COLOR_WHITE,
              font: 'Calibri'
            })
          ]
        })
      ]
    }))
  });

  const bodyRows = rows.map((row, rIndex) => {
    const isEven = rIndex % 2 === 0;
    const bgFill = isEven ? 'FFFFFF' : COLOR_LIGHT_BG;

    return new TableRow({
      children: row.map((cellText, cIndex) => new TableCell({
        shading: { fill: bgFill, type: ShadingType.CLEAR },
        borders: {
          top: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
          bottom: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
          left: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
          right: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER }
        },
        margins: { top: 100, bottom: 100, left: 140, right: 140 },
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: cellText,
                size: 19,
                bold: cIndex === 0,
                color: cIndex === 0 ? COLOR_PRIMARY : COLOR_MUTED,
                font: 'Calibri'
              })
            ]
          })
        ]
      }))
    });
  });

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [headerRow, ...bodyRows]
  });
}

async function generateDocument() {
  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: 'Calibri',
            size: 21,
            color: COLOR_MUTED
          }
        }
      }
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440,
              bottom: 1440,
              left: 1440,
              right: 1440
            }
          }
        },
        children: [
          // Header / Title Block
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 80 },
            children: [
              new TextRun({
                text: '30-DAY ZERO-TO-HERO ROADMAP',
                bold: true,
                size: 36,
                color: COLOR_PRIMARY,
                font: 'Calibri'
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 140 },
            children: [
              new TextRun({
                text: 'Daily Hands-On Micro-Tasks on the MRG Production Codebase',
                size: 24,
                color: COLOR_ACCENT,
                bold: true,
                font: 'Calibri'
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 320 },
            children: [
              new TextRun({
                text: 'Stack: Next.js 15 App Router | React 19 | TypeScript | Tailwind CSS | next-intl (i18n & RTL) | MySQL',
                size: 19,
                italics: true,
                color: COLOR_MUTED,
                font: 'Calibri'
              })
            ]
          }),

          createCalloutBox(
            'Roadmap Rules & Safety Protocol',
            '1. Daily Dedication: Complete 1 Day per day (30-45 minutes). Tasks are intentionally small and atomic.\n2. In-App Learning: All practical work is done directly on this live MRG codebase on http://localhost:3000.\n3. Pre-Publishing State: The app is in development mode and will NOT be deployed to production until all 30 days are completed.'
          ),

          new Paragraph({ spacing: { before: 180, after: 0 }, children: [] }),

          // Overview Table
          ...createSectionHeader('Roadmap At A Glance (4-Week Breakdown)', 'From Fundamentals to Full-Stack Production Readiness'),
          createStyledTable(
            ['Week', 'Focus Area', 'Direct Codebase Target', 'Weekly Milestone'],
            [
              ['Week 1 (Days 1 - 7)', 'Structure, Styling & Anatomy', 'HeroSection, Navbar, Footer, globals.css', 'Master UI layouts, Tailwind, and theme switching'],
              ['Week 2 (Days 8 - 14)', 'TypeScript & React 19 Interactivity', 'CompaniesFilterSection, ContactForm, queries.ts', 'Build dynamic filters, search, and typed state'],
              ['Week 3 (Days 15 - 21)', 'Next.js 15 App Router & i18n / RTL', 'app/[locale], middleware.ts, messages/*.json', 'Master Server Components, routes, and Arabic RTL'],
              ['Week 4 (Days 22 - 30)', 'Full-Stack Data, MySQL & Deployment', 'api/contact/route.ts, db.ts, .env.local', 'Connect MySQL database, test APIs, audit & launch prep']
            ]
          ),

          new Paragraph({ spacing: { before: 240, after: 0 }, children: [] }),

          // WEEK 1
          ...createSectionHeader('WEEK 1: Structure, Styling & Anatomy (Days 1 - 7)', 'Understand the codebase structure, Tailwind CSS, and visual rendering'),

          ...createDayBlock(
            1,
            'Project Tour, Architecture & The Dev Server',
            'Understand how Next.js runs, Node environment, and hot module reloading (Fast Refresh).',
            'package.json, src/app, src/components, and terminal',
            [
              'Open package.json and inspect the "scripts" (dev, build, lint) and core dependencies.',
              'Verify the dev server is active at http://localhost:3000 in your browser.',
              'Make a 1-word text change in src/components/HeroSection.tsx badge and observe instant Fast Refresh in the browser without reloading.'
            ],
            'You understand how Next.js compiles code on the fly and reflects edits in the browser within milliseconds.'
          ),

          ...createDayBlock(
            2,
            'Semantic HTML & Accessibility in Navigation',
            'HTML5 semantic landmark tags (<header>, <nav>, <footer>) and accessible ARIA attributes.',
            'src/components/Navbar.tsx and src/components/Footer.tsx',
            [
              'Inspect the <header> and <nav> layout elements in Navbar.tsx.',
              'Locate the mobile menu toggle button and inspect aria-label="Toggle Menu".',
              'Inspect Footer.tsx and verify that all social media link icons include accessible aria-label tags.'
            ],
            'Open Chrome DevTools (F12) > Elements tab, hover over the header to inspect the semantic document tree.'
          ),

          ...createDayBlock(
            3,
            'Tailwind CSS Utility Classes & Spacing',
            'Utility-first styling, padding (p-), margin (m-), flexbox, and container constraints.',
            'src/components/HeroSection.tsx (lines 20-35)',
            [
              'Locate line 23: pt-28 pb-16. Change pb-16 to pb-24 and observe the vertical spacing expand in the browser.',
              'Locate the stats grid container: gap-4 sm:gap-6. Test changing it to gap-8 to see how CSS Grid responds.',
              'Restore the clean original values once you have observed the layout behavior.'
            ],
            'You can predict how changing Tailwind spacing classes affects element dimensions on screen.'
          ),

          ...createDayBlock(
            4,
            'Gradients, Glassmorphism & Global Design Tokens',
            'CSS Custom Properties (variables), backdrop-filter glassmorphism, and gradient text masking.',
            'src/app/globals.css and tailwind.config.ts',
            [
              'Open globals.css and inspect .gold-gradient-text; notice -webkit-background-clip: text.',
              'Examine .glass-panel and observe backdrop-filter: blur(12px).',
              'Inspect the .glow-card:hover class and adjust its hover shadow or border color to see live card glowing.'
            ],
            'Hover over any card on the homepage to see the subtle glow and glassmorphic blur in action.'
          ),

          ...createDayBlock(
            5,
            'Theme Toggling & Dark/Light Mode with next-themes',
            'Managing theme state without hydration mismatch errors using next-themes.',
            'src/components/ThemeToggle.tsx and src/components/ThemeProvider.tsx',
            [
              'Inspect line 9 of ThemeToggle.tsx: const [mounted, setMounted] = React.useState(false); - understand why we wait for client mount.',
              'Trace how clicking the button calls setTheme(isDark ? "light" : "dark").',
              'Tweak the rotation duration on the Sun/Moon icons from duration-300 to duration-500.'
            ],
            'Click the theme button in the navbar and observe the smooth rotation transition between sun and moon.'
          ),

          ...createDayBlock(
            6,
            'Vector Icons & Micro-Interactions with Lucide',
            'Embedding SVG vector icons as React components with CSS hover transformations.',
            'src/components/HeroSection.tsx (lines 5-25)',
            [
              'Inspect import { ArrowRight, Shield, Award, Users, Factory, Sparkles, Building2 } from "lucide-react";.',
              'Import a new icon (e.g. TrendingUp) from lucide-react and swap it into one of the stats cards.',
              'Inspect the micro-animation on the icon container: group-hover:scale-110 transition-transform.'
            ],
            'Hover over the modified stats card to see the new vector icon smoothly enlarge.'
          ),

          ...createDayBlock(
            7,
            'JavaScript ES6+ in the UI: Dynamic Array Mapping',
            'Rendering lists in React with .map(), unique key props, and object destructuring.',
            'src/components/HeroSection.tsx (lines 15-20 and 74-92)',
            [
              'Study how const stats = [...] is defined as an array of metric objects.',
              'Examine lines 74-92 where stats.map((s, idx) => ...) iterates and renders each card dynamically.',
              'Add a temporary 5th item to the stats array (e.g. { value: "99%", label: "Quality Score", icon: Award }).'
            ],
            'See 5 stats cards appear cleanly on your homepage without writing repetitive HTML markup.'
          ),

          new Paragraph({ spacing: { before: 240, after: 0 }, children: [] }),

          // WEEK 2
          ...createSectionHeader('WEEK 2: TypeScript & React 19 Interactivity (Days 8 - 14)', 'Master type safety, state management, filtering, and controlled forms'),

          ...createDayBlock(
            8,
            'TypeScript Interfaces & Data Modeling',
            'Defining strict contracts for data objects with interfaces and union types.',
            'src/lib/queries.ts (lines 3-15)',
            [
              'Read the export interface Company definition in queries.ts.',
              'Notice how sector is typed as a union of exact strings: "industrial" | "securityTech" | "advertisingMedia" | ...',
              'Deliberately introduce a typo in COMPANY_ENRICHMENTS (e.g. sector: "industrials") to see TypeScript flag it with a red underline. Fix the typo.'
            ],
            'You understand how TypeScript eliminates runtime bugs before your code ever runs.'
          ),

          ...createDayBlock(
            9,
            'React useState & Responsive Mobile Drawer',
            'Declarative state management for UI toggling versus outdated manual DOM scripting.',
            'src/components/Navbar.tsx',
            [
              'Find the mobile navigation state: const [isOpen, setIsOpen] = useState(false);.',
              'Trace how clicking the hamburger icon invokes setIsOpen(!isOpen).',
              'Study how the drawer applies conditional classes (opacity, translate-x) based on isOpen.'
            ],
            'Switch browser DevTools to Mobile mode and test opening/closing the drawer smoothly.'
          ),

          ...createDayBlock(
            10,
            'Interactive Category Filter Tabs',
            'Active tab state management and conditional styling in React.',
            'src/components/CompaniesFilterSection.tsx',
            [
              'Locate const [selectedSector, setSelectedSector] = useState<string>("all");.',
              'Inspect the tab buttons: notice how selectedSector === sector.id toggles active gold button styling.',
              'Click between sector tabs on http://localhost:3000/#companies and observe the company count change.'
            ],
            'Clicking any sector tab filters the displayed companies instantly with zero page reload.'
          ),

          ...createDayBlock(
            11,
            'Real-Time Search Input with Array .filter()',
            'Controlled search inputs, onChange event handling, and bilingual string matching.',
            'src/components/CompaniesFilterSection.tsx',
            [
              'Locate const [searchQuery, setSearchQuery] = useState(""); and the search input element.',
              'Inspect how onChange={(e) => setSearchQuery(e.target.value)} updates state on every keystroke.',
              'Trace how filteredCompanies uses .filter() to search through both English and Arabic company names.'
            ],
            'Type "Suez" or "سويس" in the search box and verify that cards filter down immediately.'
          ),

          ...createDayBlock(
            12,
            'Controlled Forms & Multi-Field State',
            'Handling complex form state with a single dynamic handler using the spread operator.',
            'src/components/ContactForm.tsx',
            [
              'Inspect the formData state object: { name: "", email: "", phone: "", company: "", subject: "", message: "" }.',
              'Trace the handleChange function: setFormData({ ...formData, [e.target.name]: e.target.value }).',
              'Verify how the input value attributes are bound directly to formData properties.'
            ],
            'Type into each field on the Contact page and verify that React controls the input values.'
          ),

          ...createDayBlock(
            13,
            'Client-Side Form Validation & Error States',
            'Defensive programming, preventing default submission, and user error alerts.',
            'src/components/ContactForm.tsx',
            [
              'Inspect handleSubmit(e: React.FormEvent) and notice e.preventDefault() preventing page reload.',
              'Examine the validation guard clause checking for empty required fields (!name || !email || !message).',
              'Add a subtle red border class to an input when an error occurs to improve visual user feedback.'
            ],
            'Attempt to submit an empty contact form and verify that validation prevents submission and alerts the user.'
          ),

          ...createDayBlock(
            14,
            'Creating Your First Custom Reusable Component',
            'Component encapsulation, defining prop interfaces, and composing UI elements.',
            'src/components/Badge.tsx (New File!)',
            [
              'Create a new file src/components/Badge.tsx with an interface BadgeProps { text: string; variant?: "gold" | "blue"; }.',
              'Implement the badge component using Tailwind pill styles (px-3 py-1 rounded-full text-xs font-semibold).',
              'Import and render your new <Badge text="MRG Certified" /> inside src/components/ChairmanPreviewSection.tsx.'
            ],
            'View the Chairman section on the homepage and see your custom badge cleanly rendered.'
          ),

          new Paragraph({ spacing: { before: 240, after: 0 }, children: [] }),

          // WEEK 3
          ...createSectionHeader('WEEK 3: Next.js 15 App Router & i18n / RTL (Days 15 - 21)', 'Master Server Components, App Router file conventions, next-intl, and Arabic RTL'),

          ...createDayBlock(
            15,
            'Server Components vs. Client Components',
            'Understanding the boundaries: React Server Components (RSC) vs "use client".',
            'src/app/[locale]/page.tsx vs src/components/HeroSection.tsx',
            [
              'Notice src/app/[locale]/page.tsx does NOT have "use client" — it is an async Server Component with zero client bundle footprint.',
              'Notice HeroSection.tsx has "use client" at line 1 because it utilizes client hooks (useTranslations, useLocale).',
              'Understand the rule: Use Server Components for data fetching and layout; use Client Components for clicks and state.'
            ],
            'You can correctly decide whether a new component needs "use client" or should remain on the server.'
          ),

          ...createDayBlock(
            16,
            'App Router File Conventions & Nested Routes',
            'How Next.js automatically derives URLs from folders: page.tsx, layout.tsx, and not-found.tsx.',
            'src/app/[locale]/about, companies, chairman, and not-found.tsx',
            [
              'Inspect the folder hierarchy inside src/app/[locale]/.',
              'See how src/app/[locale]/chairman/page.tsx maps directly to the /chairman URL.',
              'Navigate to an invalid URL like http://localhost:3000/en/nonexistent to test src/app/not-found.tsx.'
            ],
            'The custom 404 page displays a branded message and a working "Return Home" button.'
          ),

          ...createDayBlock(
            17,
            'Next.js Image Optimization with <Image />',
            'Preventing layout shift (CLS), automatic WebP compression, and responsive image sizing.',
            'src/components/ChairmanPreviewSection.tsx and src/components/HeroSection.tsx',
            [
              'Inspect the import Image from "next/image"; statements.',
              'Study why width and height attributes (or fill with sizes) are mandatory to reserve layout space.',
              'Open Chrome DevTools > Network tab, filter by "Img", and see how Next.js serves modern WebP formats.'
            ],
            'Images load instantaneously without jarring page jumps as they decode.'
          ),

          ...createDayBlock(
            18,
            'Internationalization (i18n) Setup with next-intl',
            'Route-based localization, locale prefixes, and edge middleware handling.',
            'src/middleware.ts and src/i18n/routing.ts',
            [
              'Open middleware.ts and see how createMiddleware(routing) intercepts every incoming request.',
              'Open src/i18n/routing.ts and notice locales: ["ar", "en"] with defaultLocale: "ar".',
              'Type http://localhost:3000 in your browser and notice how middleware redirects automatically to /ar.'
            ],
            'Locale redirection operates seamlessly without any manual route coding.'
          ),

          ...createDayBlock(
            19,
            'Translation Dictionaries in Action (en.json & ar.json)',
            'Separating text content from code using structured JSON language keys.',
            'src/messages/en.json and src/messages/ar.json',
            [
              'Open en.json and ar.json side-by-side in your editor.',
              'Locate the "hero" object in both files.',
              'Add a new key "welcomeNote": "Welcome to MRG" in en.json and "أهلاً بكم في مجموعة MRG" in ar.json.',
              'Call t("welcomeNote") inside HeroSection.tsx and verify it displays.'
            ],
            'Switch languages using the navbar toggle and watch your new phrase translate in real-time.'
          ),

          ...createDayBlock(
            20,
            'Bi-directional (RTL) Layout & Arabic Typography',
            'Right-to-Left CSS styling, dynamic dir attribute, and directional icon mirroring.',
            'src/app/[locale]/layout.tsx (lines 60-72) and HeroSection.tsx (line 13)',
            [
              'In layout.tsx, inspect line 60: const dir = locale === "ar" ? "rtl" : "ltr"; on the <html> tag.',
              'In layout.tsx, inspect line 72: className={locale === "ar" ? "font-arabic" : "font-latin"}.',
              'In HeroSection.tsx, inspect line 13: const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;.'
            ],
            'Notice how the entire layout, margins, fonts (Cairo vs Plus Jakarta Sans), and arrows flip between Arabic and English.'
          ),

          ...createDayBlock(
            21,
            'Dynamic SEO Metadata & OpenGraph Preview Cards',
            'Search engine optimization, dynamic page titles, and social share previews.',
            'src/app/[locale]/layout.tsx (lines 15-42)',
            [
              'Inspect export async function generateMetadata(...) in layout.tsx.',
              'Notice how the page title and description change dynamically based on the current locale.',
              'Inspect openGraph image and title metadata used by WhatsApp, LinkedIn, and Twitter previews.'
            ],
            'View page source (Ctrl+U) in the browser to confirm the <title> and meta tags match the active language.'
          ),

          new Paragraph({ spacing: { before: 240, after: 0 }, children: [] }),

          // WEEK 4
          ...createSectionHeader('WEEK 4: Full-Stack Data, MySQL & Deployment (Days 22 - 30)', 'Connect database pooling, handle API endpoints, secure credentials, audit, and prepare for launch'),

          ...createDayBlock(
            22,
            'Relational Databases & MySQL Data Modeling',
            'Understanding tables, primary keys, records, data types, and SQL commands.',
            'src/lib/db.ts and src/lib/queries.ts',
            [
              'Read queries.ts to see the contact messages schema: name, email, phone, company, subject, message, created_at.',
              'Understand SQL statements: SELECT * FROM ... and INSERT INTO ... VALUES (...).'
            ],
            'You can clearly explain the structure of a relational database table and write a standard SQL query.'
          ),

          ...createDayBlock(
            23,
            'Database Connection Pooling with mysql2/promise',
            'Managing concurrent database traffic without server socket exhaustion.',
            'src/lib/db.ts (lines 7-20 and 48-56)',
            [
              'Inspect mysql.createPool({ ... }) in db.ts.',
              'Study connectionLimit: 10, waitForConnections: true, and idleTimeout: 30000.',
              'Inspect the checkDatabaseConnection() function that runs SELECT NOW() as a heartbeat check.'
            ],
            'You understand why connection pooling is essential for enterprise web applications.'
          ),

          ...createDayBlock(
            24,
            'Parameterized Queries & SQL Injection Prevention',
            'Cybersecurity best practices: prepared statements versus unsafe string concatenation.',
            'src/lib/db.ts (lines 28-46) and src/lib/queries.ts',
            [
              'In db.ts, examine pool.query(sql, values).',
              'Understand why we NEVER concatenate strings like "SELECT * FROM users WHERE email = " + email.',
              'See how ? placeholders allow the MySQL driver to sanitize all incoming data safely.'
            ],
            'You understand how production databases protect against malicious SQL injection attacks.'
          ),

          ...createDayBlock(
            25,
            'Next.js API Route Handlers (REST API)',
            'Building serverless backend endpoints with HTTP methods, status codes, and JSON responses.',
            'src/app/api/contact/route.ts',
            [
              'Inspect export async function POST(req: NextRequest) in route.ts.',
              'Trace line 6: const body = await req.json();.',
              'Inspect line 9: returning NextResponse.json({ error: ... }, { status: 400 }) if required fields are missing.',
              'Trace line 26: returning status 200 on successful insertion.'
            ],
            'You understand how frontend forms communicate with server endpoints via HTTP POST.'
          ),

          ...createDayBlock(
            26,
            'Full-Stack Integration: Contact Form to Database',
            'Wiring the client UI to the server API handler and persisting records in MySQL.',
            'src/components/ContactForm.tsx and src/app/api/contact/route.ts',
            [
              'In ContactForm.tsx, examine the fetch("/api/contact", { method: "POST", ... }) call.',
              'Fill out the contact form on http://localhost:3000/en/contact with test information.',
              'Submit the form and watch the server terminal log confirming successful SQL insertion.'
            ],
            'The form submits successfully and displays the confirmation banner to the user.'
          ),

          ...createDayBlock(
            27,
            'User Experience (UX) Polish: Spinners & Feedback',
            'Preventing duplicate submissions, loading spinners, and error alerts.',
            'src/components/ContactForm.tsx',
            [
              'Locate const [isSubmitting, setIsSubmitting] = useState(false);.',
              'Notice how the submit button disables during submission: disabled={isSubmitting}.',
              'Inspect the <Loader2 className="animate-spin" /> spinner icon rendering while submitting.'
            ],
            'Submit the form and observe how the button disables and displays an animated spinner.'
          ),

          ...createDayBlock(
            28,
            'Security, Secrets & Environment Variables',
            'Safeguarding database credentials and protecting sensitive keys with .env.local.',
            'src/lib/db.ts and .gitignore (line 18)',
            [
              'Inspect how db.ts reads credentials via process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASSWORD.',
              'Check line 18 of .gitignore: notice that .env*.local is strictly excluded from Git commits.',
              'Understand how production secrets are safely configured on hosting servers without leaking into public repositories.'
            ],
            'You can securely configure environment variables without exposing sensitive credentials.'
          ),

          ...createDayBlock(
            29,
            'Production Build & Performance Audit',
            'Compiling TypeScript, generating static assets, and auditing with Google Lighthouse.',
            'Terminal command: npm run build',
            [
              'Run npm run build in the terminal to compile all pages into optimized production bundles.',
              'Examine the output table: distinguish between static routes (○) and server-rendered routes (ƒ).',
              'Open Chrome DevTools > Lighthouse tab, and run a performance audit on http://localhost:3000.'
            ],
            'The build finishes with zero compiler errors, and Lighthouse scores 90+ across all categories.'
          ),

          ...createDayBlock(
            30,
            'Final Comprehensive Review & Deployment Readiness',
            'Cross-browser testing, mobile responsiveness check, and final production checklist.',
            'The complete MRG application across all pages',
            [
              'Test every page in both English and Arabic: Home, About, Companies, Chairman, Magazine, Contact.',
              'Test Dark and Light mode toggles across all pages.',
              'Verify that all images load crisply and all interactive modals and drawers function smoothly.',
              'Celebrate your achievement! You have mastered every layer of a modern full-stack enterprise web portal.'
            ],
            'Your codebase is verified, stable, and ready to be published to production whenever you choose!'
          ),

          new Paragraph({ spacing: { before: 240, after: 0 }, children: [] }),

          // Recommended Study Habits
          ...createSectionHeader('Recommended Daily Study Habits', 'How to stay consistent and succeed'),
          createBullet('One Day at a Time', 'Dedicate 30 to 45 minutes every day. Consistency beats cramming.'),
          createBullet('Inspect Before Modifying', 'Always read the target file and understand what it does before making small edits.'),
          createBullet('Leverage Browser DevTools', 'Use the Elements tab (Ctrl+Shift+C) and Console tab (F12) to inspect DOM elements and see logs.'),
          createBullet('Keep Dev Server Running', 'Always have npm run dev running in the terminal so you get instant visual feedback.')
        ]
      }
    ]
  });

  const outputPath = path.resolve('c:/Users/user/Desktop/MRG New Website/MRG_30_Day_FullStack_Roadmap.docx');
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outputPath, buffer);
  console.log('Successfully generated Word Document at:', outputPath);

  // Also try updating the old file if not locked
  try {
    const oldPath = path.resolve('c:/Users/user/Desktop/MRG New Website/Full_Stack_Web_Development_Roadmap.docx');
    fs.writeFileSync(oldPath, buffer);
  } catch (e) {
    console.log('Original file was open in Word; saved under new name.');
  }
}

generateDocument().catch(err => {
  console.error('Error generating document:', err);
  process.exit(1);
});
