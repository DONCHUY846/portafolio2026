import { useQuery } from '@tanstack/react-query'

/**
 * Interface for project data structure
 * Represents a single project in the portfolio
 */
export interface Project {
  /** The title of the project */
  title: string
  /** The category or industry of the project (e.g., E-Commerce, FinTech) */
  category: string
  /** The year the project was developed */
  year: number
}

/**
 * Simulates an API call to fetch projects
 * Returns a promise that resolves with an array of dummy projects after 800ms
 *
 * @returns {Promise<Array<Project>>} A promise resolving to an array of Project objects
 */
export const fetchProjects = async (): Promise<Array<Project>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { title: 'E-Commerce Platform', category: 'E-Commerce', year: 2023 },
        { title: 'Banking Dashboard', category: 'FinTech', year: 2024 },
        { title: 'Health Tracker', category: 'HealthTech', year: 2023 },
        { title: 'Education Portal', category: 'EdTech', year: 2024 },
        { title: 'Logistics Manager', category: 'Supply Chain', year: 2023 },
      ])
    }, 800)
  })
}

/**
 * Custom hook to fetch projects using TanStack Query v5
 * Encapsulates data fetching logic and state management
 *
 * @returns {UseQueryResult<Array<Project>, Error>} The query result containing data, loading state, and errors
 */
export const useProjects = () => {
  return useQuery<Array<Project>, Error>({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  })
}
