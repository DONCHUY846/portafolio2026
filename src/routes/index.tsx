import { createFileRoute } from '@tanstack/react-router'

import { Navbar } from '@/components/Navbar'
import { Projects } from '@/components/Projects'
import { SkillsMarquee } from '@/components/SkillsMarquee'
import { Hero } from '@/components/Hero'
import { useProjects } from '@/hooks/useProjects'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const { data: projects, isLoading } = useProjects()

  return (
    <>
      <Navbar />
      <main className="bg-off-white text-ink">
        <Hero />
        <SkillsMarquee />
        {isLoading ? (
          <section className="py-20">
            <div className="container mx-auto px-4">
              <p className="font-mono text-xs uppercase tracking-[0.3em]">
                [ LOADING_DATA... ]
              </p>
            </div>
          </section>
        ) : (
          <Projects projects={projects ?? []} />
        )}
      </main>
    </>
  )
}
