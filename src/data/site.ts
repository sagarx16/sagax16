export interface NavLink {
  title: string;
  href: string;
}

export interface Project {
  id: string;
  title: string;
  label: string;
  category: 'institutional-business' | 'celebration' | 'civic-government' | 'fan-project';
  categoryLabel: string;
  description: string;
  features?: string[];
  tech: string[];
  liveUrl: string;
  image: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  skills: string[];
  github?: string;
  linkedin?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
}

export const siteData = {
  company: {
    name: 'SAGA16',
    tagline: 'Web design and development studio in Bokaro Steel City',
    description: 'SAGA16 is a web design and development studio in Bokaro Steel City. Our full-stack engineers and UI/UX designer deliver fast, polished, mobile-ready websites for schools, companies, civic bodies and families.',
    location: 'Bokaro Steel City, Jharkhand',
    founder: 'Sagar Pathak',
    phone: '+91 7050836284',
    tel: 'tel:+917050836284',
    whatsapp: 'https://wa.me/917050836284',
    email: 'sagarixa@gmail.com',
    mailto: 'mailto:sagarixa@gmail.com',
    github: 'https://github.com/sagarx16',
    linkedin: 'https://www.linkedin.com/in/sagar-pathak-9360a9372',
    copyright: '© 2026 SAGA16',
  },

  nav: [
    { title: 'Home', href: '/' },
    { title: 'Our Work', href: '/our-work' },
    { title: 'Team', href: '/team' },
    { title: 'Contact', href: '/contact' },
  ],

  hero: {
    heading: 'Professional websites for institutions, businesses and celebrations.',
    subheading: 'Our full-stack engineers and UI/UX designer deliver fast, polished, mobile-ready websites for schools, companies, civic bodies and families.',
    primaryButton: { text: 'Talk to Our Team', href: '/contact' },
    secondaryButton: { text: 'View Our Work', href: '/our-work' },
  },

  categories: {
    heading: 'Websites for every need',
    description: 'From schools and civic bodies to weddings and birthdays, we design and build the website that fits.',
    rows: [
      {
        title: 'Wedding Invitation Websites',
        text: 'Wedding and anniversary invitation sites with schedules, countdowns, galleries and WhatsApp sharing. Starting at ₹1,600.',
      },
      {
        title: 'Birthday and Event Invitations',
        text: 'Birthday and event invitation sites with details, countdowns, galleries and WhatsApp sharing. Birthday sites start at ₹599. Event pricing is as per your requirements.',
      },
      {
        title: 'Business Websites',
        text: 'Company, school, college and institute websites with programmes, galleries, notices and enquiry forms. Institutional sites start at ₹5,999. Business sites are priced as per your requirements.',
      },
      {
        title: 'Personal Portfolio Websites',
        text: 'Clean, fast portfolio websites that present your work, skills and contact details. Priced as per your requirements.',
      },
      {
        title: 'Small-Business Websites',
        text: 'Simple, mobile-ready websites for local and small businesses. Priced as per your requirements.',
      },
      {
        title: 'Custom Branding and Graphic Design',
        text: 'Logos, brand identity and graphics that match your website. Priced as per your requirements.',
      },
    ],
    marqueeLabel: 'WEBSITES WE HAVE BUILT AND LAUNCHED',
    marqueeProjects: [
      'S.N. PUBLIC SCHOOL',
      'ROYAL WEDDING INVITATION',
      'CIVICVOICE',
      'POCKETBANK',
      'SACHET',
      'GHIBLI TRIBUTE',
      'SAGE WELLNESS',
    ],
  },

  about: {
    eyebrow: 'ABOUT SAGA16',
    heading: 'SAGA16 was founded by Sagar Pathak. We bring full-stack engineering and dedicated UI/UX design under one roof, so every website looks refined and is built properly underneath.',
    cards: [
      {
        title: 'Full-Stack Engineering',
        description: 'We build the pages you see and the forms and databases behind them.',
      },
      {
        title: 'Dedicated UI/UX Design',
        description: 'Every layout is designed by our UI/UX designer before development starts.',
      },
      {
        title: 'Direct Collaboration',
        description: 'You talk directly to the people who build your website.',
      },
    ],
  },

  facts: [
    { value: '7', label: 'live projects' },
    { value: '6', label: 'website categories' },
    { value: '₹599', label: 'starting price' },
  ],

  techStack: {
    eyebrow: 'MODERN STANDARDS',
    heading: 'Our Tech Stack',
    description: 'We build with modern, widely used tools, so your website is fast, easy to maintain and ready to grow.',
    buttonText: 'View Our Work',
    buttonHref: '/our-work',
    row1: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB'],
    row2: ['Redux Toolkit', 'Astro', 'JavaScript', 'HTML5', 'CSS3', 'Figma', 'Git & GitHub', 'Vercel'],
    ribbonRow1: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    ribbonRow2: ['Node.js', 'Express', 'MongoDB', 'Figma'],
  },

  process: {
    heading: 'How we work',
    steps: [
      {
        number: 1,
        title: 'Consultation',
        description: 'You call or WhatsApp us and we understand your goals.',
      },
      {
        number: 2,
        title: 'Design',
        description: 'Our UI/UX designer prepares the look and you approve it.',
      },
      {
        number: 3,
        title: 'Development',
        description: 'Our full-stack developers build it for every screen.',
      },
      {
        number: 4,
        title: 'Launch',
        description: 'Your site goes live and you get the link.',
      },
    ],
  },

  teamWhy: {
    eyebrow: 'WHY SAGA16',
    heading: 'Why work with SAGA16',
    cards: [
      {
        title: 'Engineering and design in one team',
        description: 'Your site is designed and built by people who work side by side.',
      },
      {
        title: 'Direct collaboration',
        description: 'You talk to the people who build your website, with no middlemen.',
      },
      {
        title: 'Clear pricing',
        description: 'Websites start at ₹599 and you get a clear quote before work begins.',
      },
    ],
  },

  projects: [
    {
      id: 'sn-public-school',
      title: 'S.N. Public School & Tuition Center',
      label: 'Client project',
      category: 'institutional-business',
      categoryLabel: 'Institutional & Business',
      description: 'A responsive school website for a real client in Bokaro Steel City, with admissions, academics and a campus gallery.',
      features: [
        'Admission inquiry form with validation and email notification',
        'Filterable campus gallery',
        'Academics and admissions pages',
        'Fee transparency section and FAQ',
      ],
      tech: ['Next.js', 'TypeScript'],
      liveUrl: 'https://sharda-academy-smoky.vercel.app',
      image: '/projects/sn-public-school.png',
    },
    {
      id: 'royal-wedding',
      title: 'Royal Wedding Invitation',
      label: 'Celebration',
      category: 'celebration',
      categoryLabel: 'Celebration',
      description: 'A royal-style wedding invitation with a scratch-to-reveal date, countdown, ceremony schedule, ritual gallery and WhatsApp sharing.',
      features: [
        'Scratch-to-reveal wedding date',
        'Live ceremony countdown clock',
        'Schedule and ritual photo gallery',
        'Direct WhatsApp invitation sharing',
      ],
      tech: ['Astro'],
      liveUrl: 'https://invifestx16.vercel.app',
      image: '/projects/royal-wedding.png',
    },
    {
      id: 'civic-voice',
      title: 'CivicVoice',
      label: 'Concept project',
      category: 'civic-government',
      categoryLabel: 'Civic & Government',
      description: 'A civic platform to report local issues on a map, vote in polls and follow replies from city departments.',
      features: [
        'Interactive map issue reporting',
        'Community polling and voting system',
        'City department response tracking',
      ],
      tech: ['Next.js', 'TypeScript'],
      liveUrl: 'https://civic-voicex16.vercel.app',
      image: '/projects/civic-voice.png',
    },
    {
      id: 'pocketbank',
      title: 'PocketBank',
      label: 'Hackathon project',
      category: 'institutional-business',
      categoryLabel: 'Institutional & Business',
      description: 'A student banking app with savings vaults, UPI-style transfers and parent guardrail controls.',
      features: [
        'Personal savings vaults with progress meters',
        'UPI-style simulated peer transfers',
        'Parental spending controls and guardrails',
      ],
      tech: ['Next.js', 'TypeScript'],
      liveUrl: 'https://hackathon-pocketmoney-main.vercel.app',
      image: '/projects/pocketbank.png',
    },
    {
      id: 'sachet',
      title: 'Sachet',
      label: 'Hackathon project',
      category: 'civic-government',
      categoryLabel: 'Civic & Government',
      description: 'A flood management platform for Smart India Hackathon with role-based dashboards for citizens, NGOs and authorities, live risk heatmaps and relief inventory.',
      features: [
        'Smart India Hackathon internal qualifier',
        'Live flood risk heatmaps and sensors',
        'Role-based dashboards (Citizens, NGOs, Authorities)',
        'Emergency relief shelter and inventory ledger',
      ],
      tech: ['MERN stack'],
      liveUrl: 'https://sachet-five.vercel.app',
      image: '/projects/sachet.png',
    },
    {
      id: 'ghibli-tribute',
      title: 'Ghibli Tribute',
      label: 'Fan project',
      category: 'fan-project',
      categoryLabel: 'Fan project',
      description: 'A film browser with director and genre filters, sorting and a dark mode.',
      features: [
        'Studio Ghibli catalogue exploration',
        'Director and release year filtering',
        'Responsive dark and light thematic modes',
      ],
      tech: ['Next.js'],
      liveUrl: 'https://ghiblix16.vercel.app/movies',
      image: '/projects/ghibli-tribute.png',
    },
    {
      id: 'sage-wellness',
      title: 'Sage Wellness (Dr. Maya Reynolds, PsyD)',
      label: 'Concept project',
      category: 'institutional-business',
      categoryLabel: 'Institutional & Business',
      description: 'Calming, trauma-informed therapy practice website with telehealth booking, specialties and consultation flow.',
      features: [
        'Telehealth & in-person consultation booking flow',
        'Specialties & clinical approach breakdown',
        'Trauma-informed calming aesthetics',
      ],
      tech: ['Next.js'],
      liveUrl: 'https://sage-wellness.vercel.app',
      image: '/projects/sage-wellness.png',
    },
  ] as Project[],

  team: [
    {
      name: 'Sagar Pathak',
      role: 'Founder & CEO, Full-Stack Developer',
      bio: 'Leads SAGA16 and its engineering work. Built the S.N. Public School website for a real client, and Sachet, a flood management platform that qualified in the internal round of Smart India Hackathon.',
      skills: ['Next.js', 'React', 'TypeScript', 'Node.js', 'MongoDB'],
      github: 'https://github.com/sagarx16',
      linkedin: 'https://www.linkedin.com/in/sagar-pathak-9360a9372',
    },
    {
      name: 'Koushik Jha',
      role: 'Full-Stack Developer',
      bio: 'Builds both sides of a website: the pages you see and the forms and databases behind them.',
      skills: ['Full-stack development', 'Frontend', 'Backend'],
    },
    {
      name: 'Simran Thakur',
      role: 'UI/UX & Web Designer',
      bio: 'Designs the look, layout and user experience of every SAGA16 website, from first sketch to final interface.',
      skills: ['UI/UX design', 'Figma', 'Canva', 'HTML5', 'CSS3'],
    },
  ] as TeamMember[],

  contactBands: {
    home: {
      heading: "Ready to build your website? Let's talk.",
      phoneText: 'Call +91 7050836284',
      phoneHref: 'tel:+917050836284',
      whatsappText: 'WhatsApp Us',
      whatsappHref: 'https://wa.me/917050836284',
      emailText: 'sagarixa@gmail.com',
      emailHref: 'mailto:sagarixa@gmail.com',
    },
    ourWork: {
      heading: "Have a website in mind? Let's talk.",
      phoneText: 'Call +91 7050836284',
      phoneHref: 'tel:+917050836284',
      whatsappText: 'WhatsApp Us',
      whatsappHref: 'https://wa.me/917050836284',
      emailText: 'sagarixa@gmail.com',
      emailHref: 'mailto:sagarixa@gmail.com',
    },
    team: {
      heading: "Want to work with us? Let's talk.",
      phoneText: 'Call +91 7050836284',
      phoneHref: 'tel:+917050836284',
      whatsappText: 'WhatsApp Us',
      whatsappHref: 'https://wa.me/917050836284',
      emailText: 'sagarixa@gmail.com',
      emailHref: 'mailto:sagarixa@gmail.com',
    },
    contact: {
      heading: 'Ready to start?',
      phoneText: 'Call +91 7050836284',
      phoneHref: 'tel:+917050836284',
      whatsappText: 'WhatsApp Us',
      whatsappHref: 'https://wa.me/917050836284',
    },
  },

  faq: [
    {
      question: 'What websites do we build?',
      answer: 'School and institute sites, company sites, civic and government-type platforms, and birthday, wedding and anniversary invitation sites.',
    },
    {
      question: 'How much does a website cost?',
      answer: 'Birthday from ₹599, wedding from ₹1,600, school or civic platform from ₹5,999. The final price depends on your pages and features.',
    },
    {
      question: 'Where can you see our work?',
      answer: 'Yes. Every project in Our Work has a live link.',
    },
    {
      question: 'How do we start working together?',
      answer: 'Call or WhatsApp us, tell us what you need, and we will share the exact price.',
    },
  ] as FaqItem[],

  pricing: {
    heading: 'Starting prices',
    items: [
      { service: 'Birthday website', price: 'from ₹599' },
      { service: 'Wedding and anniversary website', price: 'from ₹1,600' },
      { service: 'Institutional website', price: 'from ₹5,999' },
      { service: 'Civic and government platform', price: 'from ₹5,999' },
      { service: 'Business website', price: 'Custom quote' },
    ],
    note: 'Final price depends on your pages and features. You get a clear quote before work begins.',
  },

  contactPage: {
    eyebrow: 'CONTACT',
    heading: "Let's build your website.",
    subheading: 'Call or message us, tell us what you need, and we will share a clear price before we start.',
    cards: [
      {
        title: 'Call',
        info: '+91 7050836284',
        cta: 'Call Now',
        href: 'tel:+917050836284',
        icon: 'phone',
      },
      {
        title: 'WhatsApp',
        info: '+91 7050836284',
        cta: 'Chat on WhatsApp',
        href: 'https://wa.me/917050836284',
        icon: 'whatsapp',
      },
      {
        title: 'Email',
        info: 'sagarixa@gmail.com',
        cta: 'Send Email',
        href: 'mailto:sagarixa@gmail.com',
        icon: 'mail',
      },
    ],
    locationLine: 'Bokaro Steel City, Jharkhand',
    form: {
      heading: 'Tell us about your project',
      subheading: 'Share a few details and we will get back to you.',
      dropdownOptions: [
        'Institutional or business website',
        'Civic or government platform',
        'Wedding or anniversary website',
        'Birthday website',
        'Something else',
      ],
      submitButton: 'Send Enquiry',
      thankYouMessage: 'Thank you. We will get back to you.',
    },
  },
};
