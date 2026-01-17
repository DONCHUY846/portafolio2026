import { ArrowDown } from 'lucide-react'

import { KeyboardBackground } from '@/components/KeyboardBackground'

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-20">
      <KeyboardBackground />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mb-4 flex flex-col items-start justify-between md:flex-row md:items-end">
          <h1 className="font-display text-[15vw] leading-[0.8] tracking-tighter text-ink mix-blend-multiply">
            FRONT
          </h1>
          <div className="hidden max-w-xs pb-4 text-right font-mono text-sm md:block">
            (ESTADO ACTUAL)
            <br />
            DISPONIBLE PARA FREELANCE
            <br />Y COLABORACIONES.
          </div>
        </div>

        <div className="mt-4 flex flex-col items-end justify-between md:flex-row md:items-start">
          <div className="mb-8 block max-w-50 font-mono text-xs md:hidden">
            CREANDO EXPERIENCIAS WEB
            <br />
            MÍNIMAS Y FUNCIONALES.
          </div>
          <h1 className="ml-auto font-display text-[15vw] leading-[0.8] tracking-tighter text-right text-ink mix-blend-multiply">
            END
          </h1>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown size={32} />
        </div>
      </div>
    </section>
  )
}
