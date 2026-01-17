import { ArrowRight } from 'lucide-react'

import type { Project } from '@/hooks/useProjects'

type ProjectsProps = {
  projects: Array<Project>
}

type ProjectCardProps = Project & {
  index: number
}

function ProjectCard({ title, category, year, index }: ProjectCardProps) {
  return (
    <div className="project-item group relative cursor-pointer border-t border-ink py-16 transition-colors duration-300 hover:bg-white">
      <div className="container relative z-20 mx-auto flex flex-col items-start justify-between px-4 md:flex-row md:items-center">
        <div className="mb-2 font-mono text-sm text-gray-500 md:mb-0">
          0{index + 1} / {year}
        </div>
        <h3 className="font-display text-5xl uppercase tracking-tighter transition-transform duration-300 group-hover:translate-x-4 md:text-7xl">
          {title}
        </h3>
        <div className="mt-2 flex items-center gap-2 font-mono text-sm group-hover:underline md:mt-0">
          {category}{' '}
          <ArrowRight
            size={16}
            className="-rotate-45 transition-transform group-hover:rotate-0"
          />
        </div>
      </div>

      <div className="hover-reveal-image pointer-events-none absolute left-1/4 top-1/2 hidden h-50 w-75 -translate-y-1/2 rotate-3 overflow-hidden border-2 border-ink bg-gray-800 shadow-2xl transition-transform md:block group-hover:-rotate-2">
        <div className="flex h-full w-full items-center justify-center bg-neutral-200 p-4 text-center font-mono text-xs">
          [PREVIEW DE {title}]
          <br />
          1200 x 800 PX
        </div>
      </div>
    </div>
  )
}

export function Projects({ projects }: ProjectsProps) {
  if (!projects.length) {
    return null
  }

  return (
    <section id="projects" className="py-20 md:py-32">
      <div className="container mx-auto mb-16 flex items-end justify-between px-4">
        <h2 className="max-w-md font-display text-4xl uppercase leading-tight md:text-5xl">
          Trabajos
          <br />
          Seleccionados
        </h2>
        <span className="hidden font-mono text-sm md:block">
          (SCROLL PARA VER MÁS)
        </span>
      </div>

      <div className="flex flex-col">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} {...project} index={index} />
        ))}
      </div>
      <div className="border-t border-ink" />
    </section>
  )
}
