import type { SiteConfig, NavItem, Profile } from '@/types'

export const siteConfig: SiteConfig = {
  name: 'Vishal Singh',
  title: 'VishalCSx — Senior Full Stack & Backend Engineer',
  description:
    'Senior Full Stack & Backend Engineer building scalable products, systems, and developer experiences. OSS contributor, system design enthusiast.',
  url: 'https://vishalcsx.dev',
  ogImage: '/og/default.png',
  links: {
    github: 'https://github.com/VishalDevx',
    linkedin: 'https://linkedin.com/in/vishalcsx',
    twitter: 'https://x.com/vishalcsx',
    email: 'vishalcsx@gmail.com',
  },
  admin: {
    username: 'admin',
    password: 'admin123',
  },
}

export const profile: Profile = {
  name: 'Vishal Singh',
  title: 'Senior Full Stack & Backend Engineer',
  email: 'vishalcsx@gmail.com',
  location: 'Muzaffarnagar, IN',
  bio: 'Building scalable products, systems, and developer experiences.',
  avatar: 'https://avatars.githubusercontent.com/u/VishalDevx',
  resume: '/cv/Vishal-Resume.pdf',
  roles: [
    'Full-Stack Engineer',
    'Backend Architect',
    'Systems Builder',
    'Open Source Dev',
  ],
  coreStack: [
    'Next.js',
    'TypeScript',
    'Node.js',
    'PostgreSQL',
    'Prisma',
    'Redis',
    'React',
    'Docker',
  ],
  social: {
    github: 'https://github.com/VishalDevx',
    linkedin: 'https://linkedin.com/in/vishalcsx',
    twitter: 'https://x.com/vishalcsx',
    email: 'vishalcsx@gmail.com',
  },
  stats: {
    projects: 12,
    ossContributions: 45,
    technologies: 25,
    systems: 8,
    experience: 3,
  },
}

export const navItems: NavItem[] = [
  { label: 'Home', href: '/', shortcut: 'G H', icon: 'Home' },
  { label: 'Projects', href: '/projects', shortcut: 'G P', icon: 'FolderKanban' },
  { label: 'System Design', href: '/system-design', shortcut: 'G S', icon: 'Network' },
  { label: 'Blog', href: '/blog', shortcut: 'G B', icon: 'BookOpen' },
  { label: 'Open Source', href: '/open-source', shortcut: 'G O', icon: 'Code2' },
  { label: 'Skills', href: '/skills', shortcut: 'G K', icon: 'Cpu' },
  { label: 'Activity', href: '/activity', shortcut: 'G A', icon: 'Activity' },
  { label: 'Contact', href: '/contact', shortcut: 'G C', icon: 'Mail' },
]
