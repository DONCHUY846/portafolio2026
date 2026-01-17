const SKILLS = [
  'REACT',
  'TYPESCRIPT',
  'TAILWIND',
  'NEXT.JS',
  'THREE.JS',
  'NODE',
  'UI/UX',
  'FIGMA',
  'GIT',
  'ASTRO',
]

export function SkillsMarquee() {
  return (
    <div className="relative z-20 mt-20 rotate-1 overflow-hidden border-y border-ink bg-ink py-12 text-off-white md:mt-0">
      <div className="marquee-container">
        <div className="marquee-content font-display text-4xl tracking-tighter md:text-6xl">
          {SKILLS.map((skill) => (
            <span key={skill} className="mx-8">
              {skill}{' '}
              <span className="mx-4 align-middle font-mono text-2xl text-gray-500">
                *
              </span>
            </span>
          ))}
          {SKILLS.map((skill) => (
            <span key={`${skill}-dup`} className="mx-8">
              {skill}{' '}
              <span className="mx-4 align-middle font-mono text-2xl text-gray-500">
                *
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
