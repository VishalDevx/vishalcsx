export interface Project {
  slug: string
  title: string
  description: string
  fullDescription?: string
  category: string
  techStack: string[]
  architecture?: string
  challenges?: string
  scalingStrategy?: string
  security?: string
  performanceMetrics?: {
    responseTime?: string
    throughput?: string
    uptime?: string
  }
  lessonsLearned?: string
  timeline?: TimelineEvent[]
  imageUrl?: string
  liveUrl?: string
  githubUrl?: string
  screenshots?: string[]
  videoUrl?: string
  featured: boolean
  published: boolean
  createdAt: string
  updatedAt: string
}

export interface TimelineEvent {
  date: string
  title: string
  description: string
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  imageUrl?: string
  readingTime?: number
  featured: boolean
  published: boolean
  createdAt: string
  updatedAt: string
}

export interface TechItem {
  name: string
  category: string
  icon?: string
  experienceSummary?: string
  projectsUsing?: string[]
  keyConcepts?: string[]
}

export interface TechCategory {
  name: string
  slug: string
  items: TechItem[]
}

export interface GitHubStats {
  username: string
  totalCommits: number
  totalPRs: number
  totalIssues: number
  totalStars: number
  totalForks: number
  followers: number
  repos: GitHubRepo[]
  pinnedRepos: GitHubRepo[]
  contributionGraph?: string
  languages: { name: string; percentage: number; color: string }[]
}

export interface GitHubRepo {
  name: string
  url: string
  description: string
  stars: number
  forks: number
  language: string
  topics: string[]
  updatedAt: string
  isFork: boolean
}

export interface SiteConfig {
  name: string
  title: string
  description: string
  url: string
  ogImage: string
  links: {
    github: string
    linkedin: string
    twitter: string
    email: string
  }
  admin: {
    username: string
    password: string
  }
}

export interface Profile {
  name: string
  title: string
  email: string
  location: string
  bio: string
  avatar: string
  resume: string
  roles: string[]
  coreStack: string[]
  social: {
    github: string
    linkedin: string
    twitter: string
    email: string
  }
  stats: {
    projects: number
    ossContributions: number
    technologies: number
    systems: number
    experience: number
  }
}

export interface NavItem {
  label: string
  href: string
  shortcut?: string
  icon?: string
}

export interface SystemDesignItem {
  title: string
  description: string
  diagram: string
  category: string
  tags: string[]
}

export interface ActivityItem {
  title: string
  description: string
  type: string
  date: string
  tags: string[]
}

export interface MetricItem {
  label: string
  value: number
  suffix?: string
  source?: 'github' | 'static'
}
