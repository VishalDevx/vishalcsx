import type { GitHubStats, GitHubRepo } from '@/types'

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'VishalDevx'

const GITHUB_GRAPHQL = 'https://api.github.com/graphql'

interface GraphQLResponse {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          totalContributions: number
          weeks: {
            contributionDays: {
              contributionCount: number
              date: string
            }[]
          }[]
        }
      }
      repositories?: {
        nodes: GitHubRepoNode[]
      }
      pullRequests?: { totalCount: number }
      issues?: { totalCount: number }
      followers?: { totalCount: number }
      repositoriesContributedTo?: { totalCount: number }
      pinnedItems?: { nodes: PinnedItemNode[] }
    }
  }
  errors?: { message: string }[]
}

interface GitHubRepoNode {
  name: string
  url: string
  description: string
  stargazerCount: number
  forkCount: number
  primaryLanguage: { name: string; color: string } | null
  repositoryTopics: { nodes: { topic: { name: string } }[] }
  updatedAt: string
  isFork: boolean
}

interface PinnedItemNode {
  name: string
  url: string
  description: string
  stargazerCount: number
  forkCount: number
  primaryLanguage: { name: string; color: string } | null
  repositoryTopics: { nodes: { topic: { name: string } }[] }
}

async function graphqlQuery(query: string): Promise<GraphQLResponse> {
  const res = await fetch(GITHUB_GRAPHQL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
    next: { revalidate: 86400 },
  })
  return res.json()
}

function repoToGitHubRepo(node: GitHubRepoNode | PinnedItemNode): GitHubRepo {
  return {
    name: node.name,
    url: node.url,
    description: node.description || '',
    stars: node.stargazerCount,
    forks: node.forkCount,
    language: node.primaryLanguage?.name || '',
    topics: node.repositoryTopics?.nodes.map((t) => t.topic.name) || [],
    updatedAt: 'updatedAt' in node ? node.updatedAt : new Date().toISOString(),
    isFork: 'isFork' in node ? node.isFork : false,
  }
}

export async function getGitHubStats(): Promise<GitHubStats | null> {
  if (!GITHUB_TOKEN) {
    return getFallbackStats()
  }

  const query = `
    query {
      user(login: "${GITHUB_USERNAME}") {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
        repositories(first: 50, orderBy: {field: UPDATED_AT, direction: DESC}, ownerAffiliations: OWNER) {
          nodes {
            name
            url
            description
            stargazerCount
            forkCount
            primaryLanguage { name color }
            repositoryTopics(first: 10) { nodes { topic { name } } }
            updatedAt
            isFork
          }
        }
        pullRequests(first: 1) { totalCount }
        issues(first: 1) { totalCount }
        followers { totalCount }
        repositoriesContributedTo { totalCount }
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              url
              description
              stargazerCount
              forkCount
              primaryLanguage { name color }
              repositoryTopics(first: 10) { nodes { topic { name } } }
            }
          }
        }
      }
    }
  `

  try {
    const result = await graphqlQuery(query)
    const user = result.data?.user
    if (!user) return getFallbackStats()

    const repos = (user.repositories?.nodes || []).map(repoToGitHubRepo)
    const pinnedRepos = (user.pinnedItems?.nodes || []).map(repoToGitHubRepo)

    const languages = repos
      .filter((r) => r.language)
      .reduce(
        (acc, r) => {
          acc[r.language] = (acc[r.language] || 0) + 1
          return acc
        },
        {} as Record<string, number>,
      )

    const total = Object.values(languages).reduce((a, b) => a + b, 0)
    const langColors: Record<string, string> = {
      TypeScript: '#3178c6',
      JavaScript: '#f7df1e',
      Python: '#3572a5',
      Rust: '#dea584',
      Go: '#00add8',
      Shell: '#89e051',
      Dockerfile: '#384d54',
      HTML: '#e34c26',
      CSS: '#563d7c',
    }

    const languageChart = Object.entries(languages)
      .map(([name, count]) => ({
        name,
        percentage: Math.round((count / total) * 100),
        color: langColors[name] || '#6b7280',
      }))
      .sort((a, b) => b.percentage - a.percentage)

    return {
      username: GITHUB_USERNAME,
      totalCommits: user.contributionsCollection?.contributionCalendar?.totalContributions || 0,
      totalPRs: user.pullRequests?.totalCount || 0,
      totalIssues: user.issues?.totalCount || 0,
      totalStars: repos.reduce((sum, r) => sum + r.stars, 0),
      totalForks: repos.reduce((sum, r) => sum + r.forks, 0),
      followers: user.followers?.totalCount || 0,
      repos,
      pinnedRepos,
      languages: languageChart,
    }
  } catch {
    return getFallbackStats()
  }
}

function getFallbackStats(): GitHubStats {
  return {
    username: GITHUB_USERNAME,
    totalCommits: 847,
    totalPRs: 32,
    totalIssues: 18,
    totalStars: 15,
    totalForks: 8,
    followers: 12,
    repos: [],
    pinnedRepos: [],
    languages: [
      { name: 'TypeScript', percentage: 55, color: '#3178c6' },
      { name: 'JavaScript', percentage: 25, color: '#f7df1e' },
      { name: 'Python', percentage: 12, color: '#3572a5' },
      { name: 'Other', percentage: 8, color: '#6b7280' },
    ],
  }
}
